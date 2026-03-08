import Navbar from "./components/Navbar";
import MatchCard from "./components/MatchCard";

async function getLiveMatches() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const response = await fetch(`${baseUrl}/api/matches`, { cache: "no-store" });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

function SectionHeader({ title, count, color = "#3fb950" }: { title: string, count: number, color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#e6edf3", letterSpacing: "-0.2px" }}>{title}</h2>
      <span style={{ fontSize: "11px", fontWeight: "600", color: color, backgroundColor: `${color}18`, border: `1px solid ${color}30`, padding: "2px 8px", borderRadius: "100px" }}>{count}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${color}40, transparent)` }}></div>
    </div>
  );
}

export default async function Home() {
  const matches = await getLiveMatches();
  const liveMatches = matches.filter((m: any) => m.matchStarted && !m.matchEnded);
  const completedMatches = matches.filter((m: any) => m.matchEnded);
  const upcomingMatches = matches.filter((m: any) => !m.matchStarted);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <style>{`
        .stats-bar {
          display: flex;
          gap: 24px;
          margin-top: 20px;
          padding: 16px 20px;
          background-color: #161b22;
          border: 1px solid #30363d;
          border-radius: 10px;
          flex-wrap: wrap;
        }
        .stats-divider {
          width: 1px;
          background-color: #30363d;
        }
        .match-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        @media (max-width: 768px) {
          .stats-bar {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 0;
            background: transparent !important;
            border: none !important;
          }
          .stats-item {
            background-color: #161b22;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 16px;
            text-align: center;
          }
          .stats-divider {
            display: none;
          }
          .stats-number {
            font-size: 24px !important;
          }
          .match-grid {
            grid-template-columns: 1fr !important;
          }
          .page-title {
            font-size: 22px !important;
          }
        }
      `}</style>

      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>

       {/* T20 World Cup Final Banner */}
<div style={{
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
  border: "1px solid rgba(212,168,83,0.4)",
  borderRadius: "16px",
  padding: "20px 24px",
  marginBottom: "24px",
  position: "relative",
  overflow: "hidden",
}}>
  {/* Glow effect */}
  <div style={{
    position: "absolute", top: "-40px", right: "-40px",
    width: "200px", height: "200px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  }}></div>
  <div style={{
    position: "absolute", bottom: "-40px", left: "-40px",
    width: "200px", height: "200px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(63,185,80,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  }}></div>

  <div style={{ position: "relative", zIndex: 1 }}>
    {/* Trophy + Title */}
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "28px" }}>🏆</span>
      <div>
        <div style={{
          fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em",
          color: "#d4a853", marginBottom: "3px",
        }}>
          ICC T20 WORLD CUP 2026 • FINAL
        </div>
        <div style={{ fontSize: "20px", fontWeight: "700", color: "#e6edf3" }}>
          🇮🇳 India <span style={{ color: "#d4a853", margin: "0 8px" }}>vs</span> New Zealand 🇳🇿
        </div>
      </div>
      <div style={{
        marginLeft: "auto",
        display: "flex", alignItems: "center", gap: "6px",
        backgroundColor: "rgba(248,81,73,0.15)",
        border: "1px solid rgba(248,81,73,0.4)",
        borderRadius: "100px", padding: "4px 12px",
      }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          backgroundColor: "#f85149",
          animation: "pulse 1s infinite",
        }}></div>
        <span style={{ color: "#f85149", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em" }}>
          TONIGHT
        </span>
      </div>
    </div>

    {/* Match Info Row */}
    <div style={{
      display: "flex", gap: "20px", flexWrap: "wrap",
      borderTop: "1px solid rgba(212,168,83,0.15)",
      paddingTop: "12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "12px" }}>📍</span>
        <span style={{ color: "#7d8590", fontSize: "12px" }}>Narendra Modi Stadium, Ahmedabad</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "12px" }}>🕖</span>
        <span style={{ color: "#7d8590", fontSize: "12px" }}>7:00 PM IST</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "12px" }}>📺</span>
        <span style={{ color: "#7d8590", fontSize: "12px" }}>Live on CricScore at match time</span>
      </div>
    </div>
  </div>
</div>
        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 className="page-title" style={{ fontSize: "28px", fontWeight: "700", color: "#e6edf3", letterSpacing: "-0.5px", marginBottom: "6px" }}>
                Cricket <span style={{ color: "#3fb950" }}>Live Scores</span>
              </h1>
              <p style={{ fontSize: "13px", color: "#7d8590" }}>
                Live scores, match updates and scorecards from around the world
              </p>
            </div>
          </div>

          {/* Stats Bar — horizontal on desktop, 2x2 grid on mobile */}
          <div className="stats-bar">
            <div className="stats-item" style={{ flex: 1 }}>
              <div className="stats-number" style={{ fontSize: "20px", fontWeight: "700", color: "#f85149" }}>{liveMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Live Now</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div className="stats-number" style={{ fontSize: "20px", fontWeight: "700", color: "#3fb950" }}>{completedMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Completed</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div className="stats-number" style={{ fontSize: "20px", fontWeight: "700", color: "#d4a853" }}>{upcomingMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Upcoming</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div className="stats-number" style={{ fontSize: "20px", fontWeight: "700", color: "#e6edf3" }}>{matches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Total Matches</div>
            </div>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Live Now" count={liveMatches.length} color="#f85149" />
            <div className="match-grid">
              {liveMatches.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Upcoming" count={upcomingMatches.length} color="#3fb950" />
            <div className="match-grid">
              {upcomingMatches.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {/* Completed Matches */}
        {completedMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Recent Results" count={completedMatches.length} color="#7d8590" />
            <div className="match-grid">
              {completedMatches.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {matches.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>🏏</p>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>No matches right now</h2>
            <p style={{ color: "#7d8590", fontSize: "14px" }}>Check back soon for live cricket action!</p>
          </div>
        )}

      </div>
    </div>
  );
}