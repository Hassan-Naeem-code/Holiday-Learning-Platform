"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import ErrorBoundary from "../Common/ErrorBoundary";
import { getSession } from "@/utils/sessionManager";

// Client-only shell to lazy-load heavy visual components
const GlobalLearningTree = dynamic(
  () => import("../Progress/GlobalLearningTree"),
  { ssr: false, loading: () => null }
);
const AICoachButton = dynamic(() => import("../AICoach/AICoachButton"), {
  ssr: false,
  loading: () => null,
});
const AICoachPopup = dynamic(() => import("../AICoach/AICoachPopup"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  children: ReactNode;
};

export default function ClientShell({ children }: Props) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const session = getSession();
    setIsAuthenticated(!!session);

    // Also listen for storage events (when session is created/changed)
    const handleStorageChange = () => {
      const session = getSession();
      setIsAuthenticated(!!session);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [pathname]); // Re-check on route change

  return (
    <div className="w-full min-w-full overflow-x-hidden">
      {/* Progress tracking with isolated error boundary */}
      <ErrorBoundary
        fallbackTitle="Progress Error"
        fallbackMessage="Progress tracking had an issue, but you can still continue learning."
        showHomeButton={false}
      >
        <GlobalLearningTree />
      </ErrorBoundary>

      {/* AI Coach with isolated error boundary - Only show for authenticated users */}
      {isAuthenticated && (
        <ErrorBoundary
          fallbackTitle="AI Coach Error"
          fallbackMessage="AI Coach had an issue, but you can still use the app."
          showHomeButton={false}
        >
          <AICoachButton />
          <AICoachPopup />
        </ErrorBoundary>
      )}

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
        <main className="relative z-10 w-full">{children}</main>
      </ErrorBoundary>
    </div>
  );
}
