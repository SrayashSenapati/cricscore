import Navbar from "../components/Navbar";
import Link from "next/link";

async function getTeams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const res = await fetch(baseUrl + "/api/teams", { cache: "no-store" });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

function getTeamColor(name: string) {
  const n = name.toLowerCase();
  if (n.includes("india")) return { bg: "rgba(255,153,0,0.1)", border: "rgba(255,153,0,0.3)", color: "#ff9900" };
  if (n.includes("australia")) return { bg: "rgba(255,205,0,0.1)", border: "rgba(255,205,0,0.3)", color: "#ffcd00" };
  if (n.includes("england")) return { bg: "rgba(0,82,165,0.1)", border: "rgba(0,82,165,0.3)", color: "#58a6ff" };
  if (n.includes("pakistan")) return { bg: "rgba(1,119,54,0.1)", border: "rgba(1,119,54,0.3)", color: "#3fb950" };
  if (n.includes("south africa")) return { bg: "rgba(0,122,61,0.1)", border: "rgba(0,122,61,0.3)", color: "#3fb950" };
  if (n.includes("new zealand")) return { bg: "rgba(0,0,0,0.2)", border: "rgba(255,255,255,0.15)", color: "#e6edf3" };
  if (n.includes("sri lanka")) return { bg: "rgba(0,57,166,0.1)", border: "rgba(0,57,166,0.3)", color: "#58a6ff" };
  if (n.includes("west indies")) return { bg: "rgba(134,0,56,0.1)", border: "rgba(134,0,56,0.3)", color: "#f85149" };
  if (n.includes("bangladesh")) return { bg: "rgba(0,106,78,0.1)", border: "rgba(0,106,78,0.3)", color: "#3fb950" };
  if (n.includes("afghanistan")) return { bg: "rgba(0,56,168,0.1)", border: "rgba(0,56,168,0.3)", color: "#58a6ff" };
  if (n.includes("mumbai")) return { bg: "rgba(0,68,148,0.1)", border: "rgba(0,68,148,0.3)", color: "#58a6ff" };
  if (n.includes("chennai")) return { bg: "rgba(255,193,7,0.1)", border: "rgba(255,193,7,0.3)", color: "#d4a853" };
  if (n.includes("royal challengers")) return { bg: "rgba(165,0,0,0.1)", border: "rgba(165,0,0,0.3)", color: "#f85149" };
  if (n.includes("kolkata")) return { bg: "rgba(58,17,107,0.1)", border: "rgba(58,17,107,0.3)", color: "#a371f7" };
  return { bg: "rgba(63,185,80,0.1)", border: "rgba(63,185,80,0.3)", color: "#3fb950" };
}

function getTeamFlag(name: string) {
  const n = name.toLowerCase();
  if (n.includes("india")) return "🇮🇳";
  if (n.includes("australia")) return "🇦🇺";
  if (n.includes("england")) return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  if (n.includes("pakistan")) return "🇵🇰";
  if (n.includes("south africa")) return "🇿🇦";
  if (n.includes("new zealand")) return "🇳🇿";
  if (n.includes("sri lanka")) return "🇱🇰";
  if (n.includes("west indies")) return "🏝️";
  if (n.includes("bangladesh")) return "🇧🇩";
  if (n.includes("zimbabwe")) return "🇿🇼";
  if (n.includes("afghanistan")) return "🇦🇫";
  if (n.includes("ireland")) return "🇮🇪";
  return "🏏";
}

export default async function TeamsPage() {
  const teams = await getTeams();

  const intlTeams = teams.filter((t: any) => {
    const n = (t.name || "").toLowerCase();
    const iplTeams = ["mumbai", "chennai", "royal challengers", "kolkata", "sunrisers", "delhi capitals", "punjab", "rajasthan"];
    return !iplTeams.some((k) => n.includes(k));
  });

  const iplTeams = teams.filter((t: any) => {
    const n = (t.name || "").toLowerCase();
    const iplTeams = ["mumbai", "chennai", "royal challengers", "kolkata", "sunrisers", "delhi capitals", "punjab", "rajasthan"];
    return iplTeams.some((k) => n.includes(k));
  });

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

        {intlTeams.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>International Teams</h2>
              <span style={{ fontSize: "11px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{intlTeams.length}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(63,185,80,0.4), transparent)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {intlTeams.map((team: any) => {
                const colors = getTeamColor(team.name);
                const flag = getTeamFlag(team.name);
                return (
                  <Link key={team.id} href={"/teams/" + team.id} style={{ textDecoration: "none" }}>
                    <div style={{ backgroundColor: "#161b22", border: "1px solid " + colors.border, borderRadius: "14px", padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "linear-gradient(135deg, " + colors.bg + ", #161b22)" }}>
                      <div style={{ fontSize: "40px", marginBottom: "10px" }}>{flag}</div>
                      <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "14px", marginBottom: "4px" }}>{team.name}</div>
                      {team.teamType && (
                        <span style={{ fontSize: "10px", color: colors.color, backgroundColor: colors.bg, border: "1px solid " + colors.border, padding: "2px 8px", borderRadius: "100px" }}>
                          {team.teamType}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {iplTeams.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>IPL Franchises</h2>
              <span style={{ fontSize: "11px", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{iplTeams.length}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(248,81,73,0.4), transparent)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {iplTeams.map((team: any) => {
                const colors = getTeamColor(team.name);
                return (
                  <Link key={team.id} href={"/teams/" + team.id} style={{ textDecoration: "none" }}>
                    <div style={{ backgroundColor: "#161b22", border: "1px solid " + colors.border, borderRadius: "14px", padding: "20px 16px", textAlign: "center", cursor: "pointer", background: "linear-gradient(135deg, " + colors.bg + ", #161b22)" }}>
                      <div style={{ fontSize: "40px", marginBottom: "10px" }}>🏏</div>
                      <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "14px", marginBottom: "4px" }}>{team.name}</div>
                      <span style={{ fontSize: "10px", color: colors.color, backgroundColor: colors.bg, border: "1px solid " + colors.border, padding: "2px 8px", borderRadius: "100px" }}>IPL</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {teams.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>👥</p>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>No teams found</h2>
            <p style={{ color: "#7d8590" }}>Check back soon!</p>
          </div>
        )}

      </div>
    </div>
  );
}
