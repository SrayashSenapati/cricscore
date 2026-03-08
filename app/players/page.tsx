"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!search.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/players?search=" + encodeURIComponent(search));
      const data = await res.json();
      setPlayers(data.data || []);
    } catch {
      setPlayers([]);
    }
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#0d1117", color:"#e6edf3" }}>
      <Navbar />
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ marginBottom:"32px" }}>
          <h1 style={{ fontSize:"28px", fontWeight:"700", color:"#e6edf3", marginBottom:"8px" }}>
            Player <span style={{ color:"#3fb950" }}>Search</span>
          </h1>
          <p style={{ color:"#7d8590", fontSize:"13px" }}>Search any cricket player in the world</p>
        </div>
        <div style={{ display:"flex", gap:"12px", marginBottom:"32px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Virat Kohli, Rohit Sharma"
            style={{ flex:1, backgroundColor:"#161b22", border:"1px solid #30363d", borderRadius:"10px", padding:"12px 16px", color:"#e6edf3", fontSize:"14px", outline:"none" }}
          />
          <button
            onClick={handleSearch}
            style={{ backgroundColor:"#3fb950", color:"#0d1117", border:"none", borderRadius:"10px", padding:"12px 24px", fontSize:"14px", fontWeight:"700", cursor:"pointer" }}
          >
            Search
          </button>
        </div>

        {loading && (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <p style={{ color:"#7d8590" }}>Searching players...</p>
          </div>
        )}

        {!loading && searched && players.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <p style={{ fontSize:"32px", marginBottom:"12px" }}>🏏</p>
            <p style={{ color:"#7d8590" }}>No players found</p>
          </div>
        )}

        {!loading && players.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {players.map((player: any) => (
              <div key={player.id} style={{ backgroundColor:"#161b22", border:"1px solid #30363d", borderRadius:"12px", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"50%", backgroundColor:"#0d1117", border:"1px solid #30363d", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>
                    🏏
                  </div>
                  <div>
                    <div style={{ color:"#e6edf3", fontWeight:"600", fontSize:"15px" }}>{player.name}</div>
                    <div style={{ color:"#7d8590", fontSize:"12px", marginTop:"3px" }}>{player.country || "Unknown Country"}</div>
                  </div>
                </div>
                {player.playerType && (
                  <span style={{ fontSize:"11px", color:"#3fb950", backgroundColor:"rgba(63,185,80,0.1)", border:"1px solid rgba(63,185,80,0.3)", padding:"3px 10px", borderRadius:"100px" }}>
                    {player.playerType}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {!searched && (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <p style={{ fontSize:"48px", marginBottom:"16px" }}>🔍</p>
            <p style={{ color:"#7d8590", fontSize:"14px" }}>Type a player name and hit Search</p>
          </div>
        )}
      </div>
    </div>
  );
}