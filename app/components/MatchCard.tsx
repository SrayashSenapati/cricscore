"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchCard({ match }: { match: any }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const team1 = match.teams?.[0] || "Team 1";
  const team2 = match.teams?.[1] || "Team 2";

  // Find scores matching each team
  const team1Score = match.score?.find((s: any) =>
    s.inning?.toLowerCase().includes(team1.toLowerCase().split(" ")[0])
  );
  const team2Score = match.score?.find((s: any) =>
    s.inning?.toLowerCase().includes(team2.toLowerCase().split(" ")[0])
  );

  const formatScore = (score: any) => {
    if (!score) return null;
    return `${score.r}/${score.w} (${score.o} ov)`;
  };

  const isLive = match.matchStarted && !match.matchEnded;
  const isCompleted = match.matchEnded;

  return (
    <div
      onClick={() => router.push(`/match/${match.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#1c2128" : "#161b22",
        border: `1px solid ${hovered ? "#3fb950" : "#30363d"}`,
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Badges Row */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "10px", fontWeight: "600",
          color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)",
          border: "1px solid rgba(212,168,83,0.3)",
          padding: "2px 8px", borderRadius: "100px",
        }}>
          {match.matchType?.toUpperCase()}
        </span>
        {isLive && (
          <span style={{
            fontSize: "10px", fontWeight: "600",
            color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)",
            border: "1px solid rgba(248,81,73,0.3)",
            padding: "2px 8px", borderRadius: "100px",
            display: "flex", alignItems: "center", gap: "4px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#f85149", display: "inline-block" }}></span>
            LIVE
          </span>
        )}
        {isCompleted && (
          <span style={{
            fontSize: "10px", fontWeight: "600",
            color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)",
            border: "1px solid rgba(125,133,144,0.2)",
            padding: "2px 8px", borderRadius: "100px",
          }}>
            COMPLETED
          </span>
        )}
      </div>

      {/* Team 1 Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}>
        <span style={{
          color: "#e6edf3",
          fontSize: "14px",
          fontWeight: "600",
          flex: 1,
          paddingRight: "8px",
        }}>
          {team1}
        </span>
        <span style={{
          color: team1Score ? "#3fb950" : "#7d8590",
          fontSize: "13px",
          fontWeight: team1Score ? "700" : "400",
          whiteSpace: "nowrap",
        }}>
          {formatScore(team1Score) || (match.matchStarted ? "—" : "Yet to bat")}
        </span>
      </div>

      {/* VS divider */}
      <div style={{
        textAlign: "center",
        color: "#7d8590",
        fontSize: "10px",
        fontWeight: "600",
        letterSpacing: "0.1em",
        marginBottom: "8px",
      }}>
        VS
      </div>

      {/* Team 2 Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
      }}>
        <span style={{
          color: "#e6edf3",
          fontSize: "14px",
          fontWeight: "600",
          flex: 1,
          paddingRight: "8px",
        }}>
          {team2}
        </span>
        <span style={{
          color: team2Score ? "#3fb950" : "#7d8590",
          fontSize: "13px",
          fontWeight: team2Score ? "700" : "400",
          whiteSpace: "nowrap",
        }}>
          {formatScore(team2Score) || (match.matchStarted ? "—" : "Yet to bat")}
        </span>
      </div>

      {/* Venue */}
      {match.venue && (
        <div style={{
          fontSize: "11px", color: "#7d8590",
          marginBottom: "8px",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <span>📍</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {match.venue}
          </span>
        </div>
      )}

      {/* Status */}
      {match.status && (
        <div style={{
          fontSize: "11px",
          color: isLive ? "#3fb950" : "#7d8590",
          fontWeight: isLive ? "500" : "400",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {match.status}
        </div>
      )}
    </div>
  );
}