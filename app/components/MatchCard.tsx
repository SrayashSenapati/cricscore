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
          background: hovered
            ? "linear-gradient(135deg, #1a2a1a 0%, #1a1a2e 50%, #2a1a0a 100%)"
            : "linear-gradient(135deg, #0f1f0f 0%, #1a1a2e 50%, #1f1400 100%)",
          border: "1px solid rgba(212,168,83,0.5)",
          borderRadius: "16px",
          padding: "24px",
          cursor: "pointer",
          transition: "all 0.2s",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        {/* Glow effects */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(63,185,80,0.08) 0%, transparent 70%)", pointerEvents: "none" }}></div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Featured label */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.15)", border: "1px solid rgba(212,168,83,0.4)", padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.1em" }}>
              FEATURED MATCH
            </span>
            <span style={{ fontSize: "10px", fontWeight: "600", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)", padding: "3px 8px", borderRadius: "100px" }}>
              {match.matchType?.toUpperCase()}
            </span>
            {isLive && (
              <span style={{ fontSize: "10px", fontWeight: "600", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", padding: "3px 8px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#f85149", display: "inline-block", animation: "pulse 1s infinite" }}></span>
                LIVE
              </span>
            )}
            {isCompleted && (
              <span style={{ fontSize: "10px", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid rgba(125,133,144,0.2)", padding: "3px 8px", borderRadius: "100px" }}>
                COMPLETED
              </span>
            )}
          </div>

          {/* Match name */}
          <div style={{ color: "#7d8590", fontSize: "11px", marginBottom: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {match.name}
          </div>

          {/* Teams + Scores */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e6edf3", fontSize: "18px", fontWeight: "700" }}>{team1}</span>
              <span style={{ color: team1Score ? "#3fb950" : "#7d8590", fontSize: "16px", fontWeight: "700" }}>
                {formatScore(team1Score) || (match.matchStarted ? "—" : "Yet to bat")}
              </span>
            </div>
            <div style={{ textAlign: "center", color: "#d4a853", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em" }}>VS</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#e6edf3", fontSize: "18px", fontWeight: "700" }}>{team2}</span>
              <span style={{ color: team2Score ? "#3fb950" : "#7d8590", fontSize: "16px", fontWeight: "700" }}>
                {formatScore(team2Score) || (match.matchStarted ? "—" : "Yet to bat")}
              </span>
            </div>
          </div>

          {/* Status */}
          {match.status && (
            <div style={{ marginTop: "16px", padding: "10px 14px", backgroundColor: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.15)", borderRadius: "8px" }}>
              <p style={{ color: "#3fb950", fontSize: "12px", fontWeight: "500" }}>{match.status}</p>
            </div>
          )}

          {/* Venue */}
          {match.venue && (
            <div style={{ marginTop: "10px", fontSize: "11px", color: "#7d8590", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Venue: {match.venue}
            </div>
          )}
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