"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AutoRefresh({ interval = 30 }: { interval?: number }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(interval);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interval]);

  // Separate effect for refreshing
  useEffect(() => {
    if (countdown === interval && countdown !== 30) return;
    const refreshTimer = setInterval(() => {
      router.refresh();
    }, interval * 1000);

    return () => clearInterval(refreshTimer);
  }, [router, interval]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{
        width: "6px", height: "6px",
        borderRadius: "50%",
        backgroundColor: "#3fb950",
        display: "inline-block",
        animation: "pulse 1.5s infinite"
      }}></span>
      <span style={{ fontSize: "12px", color: "#7d8590" }}>
        Updates in {countdown}s
      </span>
    </div>
  );
}