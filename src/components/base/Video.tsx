/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-19 13:26:06
 * @Description:
 */

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  VideoPlayerProps,
  VideoTrack,
  VideoSource,
  VideoEvents,
} from "@/Interfaces/video";

// Constants

const DEFAULT_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

const isProduction = process.env.NODE_ENV === "production";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Functions

const withBasePath = (url: string): string => {
  if (!url) return url;
  if (
    url.startsWith("http") ||
    url.startsWith("//") ||
    url.startsWith(BASE_PATH)
  )
    return url;
  return isProduction && BASE_PATH
    ? `${BASE_PATH}${url.startsWith("/") ? "" : "/"}${url}`
    : url;
};

const Video: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  tracks = [],
  defaultLanguage,
  currentLanguage,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  hoverControls=true,
  playsinline = true,
  preload = "metadata",
  loading = "eager",
  theme = "dark",
  customControls = true,
  showQualitySelector = true,
  showPlaybackSpeed = true,
  showDownloadButton = true,
  showCaptionsByDefault = false,
  maxResolution,
  allowedFormats,
  title,
  ariaLabel,
  ariaDescribedBy,
  width,
  height,
  aspectRatio,
  responsive = true,
  className,
  wrapperClassName,
  style,
  containerStyle,
  enableCache = false,
  cacheKey,
  analytics,
  onPlay,
  onPause,
  onEnded,
  onError,
  onProgress,
  onVolumeChange,
  onFullscreenChange,
  onRetry,
  fallbackComponent,
}) => {
  // States and Refs

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(Boolean(muted));
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPip, setIsPip] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [activeTrack, setActiveTrack] = useState<VideoTrack | null>(null);
  const [activeQuality, setActiveQuality] = useState<string>("");
  const [sourcesByQuality] = useState<VideoSource[]>(() =>
    (sources || []).map((s) => ({ ...s })),
  );
  const [isHovered, setIsHovered] = useState(false);

  // Functions

  const chooseInitialSource = useCallback(() => {
    if (!sourcesByQuality.length) return null;
    if (maxResolution) {
      const match = sourcesByQuality.find(
        (s) => s.quality === maxResolution || String(s.size) === maxResolution,
      );
      if (match) return match;
    }
    if (allowedFormats && allowedFormats.length) {
      const filtered = sourcesByQuality.filter((s) =>
        allowedFormats.includes(s.type),
      );
      if (filtered.length) return filtered[0];
    }
    const sorted = [...sourcesByQuality].sort(
      (a, b) => (b.size || 0) - (a.size || 0),
    );
    return sorted[0];
  }, [sourcesByQuality, maxResolution, allowedFormats]);

  const [activeSource, setActiveSource] = useState<VideoSource | null>(
    chooseInitialSource(),
  );

  const qualities = useMemo(() => {
    return sourcesByQuality
      .map((s) => s.quality || String(s.size || s.src))
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [sourcesByQuality]);

  const sendAnalytics = useCallback(
    (eventName: string, payload?: any) => {
      try {
        if (!analytics?.enabled) return;
        analytics?.customEvents?.[eventName]?.();
      } catch (e) {
        console.warn("analytics error", e);
      }
    },
    [analytics],
  );

  const initHlsIfNeeded = useCallback(
    async (src: string, type?: string) => {
      const isHls = type?.includes("mpegurl") || src.endsWith(".m3u8");
      const video = videoRef.current;
      if (!video || !isHls) return;
      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hlsRef.current = new Hls({ enableWorker: true });
          hlsRef.current.loadSource(withBasePath(src));
          hlsRef.current.attachMedia(video);
          hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
            sendAnalytics("hls_manifest_parsed");
            if (autoplay)
              video.play().catch(() => sendAnalytics("autoplay_blocked"));
          });
        } else {
          video.src = withBasePath(src);
        }
      } catch (e) {
        console.warn("HLS import failed, fallback to native", e);
        video.src = withBasePath(src);
      }
    },
    [autoplay, sendAnalytics],
  );

  const maybeCacheAndUse = useCallback(
    async (src: string) => {
      if (!enableCache || !cacheKey || !("caches" in window)) return src;
      try {
        const cacheName = `video-cache-${cacheKey}`;
        const cache = await caches.open(cacheName);
        const match = await cache.match(src);
        if (match) {
          const blob = await match.blob();
          return URL.createObjectURL(blob);
        }
        const res = await fetch(src, { mode: "cors" });
        if (!res.ok) return src;
        await cache.put(src, res.clone());
        const blob = await res.blob();
        return URL.createObjectURL(blob);
      } catch (e) {
        console.warn("cache failed", e);
        return src;
      }
    },
    [enableCache, cacheKey],
  );

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused || v.ended) await v.play();
      else v.pause();
    } catch (e) {
      setError(e);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    setVolume(v.volume);
    sendAnalytics("mute_toggle", { muted: v.muted });
  }, [sendAnalytics]);

  const seekTo = useCallback((time: number) => {
    const v = videoRef.current;
    if (!v || isNaN(time)) return;
    v.currentTime = Math.max(0, Math.min(time, v.duration || time));
    setCurrentTime(v.currentTime);
  }, []);

  const changeRate = useCallback(
    (deltaOrValue: number) => {
      const v = videoRef.current;
      if (!v) return;
      const newRate =
        typeof deltaOrValue === "number" && DEFAULT_RATES.includes(deltaOrValue)
          ? deltaOrValue
          : Math.max(0.25, Math.min(2, (v.playbackRate || 1) + deltaOrValue));
      v.playbackRate = newRate;
      setPlaybackRate(newRate);
      sendAnalytics("rate_change", { rate: newRate });
    },
    [sendAnalytics],
  );

  const toggleFullscreen = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      try {
        // مهم: خود video رو فول‌اسکرین کن
        await video.requestFullscreen();
      } catch (err) {
        console.warn("Video fullscreen failed, trying parent", err);
        // اگه نشد، parent رو امتحان کن
        const container =
          video.closest("div.group") || video.parentElement?.parentElement;
        if (container) await container.requestFullscreen();
      }
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const changeVolume = useCallback(
    (v: number) => {
      const el = videoRef.current;
      if (!el) return;
      el.volume = Math.max(0, Math.min(1, v));
      setVolume(el.volume);
      setIsMuted(el.volume === 0);
      sendAnalytics("volume_change", { volume: el.volume });
    },
    [sendAnalytics],
  );

  const selectQuality = useCallback(
    (qualityId: string) => {
      const candidate = sourcesByQuality.find(
        (s) => (s.quality || String(s.size || s.src)) === qualityId,
      );
      if (candidate) setActiveSource(candidate);
      sendAnalytics("quality_change", { quality: qualityId });
    },
    [sourcesByQuality, sendAnalytics],
  );

  const downloadCurrent = useCallback(() => {
    if (!activeSource) return;
    const link = document.createElement("a");
    link.href = activeSource.src;
    link.download = title || activeSource.src.split("/").pop() || "video";
    document.body.appendChild(link);
    link.click();
    link.remove();
    sendAnalytics("download", { src: activeSource.src });
  }, [activeSource, title, sendAnalytics]);

  const retry = useCallback(() => {
    setError(null);
    onRetry?.();
    const v = videoRef.current;
    if (!v) return;
    try {
      v.load();
      v.play().catch(() => {});
    } catch (e) {}
    sendAnalytics("retry");
  }, [onRetry, sendAnalytics]);

  const toggleCaptions = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.textTracks || video.textTracks.length === 0) return;

    const anyActive = Array.from(video.textTracks).some(
      (t) => t.mode === "showing",
    );

    if (anyActive) {
      // خاموش کردن همه
      Array.from(video.textTracks).forEach((t) => (t.mode = "disabled"));
      setActiveTrack(null);
    } else {
      // روشن کردن اولین یا default
      const preferred =
        tracks.find(
          (t) =>
            t.default ||
            t.srclang === defaultLanguage ||
            t.srclang === currentLanguage,
        ) || tracks[0];
      if (preferred) {
        const track = Array.from(video.textTracks).find(
          (t) => t.language === preferred.srclang,
        );
        if (track) {
          track.mode = "showing";
          setActiveTrack(preferred);
        }
      }
    }
    sendAnalytics(anyActive ? "captions_off" : "captions_on");
  }, [tracks, defaultLanguage, currentLanguage, sendAnalytics]);

  const isCaptionActive = () => {
    const video = videoRef.current;
    return video?.textTracks
      ? Array.from(video.textTracks).some((t) => t.mode === "showing")
      : false;
  };

  const renderTracks = () =>
    (tracks || []).map((t, i) => (
      <track
        key={i}
        src={withBasePath(t.src)}
        kind={t.kind}
        label={t.label}
        srcLang={t.srclang}
        default={t.default}
      />
    ));

  const formatTime = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "00:00";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${m}:${String(sec).padStart(2, "0")}`;
  };

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      if (!activeSource) return;
      const video = videoRef.current;
      if (!video) return;
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      const resolvedSrc = await maybeCacheAndUse(activeSource.src);
      const isHls =
        (activeSource.type || "").includes("mpegurl") ||
        activeSource.src.endsWith(".m3u8");
      if (isHls) {
        await initHlsIfNeeded(activeSource.src, activeSource.type);
      } else {
        video.src = withBasePath(resolvedSrc);
        if (autoplay)
          video.play().catch(() => sendAnalytics("autoplay_blocked"));
      }
      video.muted = isMuted;
      if (!mounted) return;
      setActiveQuality(
        activeSource.quality || String(activeSource.size || "default"),
      );
    };
    setup();
    return () => {
      mounted = false;
    };
  }, [activeSource, initHlsIfNeeded, isMuted, autoplay, maybeCacheAndUse]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlayNative = () => {
      setIsPlaying(true);
      onPlay?.();
      sendAnalytics("play");
    };
    const onPauseNative = () => {
      setIsPlaying(false);
      onPause?.();
      sendAnalytics("pause");
    };
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0);
      setDuration(video.duration || 0);
      if (video.buffered && video.buffered.length) {
        const end = video.buffered.end(video.buffered.length - 1);
        setBufferedPercent(
          Number(((end / (video.duration || 1)) * 100).toFixed(2)),
        );
        onProgress?.(video.currentTime);
      }
    };
    const onVolume = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
      onVolumeChange?.(video.volume);
    };
    const onEndedNative = () => {
      setIsPlaying(false);
      onEnded?.();
      sendAnalytics("ended");
    };
    const onLoadedMeta = () => {
      setDuration(video.duration || 0);
      if (showCaptionsByDefault) {
        const trackToEnable = tracks.find(
          (t) =>
            t.default ||
            t.srclang === defaultLanguage ||
            t.srclang === currentLanguage,
        );
        if (trackToEnable) setActiveTrack(trackToEnable);
      }
    };
    const onErr = () => {
      const err = video.error;
      setError(err);
      onError?.(err);
      sendAnalytics("error", { code: err?.code, message: err?.message });
    };
    video.addEventListener(VideoEvents.PLAY, onPlayNative);
    video.addEventListener(VideoEvents.PAUSE, onPauseNative);
    video.addEventListener(VideoEvents.TIME_UPDATE, onTimeUpdate);
    video.addEventListener(VideoEvents.VOLUME_CHANGE, onVolume);
    video.addEventListener(VideoEvents.ENDED, onEndedNative);
    video.addEventListener(VideoEvents.LOADED_METADATA, onLoadedMeta);
    video.addEventListener(VideoEvents.ERROR, onErr);
    return () => {
      video.removeEventListener(VideoEvents.PLAY, onPlayNative);
      video.removeEventListener(VideoEvents.PAUSE, onPauseNative);
      video.removeEventListener(VideoEvents.TIME_UPDATE, onTimeUpdate);
      video.removeEventListener(VideoEvents.VOLUME_CHANGE, onVolume);
      video.removeEventListener(VideoEvents.ENDED, onEndedNative);
      video.removeEventListener(VideoEvents.LOADED_METADATA, onLoadedMeta);
      video.removeEventListener(VideoEvents.ERROR, onErr);
    };
  }, [
    onPlay,
    onPause,
    onEnded,
    onError,
    onProgress,
    onVolumeChange,
    showCaptionsByDefault,
    tracks,
    defaultLanguage,
    currentLanguage,
  ]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const textTracks = v.textTracks;
    if (!textTracks) return;
    for (let i = 0; i < textTracks.length; i++) {
      const t = textTracks[i];
      t.mode =
        activeTrack && t.language === activeTrack.srclang
          ? "showing"
          : "disabled";
    }
  }, [activeTrack]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);

      if (isFs) {
        // وقتی فول‌اسکرین شد: ویدیو رو کامل بکش و سیاه پس‌زمینه کن
        video.style.height = "100vh";
        video.style.width = "100vw";
        video.style.objectFit = "contain";
        video.style.position = "fixed";
        video.style.top = "0";
        video.style.left = "0";
        video.style.zIndex = "9999";
      } else {
        // وقتی خارج شد: برگرد به حالت عادی
        video.style.height = "";
        video.style.width = "";
        video.style.objectFit = "";
        video.style.position = "";
        video.style.top = "";
        video.style.left = "";
        video.style.zIndex = "";
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div
      className={`relative group bg-black overflow-hidden rounded-lg ${wrapperClassName}`}
      style={{ width: "100%", position: "relative", ...containerStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => setIsHovered(true)}
    >
      <video
        ref={videoRef}
        className={`w-full block ${className}`}
        poster={withBasePath(poster || "")}
        autoPlay={autoplay}
        muted={isMuted}
        loop={loop}
        controls={controls}
        playsInline={playsinline}
        preload={preload}
        width={width}
        height={height}
        aria-label={ariaLabel || title}
        aria-describedby={ariaDescribedBy}
        style={{
          width: responsive ? "100%" : width,
          // aspectRatio: aspectRatio || "16/9",
          backgroundColor: "black",
          ...style,
        }}
        onClick={togglePlay}
      >
        {renderTracks()}
      </video>

      {/* title */}

      <div
        className={`absolute top-0 left-0 right-0 px-6 pt-5 pb-12 text-white pointer-events-none transition-all duration-500 z-100 ${
          isHovered
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      >
        {title && (
          <h2 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-2xl">
            {title}
          </h2>
        )}
      </div>

      {/* play/pause button*/}

      {!isPlaying && !error && (
        <div className="absolute inset-0 inline-flex items-center justify-center group-hover:flex bg-black/10 backdrop-blur-sm">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-2xl cursor-pointer"
            aria-label="Play"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* bottom overlay */}
      {hoverControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 px-6 pb-6 text-white pointer-events-none transition-all duration-500 ${
            isHovered || !isPlaying
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          }}
        >
          <div className="pointer-events-auto">
            <div
              className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-4 group/progress relative"
              onClick={(e: any) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                seekTo(percent * (duration || 0));
              }}
            >
              <div
                className="absolute h-full bg-white/40"
                style={{ width: `${bufferedPercent}%` }}
              />
              <div
                className="absolute h-full bg-red-500 transition-all duration-150"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
              <div
                className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{
                  left: `${(currentTime / (duration || 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={togglePlay}
                  className="hover:scale-110 transition"
                >
                  {isPlaying ? (
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="6" y="4" width="5" height="16" rx="1" />
                      <rect x="13" y="4" width="5" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      className="w-9 h-9"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="hover:scale-110 transition"
                >
                  {isMuted || volume === 0 ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3z" />
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
                      <path d="M1.5 1.5l21 21-1.41 1.41L1.5 3.91z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
                    </svg>
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  className="w-0 group-hover:w-24 transition-all duration-300 h-1 bg-white/30 rounded-full accent-white"
                />

                <span className="text-sm font-medium opacity-90">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {tracks.length > 0 && (
                  <button
                    onClick={toggleCaptions}
                    className="hover:scale-110 transition"
                    aria-label={
                      isCaptionActive()
                        ? "turn off subtitles"
                        : "turn on subtitles"
                    }
                  >
                    {isCaptionActive() ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14H8v-2h2v2zm4 0h-2v-2h2v2zm3-4H7v-2h10v2z" />
                        <rect
                          x="3"
                          y="19.5"
                          width="18"
                          height="3"
                          rx="1.5"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14H8v-2h2v2zm4 0h-2v-2h2v2zm3-4H7v-2h10v2z" />
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                )}

                {showPlaybackSpeed && (
                  <select
                    value={playbackRate}
                    onChange={(e) => changeRate(Number(e.target.value))}
                    className="bg-black/70 backdrop-blur px-3 py-1.5 rounded text-xs border border-white/30"
                  >
                    {DEFAULT_RATES.map((r) => (
                      <option key={r} value={r}>
                        {r === 1 ? "Normal" : `${r}x`}
                      </option>
                    ))}
                  </select>
                )}

                {showQualitySelector && qualities.length > 0 && (
                  <select
                    value={activeQuality}
                    onChange={(e) => selectQuality(e.target.value)}
                    className="bg-black/70 backdrop-blur px-3 py-1.5 rounded text-xs border border-white/30"
                  >
                    {qualities.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                )}

                {showDownloadButton && activeSource && (
                  <button
                    onClick={downloadCurrent}
                    className="hover:scale-110 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                  </button>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="hover:scale-110 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isFullscreen ? (
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    ) : (
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zm-3-12v2h3v3h2V5h-5z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4 text-red-400">failed to load video</p>
            <button
              onClick={retry}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur transition"
            >
              retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
