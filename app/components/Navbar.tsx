"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

 const navLinks = [
    { label: "Live", href: "/", icon: "🏏" },
    { label: "Series", href: "/series", icon: "📋" },
    { label: "Players", href: "/players", icon: "🧑‍🤝‍🧑" },
    { label: "Teams", href: "/teams", icon: "👥" },
    { label: "News", href: "/news", icon: "📰" },
  ];

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .desktop-only { display: flex; }
        .mobile-only { display: none; }
        .bottom-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .bottom-nav { display: flex !important; }
          body { padding-bottom: 70px; }
        }
      `}</style>

      {/* Top Navbar */}
      <nav style={{
        backgroundColor: "#161b22",
        borderBottom: "1px solid #30363d",
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              backgroundColor: "#8b1a1a", border: "2px solid #d4a853",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
            }}>🏏</div>
            <span style={{ color: "#e6edf3", fontWeight: "700", fontSize: "17px" }}>Cric</span>
            <span style={{ color: "#3fb950", fontWeight: "700", fontSize: "17px", marginLeft: "-6px" }}>Score</span>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              backgroundColor: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)",
              borderRadius: "100px", padding: "2px 7px", marginLeft: "4px",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#f85149", animation: "pulse 1.5s infinite" }}></div>
              <span style={{ color: "#f85149", fontSize: "9px", fontWeight: "700", letterSpacing: "0.08em" }}>LIVE</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="desktop-only" style={{ alignItems: "center", gap: "2px" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href} style={{
                  color: isActive ? "#3fb950" : "#7d8590",
                  textDecoration: "none", padding: "6px 14px", borderRadius: "6px",
                  fontSize: "14px", fontWeight: isActive ? "600" : "400",
                  backgroundColor: isActive ? "rgba(63,185,80,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(63,185,80,0.2)" : "1px solid transparent",
                }}>
                  {link.label === "Live" ? "Live Scores" : link.label}
                </Link>
              );
            })}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: "#3fb950", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#0d1117",
                }}>
                  {user.email?.[0].toUpperCase()}
                </div>
                <button onClick={handleSignOut} style={{
                  color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)",
                  border: "1px solid rgba(248,81,73,0.3)", padding: "6px 14px",
                  borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth" style={{
                color: "#0d1117", textDecoration: "none", padding: "6px 16px",
                borderRadius: "6px", fontSize: "14px", fontWeight: "600",
                backgroundColor: "#3fb950", marginLeft: "8px",
              }}>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Right — Sign In or Avatar */}
          <div className="mobile-only" style={{ alignItems: "center", gap: "8px" }}>
            {user ? (
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#3fb950", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#0d1117",
              }}>
                {user.email?.[0].toUpperCase()}
              </div>
            ) : (
              <Link href="/auth" style={{
                color: "#0d1117", textDecoration: "none", padding: "6px 14px",
                borderRadius: "6px", fontSize: "13px", fontWeight: "600",
                backgroundColor: "#3fb950",
              }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation — Mobile Only */}
      <div className="bottom-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        backgroundColor: "#161b22",
        borderTop: "1px solid #30363d",
        zIndex: 100,
        padding: "6px 0 16px",
        justifyContent: "space-around",
        alignItems: "center",
      }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.label} href={link.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "3px", textDecoration: "none", padding: "4px 16px",
            }}>
              <span style={{ fontSize: "20px" }}>{link.icon}</span>
              <span style={{
                fontSize: "10px", fontWeight: isActive ? "700" : "400",
                color: isActive ? "#3fb950" : "#7d8590",
              }}>
                {link.label}
              </span>
              {isActive && (
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#3fb950" }}></div>
              )}
            </Link>
          );
        })}
        {user && (
          <button onClick={handleSignOut} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "3px", background: "none", border: "none", cursor: "pointer", padding: "4px 16px",
          }}>
            <span style={{ fontSize: "20px" }}>🚪</span>
            <span style={{ fontSize: "10px", color: "#f85149", fontWeight: "400" }}>Sign Out</span>
          </button>
        )}
      </div>
    </>
  );
}