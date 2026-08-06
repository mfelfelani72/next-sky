import { useState, useEffect, useCallback } from "react";
import debounce from "@/libraries/app/debounce";

interface ScrollLocation {
  isTop: boolean;
  isBottom: boolean;
  isLeft: boolean;
  isRight: boolean;
}

interface UseScrollOptions {
  offset?: number;
  enabled?: boolean;
}

type ScrollTarget = HTMLElement | null | { current: HTMLElement | null };

const useScroll = (
  target: ScrollTarget,
  { offset = 50, enabled = true }: UseScrollOptions = {}
): ScrollLocation => {
  const [location, setLocation] = useState<ScrollLocation>({
    isTop: false,
    isBottom: false,
    isLeft: false,
    isRight: false,
  });

  const getElement = () => {
    if (!enabled || !target) return null;
    return "current" in target ? target.current : target;
  };

  const checkScroll = useCallback((): ScrollLocation => {
    const el = getElement();
    if (!el)
      return { isTop: false, isBottom: false, isLeft: false, isRight: false };

    const {
      scrollHeight,
      scrollTop,
      clientHeight,
      scrollWidth,
      scrollLeft,
      clientWidth,
    } = el;

    const newLocation: ScrollLocation = {
      isTop: scrollTop <= offset,
      isBottom: Math.abs(scrollHeight - scrollTop - clientHeight) < offset,
      isLeft: scrollLeft <= offset,
      isRight: Math.abs(scrollWidth - scrollLeft - clientWidth) < offset,
    };

    setLocation(newLocation);
    return newLocation;
  }, [target, offset, enabled]);

  useEffect(() => {
    const el = getElement();
    if (!el) return;

    checkScroll();

    const handleScroll = debounce(() => checkScroll(), 50);

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [target, checkScroll, enabled]);

  return location;
};

export default useScroll;
