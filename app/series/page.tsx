import Navbar from "../components/Navbar";

async function getSeries() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cricscore-xi.vercel.app";
    const res = await fetch(baseUrl + "/api/series", { cache: "no-store" });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

function getSeriesType(name: string) {
  const n = name.toLowerCase();
  if (n.includes("ipl")) return { label: "IPL", color: "#f85149" };
  if (n.includes("bbl")) return { label: "BBL", color: "#58a6ff" };
  if (n.includes("psl")) return { label: "PSL", color: "#3fb950" };
  if (n.includes("cpl")) return { label: "CPL", color: "#d4a853" };
  if (n.includes("sa20")) return { label: "SA20", color: "#f85149" };
  if (n.includes("hundred")) return { label: "The Hundred", color: "#d4a853" };
  if (n.includes("world cup")) return { label: "World Cup", color: "#d4a853" };
  if (n.includes("champions trophy")) return { label: "Champions Trophy", color: "#d4a853" };
  if (n.includes("asia cup")) return { label: "Asia Cup", color: "#58a6ff" };
  if (n.includes("icc")) return { label: "ICC", color: "#d4a853" };
  if (n.includes("test")) return { label: "Test", color: "#e6edf3" };
  if (n.includes("t20")) return { label: "T20", color: "#3fb950" };
  if (n.includes("odi")) return { label: "ODI", color: "#58a6ff" };
  return { label: "Series", color: "#7d8590" };
}

function formatDate(dateStr: string) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

function isUpcoming(startDate: string) {
  if (!startDate) return false;
  return new Date(startDate) > new Date();
}

function isOngoing(startDate: string, endDate: string) {
  if (!startDate) return false;
  const now = new Date();
  return new Date(startDate) <= now && (!endDate || new Date(endDate) >= now);
}

function SeriesCard({ series, status }: { series: any, status: string }) {
  const type = getSeriesType(series.name || "");
  const start = formatDate(series.startDate);
  const end = formatDate(series.endDate);
  const borderColor = status === "ongoing" ? "rgba(248,81,73,0.35)" : status === "upcoming" ? "rgba(63,185,80,0.35)" : "#30363d";
  const statusColor = status === "ongoing" ? "#f85149" : status === "upcoming" ? "#3fb950" : "#7d8590";
  const statusLabel = status === "ongoing" ? "LIVE" : status === "upcoming" ? "UPCOMING" : "RECENT";

  return (
    <div style={{ backgroundColor: "#161b22", border: "1px solid " + borderColor, borderRadius: "14px", padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
        <div style={{ color: "#e6edf3", fontWeight: "600", fontSize: "14px", lineHeight: "1.5", flex: 1 }}>
          {series.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: statusColor }}></div>
          <span style={{ fontSize: "10px", color: statusColor, fontWeight: "700" }}>{statusLabel}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
        <span style={{ fontSize: "10px", fontWeight: "700", color: type.color, backgroundColor: type.color + "18", border: "1px solid " + type.color + "40", padding: "2px 8px", borderRadius: "100px" }}>
          {type.label}
        </span>
        {series.matches && (
          <span style={{ fontSize: "10px", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid #30363d", padding: "2px 8px", borderRadius: "100px" }}>
            {series.matches} matches
          </span>
        )}
      </div>

      {(start || end) && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "10px", borderTop: "1px solid #21262d" }}>
        <span style={{ color: "#7d8590", fontSize: "11px" }}>
            {start ? "Starts " + start : ""}
          </span>
        </div>
      )}
    </div>
  );
}

export default async function SeriesPage() {
  const series = await getSeries();
  const ongoing = series.filter((s: any) => isOngoing(s.startDate, s.endDate));
  const upcoming = series.filter((s: any) => isUpcoming(s.startDate));
  const recent = series.filter((s: any) => !isUpcoming(s.startDate) && !isOngoing(s.startDate, s.endDate)).slice(0, 10);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117", color: "#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#e6edf3", marginBottom: "8px" }}>
            Cricket <span style={{ color: "#3fb950" }}>Series</span>
          </h1>
          <p style={{ color: "#7d8590", fontSize: "13px" }}>Major international series, bilateral tours and top leagues</p>
        </div>

        {ongoing.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>Ongoing</h2>
              <span style={{ fontSize: "11px", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{ongoing.length}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(248,81,73,0.4), transparent)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
              {ongoing.map((s: any) => <SeriesCard key={s.id} series={s} status="ongoing" />)}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>Upcoming</h2>
              <span style={{ fontSize: "11px", color: "#3fb950", backgroundColor: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)", padding: "2px 8px", borderRadius: "100px" }}>{upcoming.length}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(63,185,80,0.4), transparent)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
              {upcoming.map((s: any) => <SeriesCard key={s.id} series={s} status="upcoming" />)}
            </div>
          </section>
        )}

        {recent.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#e6edf3" }}>Recent</h2>
              <span style={{ fontSize: "11px", color: "#7d8590", backgroundColor: "rgba(125,133,144,0.1)", border: "1px solid rgba(125,133,144,0.2)", padding: "2px 8px", borderRadius: "100px" }}>{recent.length}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(125,133,144,0.4), transparent)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
              {recent.map((s: any) => <SeriesCard key={s.id} series={s} status="recent" />)}
            </div>
          </section>
        )}

        {series.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📋</p>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>No series data</h2>
            <p style={{ color: "#7d8590" }}>Check back soon!</p>
          </div>
        )}

      </div>
    </div>
  );
}