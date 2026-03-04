import Link from "next/link";
import Navbar from "../../components/Navbar";

const matchesData: { [key: string]: any } = {
  "1": {
    id: 1,
    team1: { name: "India", shortName: "IND", flag: "🇮🇳" },
    team2: { name: "Australia", shortName: "AUS", flag: "🇦🇺" },
    format: "T20I",
    status: "live",
    matchInfo: "India tour of Australia, 2nd T20I",
    venue: "Melbourne Cricket Ground",
    toss: "India won the toss and elected to bat",
    currentInnings: "India - 1st Innings",
    batting: [
      { name: "Rohit Sharma", runs: 45, balls: 32, fours: 5, sixes: 2, sr: "140.6", status: "batting" },
      { name: "Virat Kohli", runs: 72, balls: 51, fours: 8, sixes: 1, sr: "141.2", status: "batting" },
      { name: "Shubman Gill", runs: 23, balls: 18, fours: 3, sixes: 0, sr: "127.8", status: "c Maxwell b Starc" },
      { name: "Suryakumar Yadav", runs: 58, balls: 31, fours: 4, sixes: 4, sr: "187.1", status: "c Inglis b Hazlewood" },
      { name: "Hardik Pandya", runs: 34, balls: 19, fours: 2, sixes: 3, sr: "178.9", status: "batting" },
    ],
    bowling: [
      { name: "Mitchell Starc", overs: "4", maidens: 0, runs: 42, wickets: 1, economy: "10.5" },
      { name: "Pat Cummins", overs: "4", maidens: 0, runs: 38, wickets: 0, economy: "9.5" },
      { name: "Josh Hazlewood", overs: "3.2", maidens: 0, runs: 31, wickets: 2, economy: "9.3" },
      { name: "Adam Zampa", overs: "4", maidens: 0, runs: 44, wickets: 0, economy: "11.0" },
    ],
    score: "245/6",
    overs: "18.2",
    runRate: "13.36",
    partnership: "79 runs (Rohit & Kohli)",
    lastWicket: "Suryakumar Yadav - 58 (31)",
  },
  "2": {
    id: 2,
    team1: { name: "England", shortName: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "South Africa", shortName: "SA", flag: "🇿🇦" },
    format: "ODI",
    status: "live",
    matchInfo: "England tour of South Africa, 3rd ODI",
    venue: "Newlands, Cape Town",
    toss: "England won the toss and elected to bat",
    currentInnings: "South Africa - 1st Innings (Chasing 313)",
    batting: [
      { name: "Quinton de Kock", runs: 67, balls: 71, fours: 7, sixes: 1, sr: "94.4", status: "batting" },
      { name: "Temba Bavuma", runs: 45, balls: 52, fours: 4, sixes: 0, sr: "86.5", status: "batting" },
      { name: "Rassie van der Dussen", runs: 38, balls: 41, fours: 3, sixes: 1, sr: "92.7", status: "c Stokes b Archer" },
    ],
    bowling: [
      { name: "Jofra Archer", overs: "8", maidens: 1, runs: 44, wickets: 1, economy: "5.5" },
      { name: "Ben Stokes", overs: "7", maidens: 0, runs: 38, wickets: 1, economy: "5.4" },
      { name: "Mark Wood", overs: "8", maidens: 0, runs: 51, wickets: 1, economy: "6.4" },
    ],
    score: "187/4",
    overs: "31.0",
    runRate: "6.03",
    partnership: "112 runs (de Kock & Bavuma)",
    lastWicket: "van der Dussen - 38 (41)",
  },
};

