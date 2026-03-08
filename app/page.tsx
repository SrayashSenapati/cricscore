import Navbar from "./components/Navbar";
import MatchCard from "./components/MatchCard";
import AutoRefresh from "./components/AutoRefresh";

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

function isFeatured(match: any) {
  const name = (match.name || "").toLowerCase();
  const teams = (match.teams || []).join(" ").toLowerCase();
  const combined = name + " " + teams;
  const keywords = ["world cup", "final", "semi-final", "champions trophy", "ipl", "ind", "pak", "india", "pakistan", "new zealand", "nz", "australia", "england"];
  return keywords.some((k) => combined.includes(k));
}

function SectionHeader({ title, count, color = "#3fb950" }: { title: string, count: number, color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#e6edf3" }}>{title}</h2>
      <span style={{ fontSize: "11px", fontWeight: "600", color: color, backgroundColor: color + "18", border: "1px solid " + color + "30", padding: "2px 8px", borderRadius: "100px" }}>{count}</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, " + color + "40, transparent)" }}></div>
    </div>
  );
}

export default async function Home() {
  const matches = await getLiveMatches();

  const liveMatches = matches.filter((m: any) => m.matchStarted && !m.matchEnded);
  const completedMatches = matches.filter((m: any) => m.matchEnded);
  const upcomingMatches = matches.filter((m: any) => !m.matchStarted);

  const featuredMatches = matches.filter((m: any) => isFeatured(m));
  const featuredIds = new Set(featuredMatches.map((m: any) => m.id));

  const regularLive = liveMatches.filter((m: any) => !featuredIds.has(m.id));
  const regularUpcoming = upcomingMatches.filter((m: any) => !featuredIds.has(m.id));
  const regularCompleted = completedMatches.filter((m: any) => !featuredIds.has(m.id));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(212,168,83,0.2), 0 0 40px rgba(212,168,83,0.1); } 50% { box-shadow: 0 0 30px rgba(212,168,83,0.4), 0 0 60px rgba(212,168,83,0.2); } }
        .stats-bar { display: flex; gap: 24px; margin-top: 20px; padding: 16px 20px; background-color: #161b22; border: 1px solid #30363d; border-radius: 10px; flex-wrap: wrap; }
        .stats-divider { width: 1px; background-color: #30363d; }
        .match-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        @media (max-width: 768px) {
          .stats-bar { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0; background: transparent !important; border: none !important; }
          .stats-item { background-color: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 16px; text-align: center; }
          .stats-divider { display: none; }
          .match-grid { grid-template-columns: 1fr !important; }
          .page-title { font-size: 22px !important; }
        }
      `}</style>

      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>

        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 className="page-title" style={{ fontSize: "28px", fontWeight: "700", color: "#e6edf3", letterSpacing: "-0.5px", marginBottom: "6px" }}>
                Cricket <span style={{ color: "#3fb950" }}>Live Scores</span>
              </h1>
              <p style={{ fontSize: "13px", color: "#7d8590" }}>Live scores, match updates and scorecards from around the world</p>
            </div>
            <AutoRefresh interval={120} />
          </div>

          <div className="stats-bar">
            <div className="stats-item" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#f85149" }}>{liveMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Live Now</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#3fb950" }}>{completedMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Completed</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#d4a853" }}>{upcomingMatches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Upcoming</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#e6edf3" }}>{matches.length}</div>
              <div style={{ fontSize: "11px", color: "#7d8590", marginTop: "2px" }}>Total</div>
            </div>
          </div>
        </div>

        {featuredMatches.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Featured Matches" count={featuredMatches.length} color="#d4a853" />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {featuredMatches.map((match: any) => (
                <MatchCard key={match.id} match={match} featured={true} />
              ))}
            </div>
          </section>
        )}

        {regularLive.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Live Now" count={regularLive.length} color="#f85149" />
            <div className="match-grid">
              {regularLive.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {regularUpcoming.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Upcoming" count={regularUpcoming.length} color="#3fb950" />
            <div className="match-grid">
              {regularUpcoming.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {regularCompleted.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <SectionHeader title="Recent Results" count={regularCompleted.length} color="#7d8590" />
            <div className="match-grid">
              {regularCompleted.map((match: any) => <MatchCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        {matches.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>No matches right now</h2>
            <p style={{ color: "#7d8590", fontSize: "14px" }}>Check back soon for live cricket action!</p>
          </div>
        )}

      </div>
    </div>
  );
}