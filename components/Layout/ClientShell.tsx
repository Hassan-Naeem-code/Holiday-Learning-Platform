"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import ErrorBoundary from "../Common/ErrorBoundary";
import { getSession } from "@/utils/sessionManager";
import { ToastProvider, setGlobalToast, useToast } from "../Common/Toast";
import OfflineBanner from "../Common/OfflineBanner";
import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";
import { useThemeStore } from "@/stores/themeStore";

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
const KeyboardShortcutsHelp = dynamic(() => import("../Common/KeyboardShortcutsHelp"), {
  ssr: false,
  loading: () => null,
});
const SessionExpirationWarning = dynamic(() => import("../Common/SessionExpirationWarning"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  children: ReactNode;
};

// Component to initialize global toast
function ToastInitializer() {
  const { showToast } = useToast();

  useEffect(() => {
    setGlobalToast(showToast);
  }, [showToast]);

  return null;
}

export default function ClientShell({ children }: Props) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loadTheme } = useThemeStore();

  // Initialize keyboard navigation
  useKeyboardNavigation({ enabled: true });

  useEffect(() => {
    // Load theme on mount
    loadTheme();
  }, [loadTheme]);

  useEffect(() => {
    // Check if user is authenticated
    const session = getSession();
    setIsAuthenticated(!!session);

    // Listen for storage changes from OTHER tabs
    const handleStorageChange = () => {
      const session = getSession();
      setIsAuthenticated(!!session);
    };

    // Listen for session changes in SAME tab (custom event)
    const handleSessionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ authenticated: boolean }>;
      setIsAuthenticated(customEvent.detail.authenticated);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('session-changed', handleSessionChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('session-changed', handleSessionChange);
    };
  }, [pathname]); // Re-check on route change

  return (
    <ToastProvider>
      <ToastInitializer />
      <OfflineBanner />
      <KeyboardShortcutsHelp />

      {/* Skip to main content for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="w-full min-w-full overflow-x-hidden">
        {/* Progress tracking with isolated error boundary */}
        <ErrorBoundary
          fallbackTitle="Progress Error"
          fallbackMessage="Progress tracking had an issue, but you can still continue learning."
          showHomeButton={false}
        >
          <GlobalLearningTree />
        </ErrorBoundary>

        {/* AI Coach with isolated error boundary: Only show for authenticated users */}
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

        {/* Session expiration warning: Only show for authenticated users */}
        {isAuthenticated && <SessionExpirationWarning />}

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
          <main id="main-content" className="relative z-10 w-full" role="main">
            {children}
          </main>
        </ErrorBoundary>
      </div>
    </ToastProvider>
  );
}
