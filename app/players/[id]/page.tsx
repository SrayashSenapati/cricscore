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

const FORMAT_LABELS: any = {
  odi: "ODI", t20i: "T20I", test: "Test", ipl: "IPL",
  t20: "T20", fc: "First Class", lista: "List A"
};

const IMPORTANT_BATTING = ["m", "inn", "no", "runs", "hs", "avg", "sr", "100", "50", "4s", "6s"];
const IMPORTANT_BOWLING = ["m", "inn", "wkts", "avg", "econ", "sr", "bbi", "bbm", "5w", "10w"];

const BATTING_LABELS: any = {
  m: "Mat", inn: "Inn", no: "NO", runs: "Runs", hs: "HS",
  avg: "Avg", sr: "SR", "100": "100s", "50": "50s", "4s": "4s", "6s": "6s"
};
const BOWLING_LABELS: any = {
  m: "Mat", inn: "Inn", wkts: "Wkts", avg: "Avg", econ: "Econ",
  sr: "SR", bbi: "BBI", bbm: "BBM", "5w": "5W", "10w": "10W"
};

function buildTables(stats: any[]) {
  const batting: any = {};
  const bowling: any = {};

  stats.forEach((s: any) => {
    const fmt = (s.matchtype || "").toLowerCase();
    const stat = (s.stat || "").toLowerCase();
    const val = s.value || "-";
    if (s.fn === "batting") {
      if (!batting[fmt]) batting[fmt] = {};
      batting[fmt][stat] = val;
    }
    if (s.fn === "bowling") {
      if (!bowling[fmt]) bowling[fmt] = {};
      bowling[fmt][stat] = val;
    }
  });

  return { batting, bowling };
}

function StatTable({ title, data, keys, labels, color }: any) {
  const formats = Object.keys(data).filter(f => ["odi","t20i","test","ipl","t20"].includes(f));
  if (formats.length === 0) return null;

  return (
    <div style={{ marginBottom: "28px" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", color: color, marginBottom: "12px", letterSpacing: "0.05em" }}>
        {title}
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "#1c2128" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", color: "#7d8590", fontWeight: "600", fontSize: "11px", borderBottom: "1px solid #30363d", whiteSpace: "nowrap" }}>Format</th>
              {keys.map((k: string) => (
                <th key={k} style={{ padding: "10px 14px", textAlign: "center", color: "#7d8590", fontWeight: "600", fontSize: "11px", borderBottom: "1px solid #30363d", whiteSpace: "nowrap" }}>
                  {labels[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formats.map((fmt, i) => (
              <tr key={fmt} style={{ backgroundColor: i % 2 === 0 ? "#161b22" : "#0d1117" }}>
                <td style={{ padding: "10px 14px", color: color, fontWeight: "700", fontSize: "12px", borderBottom: "1px solid #21262d", whiteSpace: "nowrap" }}>
                  {FORMAT_LABELS[fmt] || fmt.toUpperCase()}
                </td>
                {keys.map((k: string) => (
                  <td key={k} style={{ padding: "10px 14px", textAlign: "center", color: data[fmt][k] && data[fmt][k] !== "-" ? "#e6edf3" : "#4a5568", fontWeight: k === "runs" || k === "wkts" ? "700" : "400", borderBottom: "1px solid #21262d", whiteSpace: "nowrap" }}>
                    {data[fmt][k] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function PlayerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getPlayerInfo(id);

  if (!player) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
        <Navbar />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Player not found</h2>
          <Link href="/players" style={{ color: "#0d1117", backgroundColor: "#3fb950", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const { batting, bowling } = buildTables(player.stats || []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        <Link href="/players" style={{ display: "inline-flex", color: "#7d8590", textDecoration: "none", fontSize: "13px", marginBottom: "24px" }}>
          Back to Players
        </Link>

        {/* Player Header */}
        <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "16px", padding: "28px", marginBottom: "24px", background: "linear-gradient(135deg, #1c2128 0%, #161b22 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#0d1117", border: "2px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
              🏏
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#e6edf3", marginBottom: "10px" }}>{player.name}</h1>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {player.country && (
                  <span style={{ fontSize: "12px", color: "#7d8590", backgroundColor: "#0d1117", padding: "3px 10px", borderRadius: "100px", border: "1px solid #30363d" }}>
                    {player.country}
                  </span>
                )}
                {player.playerType && (
                  <span style={{ fontSize: "12px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(63,185,80,0.3)" }}>
                    {player.playerType}
                  </span>
                )}
                {player.battingStyle && (
                  <span style={{ fontSize: "12px", color: "#d4a853", backgroundColor: "rgba(212,168,83,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(212,168,83,0.3)" }}>
                    {player.battingStyle}
                  </span>
                )}
                {player.bowlingStyle && (
                  <span style={{ fontSize: "12px", color: "#58a6ff", backgroundColor: "rgba(88,166,255,0.1)", padding: "3px 10px", borderRadius: "100px", border: "1px solid rgba(88,166,255,0.3)" }}>
                    {player.bowlingStyle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginTop: "20px" }}>
            {player.dateOfBirth && (
              <div style={{ backgroundColor: "#0d1117", borderRadius: "8px", padding: "10px 14px", border: "1px solid #21262d" }}>
                <div style={{ color: "#7d8590", fontSize: "10px", marginBottom: "3px" }}>DATE OF BIRTH</div>
                <div style={{ color: "#e6edf3", fontSize: "13px", fontWeight: "600" }}>{player.dateOfBirth}</div>
              </div>
            )}
            {player.placeOfBirth && (
              <div style={{ backgroundColor: "#0d1117", borderRadius: "8px", padding: "10px 14px", border: "1px solid #21262d" }}>
                <div style={{ color: "#7d8590", fontSize: "10px", marginBottom: "3px" }}>BORN IN</div>
                <div style={{ color: "#e6edf3", fontSize: "13px", fontWeight: "600" }}>{player.placeOfBirth}</div>
              </div>
            )}
            {player.role && (
              <div style={{ backgroundColor: "#0d1117", borderRadius: "8px", padding: "10px 14px", border: "1px solid #21262d" }}>
                <div style={{ color: "#7d8590", fontSize: "10px", marginBottom: "3px" }}>ROLE</div>
                <div style={{ color: "#e6edf3", fontSize: "13px", fontWeight: "600" }}>{player.role}</div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Tables */}
        <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#e6edf3", marginBottom: "24px" }}>Career Statistics</h2>

          <StatTable
            title="BATTING"
            data={batting}
            keys={IMPORTANT_BATTING}
            labels={BATTING_LABELS}
            color="#d4a853"
          />

          <StatTable
            title="BOWLING"
            data={bowling}
            keys={IMPORTANT_BOWLING}
            labels={BOWLING_LABELS}
            color="#58a6ff"
          />

          {Object.keys(batting).length === 0 && Object.keys(bowling).length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "#7d8590", fontSize: "14px" }}>No career stats available</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}