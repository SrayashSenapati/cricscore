import Link from "next/link";
import Navbar from "../components/Navbar";

const ongoingSeries = [
  {
    id: 1,
    name: "India tour of Australia 2024",
    shortName: "IND tour of AUS",
    type: "T20I",
    teams: ["🇮🇳 India", "🇦🇺 Australia"],
    matches: "5 T20Is",
    startDate: "Dec 1, 2024",
    endDate: "Dec 15, 2024",
    status: "ongoing",
    matchesPlayed: "2/5",
    venue: "Australia",
  },
  {
    id: 2,
    name: "England tour of South Africa 2024",
    shortName: "ENG tour of SA",
    type: "ODI",
    teams: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", "🇿🇦 South Africa"],
    matches: "3 ODIs",
    startDate: "Dec 3, 2024",
    endDate: "Dec 10, 2024",
    status: "ongoing",
    matchesPlayed: "3/3",
    venue: "South Africa",
  },
  {
    id: 3,
    name: "Pakistan vs New Zealand 2024",
    shortName: "PAK vs NZ",
    type: "Test",
    teams: ["🇵🇰 Pakistan", "🇳🇿 New Zealand"],
    matches: "2 Tests",
    startDate: "Dec 5, 2024",
    endDate: "Dec 20, 2024",
    status: "ongoing",
    matchesPlayed: "0/2",
    venue: "Pakistan",
  },
];

const upcomingSeries = [
  {
    id: 4,
    name: "ICC Champions Trophy 2025",
    shortName: "ICC Champions Trophy",
    type: "ODI",
    teams: ["🌍 8 Teams"],
    matches: "15 ODIs",
    startDate: "Feb 19, 2025",
    endDate: "Mar 9, 2025",
    status: "upcoming",
    matchesPlayed: "0/15",
    venue: "Pakistan & UAE",
  },
  {
    id: 5,
    name: "West Indies vs Sri Lanka 2025",
    shortName: "WI vs SL",
    type: "T20I",
    teams: ["🏏 West Indies", "🇱🇰 Sri Lanka"],
    matches: "3 T20Is",
    startDate: "Jan 10, 2025",
    endDate: "Jan 16, 2025",
    status: "upcoming",
    matchesPlayed: "0/3",
    venue: "West Indies",
  },
  {
    id: 6,
    name: "Bangladesh vs Zimbabwe 2025",
    shortName: "BAN vs ZIM",
    type: "ODI",
    teams: ["🇧🇩 Bangladesh", "🇿🇼 Zimbabwe"],
    matches: "3 ODIs",
    startDate: "Jan 15, 2025",
    endDate: "Jan 22, 2025",
    status: "upcoming",
    matchesPlayed: "0/3",
    venue: "Bangladesh",
  },
];

// Format type badge color
function FormatBadge({ type }: { type: string }) {
  const colors: { [key: string]: string } = {
    "T20I": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "ODI": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Test": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${colors[type] || "bg-gray-500/20 text-gray-400"}`}>
      {type}
    </span>
  );
}

// Series Card Component
function SeriesCard({ series }: { series: any }) {
  const isOngoing = series.status === "ongoing";
  return (
    <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-xl p-5 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer">
      
      {/* Card Top */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 mr-3">
          <h3 className="font-bold text-white text-sm mb-1">{series.name}</h3>
          <p className="text-gray-500 text-xs">📍 {series.venue}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <FormatBadge type={series.type} />
          {isOngoing ? (
            <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Ongoing
            </span>
          ) : (
            <span className="text-xs text-gray-500 font-semibold">Upcoming</span>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center gap-2 mb-3">
        {series.teams.map((team: string, i: number) => (
          <span key={i} className="text-sm text-gray-300 font-medium">
            {team}{i < series.teams.length - 1 && <span className="text-gray-600 mx-1">vs</span>}
          </span>
        ))}
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-[#2a2a3e]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            📅 {series.startDate} — {series.endDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{series.matches}</span>
          <span className="text-xs bg-[#0a0a0f] text-orange-400 px-2 py-0.5 rounded font-mono">
            {series.matchesPlayed} matches
          </span>
        </div>
      </div>

    </div>
  );
}

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            Cricket <span className="text-orange-500">Series</span>
          </h1>
          <p className="text-gray-400 text-sm">
            All ongoing and upcoming international cricket series
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {["All", "T20I", "ODI", "Test"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "All"
                  ? "bg-orange-500 text-white"
                  : "bg-[#1e1e2e] text-gray-400 hover:text-white border border-[#2a2a3e]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Ongoing Series */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-bold text-white">Ongoing Series</h2>
            <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {ongoingSeries.length} Active
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ongoingSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </section>

        {/* Upcoming Series */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-bold text-white">Upcoming Series</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}