export default async function MatchDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15, params is a Promise so we must await it
  const { id } = await params;
  const match = matchesData[id];

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-6xl mb-4">🏏</p>
          <h1 className="text-2xl font-bold mb-2">Match Not Found</h1>
          <p className="text-gray-400 mb-6">This match doesn't exist or has ended.</p>
          <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.status === "live";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">

        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-all mb-6 text-sm">
          ← Back to all matches
        </Link>

        {/* Match Header */}
        <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">{match.matchInfo}</p>
              <p className="text-gray-500 text-xs">📍 {match.venue}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#2a2a3e] text-orange-400 px-3 py-1 rounded-full font-semibold">
                {match.format}
              </span>
              {isLive ? (
                <span className="flex items-center gap-1 bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full font-bold border border-red-500/30">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  LIVE
                </span>
              ) : (
                <span className="text-xs bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full">COMPLETED</span>
              )}
            </div>
          </div>

          {/* Teams and Score */}
          <div className="grid grid-cols-3 items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">{match.team1.flag}</div>
              <div className="font-bold text-lg">{match.team1.name}</div>
              <div className="text-2xl font-bold text-orange-500 mt-1">{match.score}</div>
              <div className="text-gray-400 text-sm">({match.overs} ov)</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-bold text-xl">VS</div>
              <div className="text-xs text-gray-500 mt-2">CRR: {match.runRate}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">{match.team2.flag}</div>
              <div className="font-bold text-lg">{match.team2.name}</div>
              <div className="text-gray-400 text-sm mt-1">Yet to bat</div>
            </div>
          </div>

          {/* Match Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Toss</p>
              <p className="text-xs text-gray-300">{match.toss}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Partnership</p>
              <p className="text-xs text-gray-300">{match.partnership}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Last Wicket</p>
              <p className="text-xs text-gray-300">{match.lastWicket}</p>
            </div>
          </div>
        </div>

        {/* Current Innings Label */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-bold text-white">{match.currentInnings}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
        </div>

        {/* Batting Scorecard */}
        <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-2xl overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-[#2a2a3e] flex items-center gap-2">
            <span className="text-orange-500">🏏</span>
            <h3 className="font-bold text-sm">Batting</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-[#2a2a3e]">
                  <th className="text-left px-4 py-2 font-medium">Batter</th>
                  <th className="text-center px-3 py-2 font-medium">R</th>
                  <th className="text-center px-3 py-2 font-medium">B</th>
                  <th className="text-center px-3 py-2 font-medium">4s</th>
                  <th className="text-center px-3 py-2 font-medium">6s</th>
                  <th className="text-center px-3 py-2 font-medium">SR</th>
                </tr>
              </thead>
              <tbody>
                {match.batting.map((batter: any, index: number) => (
                  <tr key={index} className="border-b border-[#2a2a3e]/50 hover:bg-white/5 transition-all">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{batter.name}</div>
                      <div className="text-xs text-gray-500">
                        {batter.status === "batting" ? "🟢 batting" : batter.status}
                      </div>
                    </td>
                    <td className="text-center px-3 py-3 font-bold text-white">{batter.runs}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{batter.balls}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{batter.fours}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{batter.sixes}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{batter.sr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bowling Scorecard */}
        <div className="bg-[#1e1e2e] border border-[#2a2a3e] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#2a2a3e] flex items-center gap-2">
            <span className="text-orange-500">🎯</span>
            <h3 className="font-bold text-sm">Bowling</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-[#2a2a3e]">
                  <th className="text-left px-4 py-2 font-medium">Bowler</th>
                  <th className="text-center px-3 py-2 font-medium">O</th>
                  <th className="text-center px-3 py-2 font-medium">M</th>
                  <th className="text-center px-3 py-2 font-medium">R</th>
                  <th className="text-center px-3 py-2 font-medium">W</th>
                  <th className="text-center px-3 py-2 font-medium">ECO</th>
                </tr>
              </thead>
              <tbody>
                {match.bowling.map((bowler: any, index: number) => (
                  <tr key={index} className="border-b border-[#2a2a3e]/50 hover:bg-white/5 transition-all">
                    <td className="px-4 py-3 font-semibold text-white">{bowler.name}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{bowler.overs}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{bowler.maidens}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{bowler.runs}</td>
                    <td className="text-center px-3 py-3 font-bold text-orange-500">{bowler.wickets}</td>
                    <td className="text-center px-3 py-3 text-gray-400">{bowler.economy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}