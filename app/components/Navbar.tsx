"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: "Live Scores", href: "/" },
    { label: "Series", href: "/series" },
    { label: "Teams", href: "/teams" },
    { label: "News", href: "/news" },
  ];

  useEffect(() => {
    // Get current user on load
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for login/logout changes
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
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#8b1a1a",
            border: "2px solid #d4a853",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}>
            🏏
          </div>
          <div>
            <span style={{ color: "#e6edf3", fontWeight: "700", fontSize: "18px", letterSpacing: "-0.3px" }}>Cric</span>
            <span style={{ color: "#3fb950", fontWeight: "700", fontSize: "18px", letterSpacing: "-0.3px" }}>Score</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "rgba(248,81,73,0.1)",
            border: "1px solid rgba(248,81,73,0.3)",
            borderRadius: "100px",
            padding: "2px 8px",
            marginLeft: "4px",
          }}>
            <div style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "#f85149",
            }}></div>
            <span style={{ color: "#f85149", fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em" }}>LIVE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  color: isActive ? "#3fb950" : "#7d8590",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "400",
                  backgroundColor: isActive ? "rgba(63,185,80,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(63,185,80,0.2)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth Button */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
              {/* User Avatar */}
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#3fb950",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
                color: "#0d1117",
              }}>
                {user.email?.[0].toUpperCase()}
              </div>
              <button
                onClick={handleSignOut}
                style={{
                  color: "#f85149",
                  backgroundColor: "rgba(248,81,73,0.1)",
                  border: "1px solid rgba(248,81,73,0.3)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              style={{
                color: "#0d1117",
                textDecoration: "none",
                padding: "6px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#3fb950",
                marginLeft: "8px",
                border: "1px solid transparent",
              }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "1px solid #30363d",
            color: "#7d8590",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid #30363d",
          backgroundColor: "#161b22",
          padding: "12px 24px",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#7d8590",
                textDecoration: "none",
                padding: "10px 0",
                fontSize: "14px",
                borderBottom: "1px solid #21262d",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth */}
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                color: "#f85149",
                backgroundColor: "transparent",
                border: "none",
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#3fb950",
                textDecoration: "none",
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Sign In 🏏
            </Link>
          )}
        </div>
      )}

    </nav>
  );
}