import Navbar from "../../components/Navbar";
import Link from "next/link";

async function getTeamInfo(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const res = await fetch(baseUrl + "/api/team-info?id=" + id, { cache: "no-store" });
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export default async function TeamDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = await getTeamInfo(id);

  if (!team) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
        <Navbar />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Team not found</h2>
          <Link href="/teams" style={{ color: "#0d1117", backgroundColor: "#3fb950", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  const players = team.players || [];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        <Link href="/teams" style={{ display: "inline-flex", color: "#7d8590", textDecoration: "none", fontSize: "13px", marginBottom: "24px" }}>
          Back to Teams
        </Link>

        <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "16px", padding: "28px", marginBottom: "24px", background: "linear-gradient(135deg, #1c2128 0%, #161b22 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {team.img ? (
              <img src={team.img} alt={team.name} style={{ width: "72px", height: "72px", borderRadius: "50%", border: "2px solid #30363d" }} />
            ) : (
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#0d1117", border: "2px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                🏏
              </div>
            )}
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#e6edf3", marginBottom: "8px" }}>{team.name}</h1>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {team.teamType && (
                  <span style={{ fontSize: "12px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(63,185,80,0.3)" }}>
                    {team.teamType}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {players.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#e6edf3", marginBottom: "16px" }}>Squad</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
              {players.map((player: any, i: number) => (
                <Link key={i} href={"/players/" + player.id} style={{ textDecoration: "none" }}>
                  <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#0d1117", border: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                      🏏
                    </div>
                    <div>
                      <div style={{ color: "#e6edf3", fontSize: "13px", fontWeight: "500" }}>{player.name}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {players.length === 0 && (
          <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#7d8590", fontSize: "14px" }}>No squad data available</p>
          </div>
        )}

      </div>
    </div>
  );
}
