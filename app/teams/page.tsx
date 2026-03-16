import Navbar from "../components/Navbar";
import Link from "next/link";

const INTERNATIONAL_TEAMS = [
  { id: "india", name: "India", flag: "🇮🇳", color: "#ff9900", bg: "rgba(255,153,0,0.1)", border: "rgba(255,153,0,0.3)", ranking: { test: 1, odi: 1, t20: 2 } },
  { id: "australia", name: "Australia", flag: "🇦🇺", color: "#ffcd00", bg: "rgba(255,205,0,0.1)", border: "rgba(255,205,0,0.3)", ranking: { test: 2, odi: 3, t20: 4 } },
  { id: "england", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#58a6ff", bg: "rgba(0,82,165,0.1)", border: "rgba(0,82,165,0.3)", ranking: { test: 3, odi: 4, t20: 5 } },
  { id: "pakistan", name: "Pakistan", flag: "🇵🇰", color: "#3fb950", bg: "rgba(1,119,54,0.1)", border: "rgba(1,119,54,0.3)", ranking: { test: 4, odi: 6, t20: 1 } },
  { id: "south-africa", name: "South Africa", flag: "🇿🇦", color: "#3fb950", bg: "rgba(0,122,61,0.1)", border: "rgba(0,122,61,0.3)", ranking: { test: 5, odi: 2, t20: 3 } },
  { id: "new-zealand", name: "New Zealand", flag: "🇳🇿", color: "#e6edf3", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)", ranking: { test: 6, odi: 5, t20: 6 } },
  { id: "sri-lanka", name: "Sri Lanka", flag: "🇱🇰", color: "#58a6ff", bg: "rgba(0,57,166,0.1)", border: "rgba(0,57,166,0.3)", ranking: { test: 7, odi: 7, t20: 7 } },
  { id: "west-indies", name: "West Indies", flag: "🏝️", color: "#f85149", bg: "rgba(134,0,56,0.1)", border: "rgba(134,0,56,0.3)", ranking: { test: 8, odi: 9, t20: 8 } },
  { id: "bangladesh", name: "Bangladesh", flag: "🇧🇩", color: "#3fb950", bg: "rgba(0,106,78,0.1)", border: "rgba(0,106,78,0.3)", ranking: { test: 9, odi: 8, t20: 9 } },
  { id: "afghanistan", name: "Afghanistan", flag: "🇦🇫", color: "#58a6ff", bg: "rgba(0,56,168,0.1)", border: "rgba(0,56,168,0.3)", ranking: { test: 10, odi: 10, t20: 10 } },
  { id: "zimbabwe", name: "Zimbabwe", flag: "🇿🇼", color: "#d4a853", bg: "rgba(212,168,83,0.1)", border: "rgba(212,168,83,0.3)", ranking: { test: 11, odi: 11, t20: 11 } },
  { id: "ireland", name: "Ireland", flag: "🇮🇪", color: "#3fb950", bg: "rgba(0,106,78,0.1)", border: "rgba(0,106,78,0.3)", ranking: { test: 12, odi: 12, t20: 12 } },
];

const IPL_TEAMS = [
  { id: "mi", name: "Mumbai Indians", short: "MI", color: "#004494", bg: "rgba(0,68,148,0.1)", border: "rgba(0,68,148,0.3)", titles: 5 },
  { id: "csk", name: "Chennai Super Kings", short: "CSK", color: "#ffcd00", bg: "rgba(255,205,0,0.1)", border: "rgba(255,205,0,0.3)", titles: 5 },
  { id: "rcb", name: "Royal Challengers Bengaluru", short: "RCB", color: "#f85149", bg: "rgba(165,0,0,0.1)", border: "rgba(165,0,0,0.3)", titles: 0 },
  { id: "kkr", name: "Kolkata Knight Riders", short: "KKR", color: "#a371f7", bg: "rgba(58,17,107,0.1)", border: "rgba(58,17,107,0.3)", titles: 3 },
  { id: "srh", name: "Sunrisers Hyderabad", short: "SRH", color: "#ff6600", bg: "rgba(255,102,0,0.1)", border: "rgba(255,102,0,0.3)", titles: 1 },
  { id: "dc", name: "Delhi Capitals", short: "DC", color: "#58a6ff", bg: "rgba(0,82,165,0.1)", border: "rgba(0,82,165,0.3)", titles: 0 },
  { id: "pbks", name: "Punjab Kings", short: "PBKS", color: "#f85149", bg: "rgba(200,0,0,0.1)", border: "rgba(200,0,0,0.3)", titles: 0 },
  { id: "rr", name: "Rajasthan Royals", short: "RR", color: "#ff69b4", bg: "rgba(255,105,180,0.1)", border: "rgba(255,105,180,0.3)", titles: 1 },
  { id: "lsg", name: "Lucknow Super Giants", short: "LSG", color: "#00bfff", bg: "rgba(0,191,255,0.1)", border: "rgba(0,191,255,0.3)", titles: 0 },
  { id: "gt", name: "Gujarat Titans", short: "GT", color: "#1c6b9e", bg: "rgba(28,107,158,0.1)", border: "rgba(28,107,158,0.3)", titles: 1 },
];

export default function TeamsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#e6edf3", marginBottom: "8px" }}>
            Cricket <span style={{ color: "#3fb950" }}>Teams</span>
          </h1>
          <p style={{ color: "#7d8590", fontSize: "13px" }}>International teams and IPL franchises</p>
        </div>

        {/* International Teams */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>International Teams</h2>
            <span style={{ fontSize: "11px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{INTERNATIONAL_TEAMS.length}</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(63,185,80,0.4), transparent)" }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
            {INTERNATIONAL_TEAMS.map((team) => (
              <div key={team.id} style={{ backgroundColor: "#161b22", border: "1px solid " + team.border, borderRadius: "14px", padding: "20px 16px", textAlign: "center", background: "linear-gradient(135deg, " + team.bg + ", #161b22)" }}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>{team.flag}</div>
                <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "14px", marginBottom: "10px" }}>{team.name}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                  <div style={{ backgroundColor: "#0d1117", borderRadius: "6px", padding: "4px 2px" }}>
                    <div style={{ color: team.color, fontSize: "12px", fontWeight: "700" }}>#{team.ranking.test}</div>
                    <div style={{ color: "#7d8590", fontSize: "9px" }}>TEST</div>
                  </div>
                  <div style={{ backgroundColor: "#0d1117", borderRadius: "6px", padding: "4px 2px" }}>
                    <div style={{ color: team.color, fontSize: "12px", fontWeight: "700" }}>#{team.ranking.odi}</div>
                    <div style={{ color: "#7d8590", fontSize: "9px" }}>ODI</div>
                  </div>
                  <div style={{ backgroundColor: "#0d1117", borderRadius: "6px", padding: "4px 2px" }}>
                    <div style={{ color: team.color, fontSize: "12px", fontWeight: "700" }}>#{team.ranking.t20}</div>
                    <div style={{ color: "#7d8590", fontSize: "9px" }}>T20</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IPL Teams */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>IPL Franchises</h2>
            <span style={{ fontSize: "11px", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{IPL_TEAMS.length}</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(248,81,73,0.4), transparent)" }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
            {IPL_TEAMS.map((team) => (
              <div key={team.id} style={{ backgroundColor: "#161b22", border: "1px solid " + team.border, borderRadius: "14px", padding: "20px 16px", textAlign: "center", background: "linear-gradient(135deg, " + team.bg + ", #161b22)" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: team.bg, border: "2px solid " + team.border, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: "16px", fontWeight: "800", color: team.color }}>
                  {team.short}
                </div>
                <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "13px", marginBottom: "8px" }}>{team.name}</div>
                {team.titles > 0 ? (
                  <span style={{ fontSize: "10px", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)", padding: "2px 8px", borderRadius: "100px" }}>
                    {team.titles}x Champions
                  </span>
                ) : (
                  <span style={{ fontSize: "10px", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid #30363d", padding: "2px 8px", borderRadius: "100px" }}>
                    No titles yet
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
