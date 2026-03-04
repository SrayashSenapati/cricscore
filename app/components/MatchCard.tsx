"use client";

import Link from "next/link";
import { useState } from "react";

export default function MatchCard({ match }: { match: any }) {
  const [hovered, setHovered] = useState(false);
  const isLive = match.matchStarted && !match.matchEnded;
  const isEnded = match.matchEnded;
  const team1 = match.teams?.[0] || "Team 1";
  const team2 = match.teams?.[1] || "Team 2";
  const score1 = match.score?.[0];
  const score2 = match.score?.[1];

  return (
    <Link href={`/match/${match.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: hovered ? "#1e2a1e" : "#1c2128",
          border: `1px solid ${hovered ? "#3fb950" : "#30363d"}`,
          borderRadius: "12px",
          padding: "16px",
          cursor: "pointer",
          transition: "all 0.2s",
          height: "100%",
        }}
      >
        {/* Card Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "11px", color: "#7d8590", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: "8px" }}>
            {match.name}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <span style={{ fontSize: "10px", fontWeight: "600", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.05em" }}>
              {match.matchType?.toUpperCase()}
            </span>
            {isLive ? (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: "700", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.2)", padding: "2px 8px", borderRadius: "4px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#f85149", display: "inline-block" }}></span>
                LIVE
              </span>
            ) : isEnded ? (
              <span style={{ fontSize: "10px", fontWeight: "600", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid rgba(125,133,144,0.2)", padding: "2px 8px", borderRadius: "4px" }}>ENDED</span>
            ) : (
              <span style={{ fontSize: "10px", fontWeight: "600", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.2)", padding: "2px 8px", borderRadius: "4px" }}>UPCOMING</span>
            )}
          </div>
        </div>

        {/* Teams */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#e6edf3" }}>{team1}</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: score1 ? "#e6edf3" : "#7d8590" }}>
              {score1 ? `${score1.r}/${score1.w}` : "—"}
              {score1 && <span style={{ fontSize: "11px", color: "#7d8590", marginLeft: "4px" }}>({score1.o} ov)</span>}
            </span>
          </div>
          <div style={{ height: "1px", backgroundColor: "#21262d", position: "relative" }}>
            <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1c2128", padding: "0 6px", fontSize: "10px", color: "#7d8590", fontWeight: "600" }}>vs</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#e6edf3" }}>{team2}</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: score2 ? "#e6edf3" : "#7d8590" }}>
              {score2 ? `${score2.r}/${score2.w}` : "—"}
              {score2 && <span style={{ fontSize: "11px", color: "#7d8590", marginLeft: "4px" }}>({score2.o} ov)</span>}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #21262d", paddingTop: "10px" }}>
          <p style={{ fontSize: "11px", color: "#7d8590", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            📍 {match.venue || "Venue TBC"}
          </p>
          {match.status && (
            <p style={{ fontSize: "11px", color: "#3fb950", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {match.status}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}