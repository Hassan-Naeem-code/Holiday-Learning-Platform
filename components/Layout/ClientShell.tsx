"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import ErrorBoundary from "../Common/ErrorBoundary";

// Client-only shell to lazy-load heavy visual/audio components
const FallingSnow = dynamic(() => import("./FallingSnow"), {
  ssr: false,
  loading: () => null,
});
const AnimatedSanta = dynamic(() => import("./AnimatedSanta"), {
  ssr: false,
  loading: () => null,
});
const SantaWithCart = dynamic(() => import("./SantaWithCart"), {
  ssr: false,
  loading: () => null,
});
const GlobalProgressGlass = dynamic(
  () => import("../Progress/GlobalProgressGlass"),
  { ssr: false, loading: () => null }
);
const MusicPlayer = dynamic(() => import("../Music/MusicPlayer"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  children: ReactNode;
};

export default function ClientShell({ children }: Props) {
  return (
    <>
      {/* Visual effects with isolated error boundaries */}
      <ErrorBoundary
        fallbackTitle="Decorations Error"
        fallbackMessage="Some visual effects couldn't load, but you can still use the app."
        showHomeButton={false}
      >
        <FallingSnow />
        <AnimatedSanta />
        <SantaWithCart />
      </ErrorBoundary>

      {/* Progress tracking with isolated error boundary */}
      <ErrorBoundary
        fallbackTitle="Progress Error"
        fallbackMessage="Progress tracking had an issue, but you can still continue learning."
        showHomeButton={false}
      >
        <GlobalProgressGlass />
      </ErrorBoundary>

      {/* Music player with isolated error boundary */}
      <ErrorBoundary
        fallbackTitle="Music Player Error"
        fallbackMessage="Music player had an issue, but you can still use the app."
        showHomeButton={false}
      >
        <MusicPlayer />
      </ErrorBoundary>

      {/* Navigation with isolated error boundary */}
      <ErrorBoundary
        fallbackTitle="Navigation Error"
        fallbackMessage="Navigation had an issue. Please refresh the page."
        showHomeButton={true}
      >
        <Navbar />
      </ErrorBoundary>

      {/* Main content with comprehensive error boundary */}
      <ErrorBoundary>
        <main className="relative z-10">{children}</main>
      </ErrorBoundary>
    </>
  );
}
