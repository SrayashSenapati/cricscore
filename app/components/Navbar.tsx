"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Live Scores", href: "/" },
    { label: "Series", href: "/series" },
    { label: "Teams", href: "/teams" },
    { label: "News", href: "/news" },
  ];

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
          {/* Cricket ball icon */}
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
            <span style={{
              color: "#e6edf3",
              fontWeight: "700",
              fontSize: "18px",
              letterSpacing: "-0.3px",
            }}>Cric</span>
            <span style={{
              color: "#3fb950",
              fontWeight: "700",
              fontSize: "18px",
              letterSpacing: "-0.3px",
            }}>Score</span>
          </div>
          {/* Live pill */}
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
              animation: "pulse 1.5s infinite",
            }}></div>
            <span style={{
              color: "#f85149",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.08em",
            }}>LIVE</span>
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
        </div>
      )}

    </nav>
  );
}