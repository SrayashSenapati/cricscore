import Navbar from "../../components/Navbar";
import Link from "next/link";

async function getPlayerInfo(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const res = await fetch(baseUrl + "/api/player-info?id=" + id, { cache: "no-store" });
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export default async function PlayerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getPlayerInfo(id);

  if (!player) {
    return (
      <div style={{ minHeight:"100vh", backgroundColor:"#0d1117", color:"#e6edf3" }}>
        <Navbar />
        <div style={{ maxWidth:"900px", margin:"0 auto", padding:"80px 24px", textAlign:"center" }}>
          <h2 style={{ fontSize:"24px", fontWeight:"700", marginBottom:"8px" }}>Player not found</h2>
          <Link href="/players" style={{ color:"#0d1117", backgroundColor:"#3fb950", padding:"10px 24px", borderRadius:"8px", textDecoration:"none", fontWeight:"600" }}>
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const stats = player.stats || [];

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#0d1117", color:"#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"32px 24px" }}>

        <Link href="/players" style={{ display:"inline-flex", color:"#7d8590", textDecoration:"none", fontSize:"13px", marginBottom:"24px" }}>
          Back to Players
        </Link>

        <div style={{ backgroundColor:"#161b22", border:"1px solid #30363d", borderRadius:"16px", padding:"28px", marginBottom:"24px", background:"linear-gradient(135deg, #1c2128 0%, #161b22 100%)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", backgroundColor:"#0d1117", border:"2px solid #30363d", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"32px" }}>
              🏏
            </div>
            <div>
              <h1 style={{ fontSize:"26px", fontWeight:"700", color:"#e6edf3", marginBottom:"8px" }}>{player.name}</h1>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {player.country && (
                  <span style={{ fontSize:"12px", color:"#7d8590", backgroundColor:"#0d1117", padding:"3px 10px", borderRadius:"100px", border:"1px solid #30363d" }}>
                    {player.country}
                  </span>
                )}
                {player.playerType && (
                  <span style={{ fontSize:"12px", color:"#3fb950", backgroundColor:"rgba(63,185,80,0.1)", padding:"3px 10px", borderRadius:"100px", border:"1px solid rgba(63,185,80,0.3)" }}>
                    {player.playerType}
                  </span>
                )}
                {player.battingStyle && (
                  <span style={{ fontSize:"12px", color:"#d4a853", backgroundColor:"rgba(212,168,83,0.1)", padding:"3px 10px", borderRadius:"100px", border:"1px solid rgba(212,168,83,0.3)" }}>
                    {player.battingStyle}
                  </span>
                )}
                {player.bowlingStyle && (
                  <span style={{ fontSize:"12px", color:"#58a6ff", backgroundColor:"rgba(88,166,255,0.1)", padding:"3px 10px", borderRadius:"100px", border:"1px solid rgba(88,166,255,0.3)" }}>
                    {player.bowlingStyle}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"16px", marginTop:"24px" }}>
            {player.dateOfBirth && (
              <div style={{ backgroundColor:"#0d1117", borderRadius:"8px", padding:"12px 16px", border:"1px solid #21262d" }}>
                <div style={{ color:"#7d8590", fontSize:"11px", marginBottom:"4px" }}>Date of Birth</div>
                <div style={{ color:"#e6edf3", fontSize:"13px", fontWeight:"600" }}>{player.dateOfBirth}</div>
              </div>
            )}
            {player.placeOfBirth && (
              <div style={{ backgroundColor:"#0d1117", borderRadius:"8px", padding:"12px 16px", border:"1px solid #21262d" }}>
                <div style={{ color:"#7d8590", fontSize:"11px", marginBottom:"4px" }}>Place of Birth</div>
                <div style={{ color:"#e6edf3", fontSize:"13px", fontWeight:"600" }}>{player.placeOfBirth}</div>
              </div>
            )}
            {player.role && (
              <div style={{ backgroundColor:"#0d1117", borderRadius:"8px", padding:"12px 16px", border:"1px solid #21262d" }}>
                <div style={{ color:"#7d8590", fontSize:"11px", marginBottom:"4px" }}>Role</div>
                <div style={{ color:"#e6edf3", fontSize:"13px", fontWeight:"600" }}>{player.role}</div>
              </div>
            )}
          </div>
        </div>

        {stats.length > 0 && (
          <div>
            <h2 style={{ fontSize:"16px", fontWeight:"700", color:"#e6edf3", marginBottom:"16px" }}>Career Statistics</h2>
            {stats.map((stat: any, index: number) => (
              <div key={index} style={{ backgroundColor:"#161b22", border:"1px solid #30363d", borderRadius:"12px", overflow:"hidden", marginBottom:"16px" }}>
                <div style={{ padding:"12px 20px", borderBottom:"1px solid #30363d", backgroundColor:"#1c2128" }}>
                  <h3 style={{ color:"#d4a853", fontWeight:"700", fontSize:"13px", letterSpacing:"0.05em" }}>{stat.fn}</h3>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))", gap:"1px", backgroundColor:"#30363d" }}>
                  {Object.entries(stat).filter(([key]) => key !== "fn").map(([key, value]: any) => (
                    <div key={key} style={{ backgroundColor:"#161b22", padding:"12px 16px", textAlign:"center" }}>
                      <div style={{ color:"#7d8590", fontSize:"10px", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{key}</div>
                      <div style={{ color:"#e6edf3", fontSize:"14px", fontWeight:"700" }}>{value || "-"}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {stats.length === 0 && (
          <div style={{ backgroundColor:"#161b22", border:"1px solid #30363d", borderRadius:"12px", padding:"40px", textAlign:"center" }}>
            <p style={{ fontSize:"32px", marginBottom:"12px" }}>📊</p>
            <p style={{ color:"#7d8590", fontSize:"14px" }}>No career stats available for this player</p>
          </div>
        )}

      </div>
    </div>
  );
}