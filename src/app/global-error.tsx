/*
 * @Author: Your Name
 * @Email: your.email@example.com
 * @Team: Your Team
 * @Date: 2025-01-XX XX:XX:XX
 * @Description: Global Error Handler with beautiful UI
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Hooks
  const router = useRouter();

  // State
  const [errorType, setErrorType] = useState<"client" | "server">("client");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorStack, setErrorStack] = useState<string>("");

  // Effects
  useEffect(() => {
    // Detect error type
    if (error.digest) {
      setErrorType("server");
    } else {
      setErrorType("client");
    }

    // Capture error details even if console.error is removed in production
    setErrorMessage(error.message || "Unknown error occurred");
    if (error.stack) {
      setErrorStack(error.stack);
    }
  }, [error]);

  // Functions
  const handleGoHome = () => {
    router.push("/");
    router.refresh();
  };

  const handleTryAgain = () => {
    reset();
  };

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-linear-to-br from-Neutral-50 to-Neutral-100 dark:from-Neutral-500 dark:to-Neutral-600 px-4">
        {/* Content */}
        <div className="text-center max-w-xl w-full flex flex-col items-center">
          {/* Logo or Error Icon */}
          <div className="mb-6">
            {/* Option 1: Use your logo */}
            {/* <Image
              src="/images/png/brand/logo.png"
              alt="Site logo"
              width={200}
              height={200}
              className=""
            /> */}

            {/* Option 2: Error Icon */}
            <div className="w-32 h-32 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-4 border-red-400 dark:border-red-500">
              <svg
                className="w-16 h-16 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-Neutral-300 dark:text-Neutral-50 mb-6">
            500
          </h1>

          {/* Error Type Badge */}
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold ${
                errorType === "server"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-500"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300 dark:border-blue-500"
              }`}
            >
              {errorType === "server"
                ? "SERVER-SIDE ERROR"
                : "CLIENT-SIDE ERROR"}
            </span>
          </div>

          {/* Main message */}
          <p className="text-lg sm:text-2xl text-Neutral-400 dark:text-Neutral-200 mb-4 font-semibold">
            Something went wrong!
          </p>

          {/* Explanation */}
          <p className="text-sm sm:text-base text-Neutral-500 dark:text-Neutral-300 mb-8">
            {errorType === "server"
              ? "The server encountered an error while processing your request. Please try again or return to the homepage."
              : "An error occurred in your browser while running the application. Please refresh the page or go back to the homepage."}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full mb-8">
            <button
              onClick={handleTryAgain}
              className="px-12 py-3 rounded-lg bg-primary-400 text-Neutral-50 hover:bg-primary-500 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Try Again
            </button>

            <button
              onClick={handleGoHome}
              className="px-6 py-3 rounded-lg border-2 border-Neutral-300 dark:border-Neutral-400 text-Neutral-500 dark:text-Neutral-200 hover:bg-Neutral-100 dark:hover:bg-Neutral-500 transition duration-300 cursor-pointer font-medium"
            >
              Go to Homepage
            </button>
          </div>

          {/* Error Details */}
          <details className="w-full mt-4 p-5  dark:bg-Neutral-600/50 rounded-lg text-left border border-Neutral-200 dark:border-Neutral-500 shadow-sm">
            <summary className="font-semibold text-sm text-Neutral-600 dark:text-Neutral-200 cursor-pointer mb-3 hover:text-primary-400 transition">
              View Error Details
            </summary>

            <div className="space-y-2 text-xs sm:text-sm font-mono">
              <p className="text-Neutral-700 dark:text-Neutral-300">
                <span className="font-bold text-primary-400">Type:</span>{" "}
                {errorType === "server" ? "Server Error" : "Client Error"}
              </p>

              <p className="text-Neutral-700 dark:text-Neutral-300 wrap-break-words">
                <span className="font-bold text-primary-400">Message:</span>{" "}
                {errorMessage}
              </p>

              {error.digest && (
                <p className="text-Neutral-600 dark:text-Neutral-400">
                  <span className="font-bold text-primary-400">Error ID:</span>{" "}
                  {error.digest}
                </p>
              )}

              {errorStack && (
                <details className="mt-3">
                  <summary className="text-xs text-primary-400 cursor-pointer mb-2 hover:underline">
                    View stack trace
                  </summary>
                  <pre className="text-xs text-Neutral-600 dark:text-Neutral-400 overflow-x-auto whitespace-pre-wrap bg-Neutral-200 dark:bg-Neutral-700 p-3 rounded border border-Neutral-300 dark:border-Neutral-600">
                    {errorStack}
                  </pre>
                </details>
              )}
            </div>
          </details>
        </div>
      </body>
    </html>
  );
}