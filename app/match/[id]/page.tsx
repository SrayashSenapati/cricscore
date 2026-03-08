import Navbar from "../../components/Navbar";
import Link from "next/link";

async function getMatchDetail(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";

    const response = await fetch(`${baseUrl}/api/match-detail?id=${id}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    return null;
  }
}

function ScoreCard({ innings }: { innings: any }) {
  if (!innings || innings.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {innings.map((inning: any, index: number) => (
        <div
          key={index}
          style={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #30363d",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #1c2128, #161b22)",
            }}
          >
            <h3
              style={{
                color: "#e6edf3",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              {inning.inning}
            </h3>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "#3fb950",
                  fontWeight: "700",
                  fontSize: "22px",
                }}
              >
                {inning.r}/{inning.w}
              </div>
              <div style={{ color: "#7d8590", fontSize: "12px" }}>
                {inning.o} overs
              </div>
            </div>
          </div>

          {inning.batsman && inning.batsman.length > 0 && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  padding: "8px 20px",
                  backgroundColor: "#0d1117",
                  borderBottom: "1px solid #21262d",
                }}
              >
                {["Batter", "R", "B", "4s", "6s"].map((h) => (
                  <div
                    key={h}
                    style={{
                      color: "#7d8590",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {inning.batsman.map((b: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                    padding: "10px 20px",
                    borderBottom: "1px solid #21262d",
                    backgroundColor:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#e6edf3",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      {b.name}
                    </div>

                    <div
                      style={{
                        color: "#7d8590",
                        fontSize: "11px",
                        marginTop: "2px",
                      }}
                    >
                      {b.dismissal || "batting"}
                    </div>
                  </div>

                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {b.r}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b.b}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b["4s"]}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b["6s"]}
                  </div>
                </div>
              ))}
            </div>
          )}

          {inning.bowler && inning.bowler.length > 0 && (
            <div style={{ marginTop: "8px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  padding: "8px 20px",
                  backgroundColor: "#0d1117",
                  borderBottom: "1px solid #21262d",
                  borderTop: "1px solid #30363d",
                }}
              >
                {["Bowler", "O", "M", "R", "W"].map((h) => (
                  <div
                    key={h}
                    style={{
                      color: "#7d8590",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {inning.bowler.map((b: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                    padding: "10px 20px",
                    borderBottom: "1px solid #21262d",
                    backgroundColor:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {b.name}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b.o}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b.m}
                  </div>

                  <div style={{ color: "#7d8590", fontSize: "13px" }}>
                    {b.r}
                  </div>

                  <div
                    style={{
                      color: b.w > 0 ? "#3fb950" : "#7d8590",
                      fontSize: "13px",
                      fontWeight: b.w > 0 ? "700" : "400",
                    }}
                  >
                    {b.w}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function MatchDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const match = await getMatchDetail(id);

  if (!match) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#e6edf3",
        }}
      >
        <Navbar />

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>🏏</p>

          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Match not found
          </h2>

          <p style={{ color: "#7d8590", marginBottom: "24px" }}>
            This match may have ended or the data is unavailable.
          </p>

          <Link
            href="/"
            style={{
              color: "#0d1117",
              backgroundColor: "#3fb950",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Back to Live Scores
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.matchStarted && !match.matchEnded;
  const team1 = match.teamInfo?.[0];
  const team2 = match.teamInfo?.[1];

  const shareUrl = "https://cricscore-xi.vercel.app/match/" + match.id;

  const shareMessage = encodeURIComponent(
    "🏏 " +
      (match.teams?.[0] || "") +
      " vs " +
      (match.teams?.[1] || "") +
      "\n" +
      (match.status || "") +
      "\n\nLive on CricScore 👉 " +
      shareUrl
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#7d8590",
            textDecoration: "none",
            fontSize: "13px",
            marginBottom: "24px",
          }}
        >
          Back to Live Scores
        </Link>

        <div style={{ marginTop: "16px" }}>
          <a
            href={"https://wa.me/?text=" + shareMessage}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.3)",
              color: "#25d366",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            📲 Share on WhatsApp
          </a>
        </div>

        {match.scorecard && match.scorecard.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#e6edf3",
                marginBottom: "16px",
              }}
            >
              📊 Scorecard
            </h2>

            <ScoreCard innings={match.scorecard} />
          </div>
        )}
      </div>
    </div>
  );
}