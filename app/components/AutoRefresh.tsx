"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ interval = 120 }: { interval?: number }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(interval);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    // COMPLETELY STOP if tab is not visible — zero API hits wasted
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.refresh();
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clears timer the moment tab is hidden
  }, [isVisible, interval, router]);

  // Reset countdown fresh when user comes back
  useEffect(() => {
    if (isVisible) {
      router.refresh(); // Immediately refresh when user returns
      setCountdown(interval);
    }
  }, [isVisible]);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "12px",
      color: isVisible ? "#7d8590" : "#3d444d",
    }}>
      <div style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: isVisible ? "#3fb950" : "#3d444d",
        animation: isVisible ? "pulse 1.5s infinite" : "none",
      }}></div>
      <span>{isVisible ? `Updates in ${countdown}s` : "Paused"}</span>
    </div>
  );
}