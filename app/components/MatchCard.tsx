"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchCard({ match, featured = false }: { match: any, featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const team1 = match.teams?.[0] || "Team 1";
  const team2 = match.teams?.[1] || "Team 2";

  const team1Score = match.score?.find((s: any) =>
    s.inning?.toLowerCase().includes(team1.toLowerCase().split(" ")[0])
  );
  const team2Score = match.score?.find((s: any) =>
    s.inning?.toLowerCase().includes(team2.toLowerCase().split(" ")[0])
  );

  const formatScore = (score: any) => {
    if (!score) return null;
    return score.r + "/" + score.w + " (" + score.o + " ov)";
  };

  const isLive = match.matchStarted && !match.matchEnded;
  const isCompleted = match.matchEnded;

  if (featured) {
    return (
      <div
        onClick={() => router.push("/match/" + match.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1a1200 30%, #0a1628 60%, #001a0a 100%)",
          border: "2px solid",
          borderColor: hovered ? "#f0c040" : "#d4a853",
          borderRadius: "20px",
          padding: "28px 32px",
          cursor: "pointer",
          transition: "all 0.3s",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          animation: "glow 3s infinite",
        }}
      >
        {/* Top shimmer line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #d4a853, #f0c040, #d4a853, transparent)", backgroundSize: "200% 100%", animation: "shimmer 2s infinite linear" }}></div>

        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.18) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(63,185,80,0.1) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 60%)", pointerEvents: "none" }}></div>

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Badges row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: "800", color: "#0d1117", background: "linear-gradient(90deg, #d4a853, #f0c040, #d4a853)", padding: "4px 12px", borderRadius: "100px", letterSpacing: "0.12em" }}>
              FEATURED
            </span>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.4)", padding: "3px 10px", borderRadius: "100px" }}>
              {match.matchType?.toUpperCase()}
            </span>
            {isLive && (
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#f85149", backgroundColor: "rgba(248,81,73,0.12)", border: "1px solid rgba(248,81,73,0.4)", padding: "3px 10px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f85149", display: "inline-block", animation: "pulse 1s infinite" }}></span>
                LIVE NOW
              </span>
            )}
            {!match.matchStarted && (
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.4)", padding: "3px 10px", borderRadius: "100px" }}>
                UPCOMING
              </span>
            )}
            {isCompleted && (
              <span style={{ fontSize: "10px", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid rgba(125,133,144,0.2)", padding: "3px 10px", borderRadius: "100px" }}>
                COMPLETED
              </span>
            )}
          </div>

          {/* Match name */}
          <div style={{ fontSize: "12px", color: "#7d8590", marginBottom: "24px" }}>
            {match.name}
          </div>

          {/* Teams + Scores — big and bold */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(212,168,83,0.15)" }}>
              <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>{team1}</span>
              <span style={{ color: team1Score ? "#3fb950" : "#4a5568", fontSize: "20px", fontWeight: "800" }}>
                {formatScore(team1Score) || (match.matchStarted ? "—" : "Yet to bat")}
              </span>
            </div>
            <div style={{ textAlign: "center", padding: "10px 0", color: "#d4a853", fontSize: "13px", fontWeight: "800", letterSpacing: "0.2em" }}>VS</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid rgba(212,168,83,0.15)" }}>
              <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>{team2}</span>
              <span style={{ color: team2Score ? "#3fb950" : "#4a5568", fontSize: "20px", fontWeight: "800" }}>
                {formatScore(team2Score) || (match.matchStarted ? "—" : "Yet to bat")}
              </span>
            </div>
          </div>

          {/* Status */}
          {match.status && (
            <div style={{ marginTop: "20px", padding: "12px 16px", background: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.2)", borderRadius: "10px" }}>
              <p style={{ color: "#3fb950", fontSize: "13px", fontWeight: "600" }}>{match.status}</p>
            </div>
          )}

          {/* Venue + CTA row */}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            {match.venue && (
              <span style={{ color: "#7d8590", fontSize: "11px" }}>
                {match.venue}
              </span>
            )}
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#d4a853", marginLeft: "auto" }}>
              View Scorecard
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push("/match/" + match.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#1c2128" : "#161b22",
        border: "1px solid " + (hovered ? "#3fb950" : "#30363d"),
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "10px", fontWeight: "600", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)", padding: "2px 8px", borderRadius: "100px" }}>
          {match.matchType?.toUpperCase()}
        </span>
        {isLive && (
          <span style={{ fontSize: "10px", fontWeight: "600", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", padding: "2px 8px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#f85149", display: "inline-block" }}></span>
            LIVE
          </span>
        )}
        {isCompleted && (
          <span style={{ fontSize: "10px", fontWeight: "600", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid rgba(125,133,144,0.2)", padding: "2px 8px", borderRadius: "100px" }}>
            COMPLETED
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ color: "#e6edf3", fontSize: "14px", fontWeight: "600", flex: 1, paddingRight: "8px" }}>{team1}</span>
        <span style={{ color: team1Score ? "#3fb950" : "#7d8590", fontSize: "13px", fontWeight: team1Score ? "700" : "400", whiteSpace: "nowrap" }}>
          {formatScore(team1Score) || (match.matchStarted ? "—" : "Yet to bat")}
        </span>
      </div>
      <div style={{ textAlign: "center", color: "#7d8590", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", marginBottom: "8px" }}>VS</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ color: "#e6edf3", fontSize: "14px", fontWeight: "600", flex: 1, paddingRight: "8px" }}>{team2}</span>
        <span style={{ color: team2Score ? "#3fb950" : "#7d8590", fontSize: "13px", fontWeight: team2Score ? "700" : "400", whiteSpace: "nowrap" }}>
          {formatScore(team2Score) || (match.matchStarted ? "—" : "Yet to bat")}
        </span>
      </div>

      {match.venue && (
        <div style={{ fontSize: "11px", color: "#7d8590", marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {match.venue}
        </div>
      )}
      {match.status && (
        <div style={{ fontSize: "11px", color: isLive ? "#3fb950" : "#7d8590", fontWeight: isLive ? "500" : "400", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {match.status}
        </div>
      )}
    </div>
  );
}