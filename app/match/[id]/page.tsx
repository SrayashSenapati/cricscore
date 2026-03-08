import Navbar from "../../components/Navbar";
import Link from "next/link";

async function getMatchDetail(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const response = await fetch(`${baseUrl}/api/match-detail?id=${id}`, { cache: "no-store" });
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    return null;
  }
}

export default async function MatchDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await getMatchDetail(id);

  if (!match) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
        <Navbar />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Match not found</h2>
          <Link href="/" style={{ color: "#0d1117", backgroundColor: "#3fb950", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
            Back to Live Scores
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.matchStarted && !match.matchEnded;
  const team1 = match.teamInfo ? match.teamInfo[0] : null;
  const team2 = match.teamInfo ? match.teamInfo[1] : null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        <Link href="/" style={{ display: "inline-flex", color: "#7d8590", textDecoration: "none", fontSize: "13px", marginBottom: "24px" }}>
          Back to Live Scores
        </Link>

        <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "16px", padding: "28px", marginBottom: "28px" }}>

          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(212,168,83,0.3)" }}>
              {match.matchType ? match.matchType.toUpperCase() : ""}
            </span>
            {isLive && (
              <span style={{ fontSize: "11px", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(248,81,73,0.3)" }}>
                LIVE
              </span>
            )}
            {match.matchEnded && (
              <span style={{ fontSize: "11px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(63,185,80,0.3)" }}>
                COMPLETED
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              {team1 && team1.img && (
                <img src={team1.img} alt={team1.name} style={{ width: "52px", height: "52px", borderRadius: "50%", marginBottom: "8px" }} />
              )}
              <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "16px" }}>
                {match.teams ? match.teams[0] : ""}
              </div>
            </div>

            <div style={{ textAlign: "center", flex: 2 }}>
              <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "12px" }}>VS</div>
              {match.score && match.score.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {match.score.map((s: any, i: number) => (
                    <div key={i} style={{ backgroundColor: "#0d1117", border: "1px solid #30363d", borderRadius: "8px", padding: "8px 14px" }}>
                      <div style={{ color: "#7d8590", fontSize: "11px", marginBottom: "2px" }}>{s.inning}</div>
                      <div>
                        <span style={{ color: "#3fb950", fontWeight: "700", fontSize: "18px" }}>{s.r}/{s.w}</span>
                        <span style={{ color: "#7d8590", fontSize: "12px", marginLeft: "6px" }}>({s.o} ov)</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "#7d8590", fontSize: "14px" }}>
                  {match.matchStarted ? "In Progress" : "Yet to start"}
                </div>
              )}
            </div>

            <div style={{ textAlign: "center", flex: 1 }}>
              {team2 && team2.img && (
                <img src={team2.img} alt={team2.name} style={{ width: "52px", height: "52px", borderRadius: "50%", marginBottom: "8px" }} />
              )}
              <div style={{ color: "#e6edf3", fontWeight: "700", fontSize: "16px" }}>
                {match.teams ? match.teams[1] : ""}
              </div>
            </div>
          </div>

          {match.status && (
            <div style={{ marginTop: "20px", padding: "12px 16px", backgroundColor: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.15)", borderRadius: "8px", textAlign: "center" }}>
              <p style={{ color: "#3fb950", fontSize: "14px", fontWeight: "500" }}>{match.status}</p>
            </div>
          )}

          {match.venue && (
            <div style={{ marginTop: "16px" }}>
              <span style={{ color: "#7d8590", fontSize: "12px" }}>Venue: {match.venue}</span>
            </div>
          )}
        </div>

        {match.scorecard && match.scorecard.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#e6edf3", marginBottom: "16px" }}>Scorecard</h2>
            {match.scorecard.map((inning: any, index: number) => (
              <div key={index} style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #30363d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ color: "#e6edf3", fontWeight: "700", fontSize: "16px" }}>{inning.inning}</h3>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#3fb950", fontWeight: "700", fontSize: "22px" }}>{inning.r}/{inning.w}</div>
                    <div style={{ color: "#7d8590", fontSize: "12px" }}>{inning.o} overs</div>
                  </div>
                </div>
                {inning.batsman && inning.batsman.length > 0 && (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "8px 20px", backgroundColor: "#0d1117" }}>
                      {["Batter", "R", "B", "4s", "6s"].map((h) => (
                        <div key={h} style={{ color: "#7d8590", fontSize: "11px", fontWeight: "600" }}>{h}</div>
                      ))}
                    </div>
                    {inning.batsman.map((b: any, i: number) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "10px 20px", borderBottom: "1px solid #21262d" }}>
                        <div>
                          <div style={{ color: "#e6edf3", fontSize: "13px" }}>{b.name}</div>
                          <div style={{ color: "#7d8590", fontSize: "11px" }}>{b.dismissal || "batting"}</div>
                        </div>
                        <div style={{ color: "#e6edf3", fontSize: "13px", fontWeight: "700" }}>{b.r}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b.b}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b["4s"]}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b["6s"]}</div>
                      </div>
                    ))}
                  </div>
                )}
                {inning.bowler && inning.bowler.length > 0 && (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "8px 20px", backgroundColor: "#0d1117", borderTop: "1px solid #30363d" }}>
                      {["Bowler", "O", "M", "R", "W"].map((h) => (
                        <div key={h} style={{ color: "#7d8590", fontSize: "11px", fontWeight: "600" }}>{h}</div>
                      ))}
                    </div>
                    {inning.bowler.map((b: any, i: number) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "10px 20px", borderBottom: "1px solid #21262d" }}>
                        <div style={{ color: "#e6edf3", fontSize: "13px" }}>{b.name}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b.o}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b.m}</div>
                        <div style={{ color: "#7d8590", fontSize: "13px" }}>{b.r}</div>
                        <div style={{ color: b.w > 0 ? "#3fb950" : "#7d8590", fontSize: "13px", fontWeight: b.w > 0 ? "700" : "400" }}>{b.w}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(!match.scorecard || match.scorecard.length === 0) && match.matchStarted && (
          <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#7d8590", fontSize: "14px" }}>Scorecard loading...</p>
          </div>
        )}

      </div>
    </div>
  );
}