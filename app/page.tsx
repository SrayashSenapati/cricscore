import Navbar from "./components/Navbar";
import MatchCard from "./components/MatchCard";
import AutoRefresh from "./components/AutoRefresh";

async function getLiveMatches() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const response = await fetch(
      `${baseUrl}/api/matches`,
      { cache: "no-store" }
    );
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
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#e6edf3", letterSpacing: "-0.5px", marginBottom: "6px" }}>
                Cricket <span style={{ color: "#3fb950" }}>Live Scores</span>
              </h1>
              <p style={{ fontSize: "13px", color: "#7d8590" }}>
                Live scores, match updates and scorecards from around the world
              </p>
            </div>
            <AutoRefresh interval={30} />
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: "24px", marginTop: "20px", padding: "16px 20px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "10px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#f85149" }}>{liveMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Live Now</div>
            </div>
            <div style={{ width: "1px", backgroundColor: "#30363d" }}></div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#3fb950" }}>{completedMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Completed</div>
            </div>
            <div style={{ width: "1px", backgroundColor: "#30363d" }}></div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#d4a853" }}>{upcomingMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Upcoming</div>
            </div>
            <div style={{ width: "1px", backgroundColor: "#30363d" }}></div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#e6edf3" }}>{matches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Total Matches</div>
            </div>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Live Now" count={liveMatches.length} color="#f85149" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {liveMatches.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Upcoming" count={upcomingMatches.length} color="#3fb950" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {upcomingMatches.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {/* Completed Matches */}
        {completedMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Recent Results" count={completedMatches.length} color="#7d8590" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
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