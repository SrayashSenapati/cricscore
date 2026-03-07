"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setMessage(null);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
      });
      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ text: "Account created! Check your email to verify.", type: "success" });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        router.push("/");
      }
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0d1117",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background decorative elements */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(63,185,80,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,26,26,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Main Card */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "16px",
        padding: "40px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#8b1a1a",
            border: "2px solid #d4a853",
            fontSize: "24px",
            marginBottom: "16px",
          }}>
            🏏
          </div>
          <div>
            <span style={{ color: "#e6edf3", fontWeight: "700", fontSize: "24px" }}>Cric</span>
            <span style={{ color: "#3fb950", fontWeight: "700", fontSize: "24px" }}>Score</span>
          </div>
          <p style={{ color: "#7d8590", fontSize: "13px", marginTop: "6px" }}>
            {mode === "login" ? "Welcome back! Sign in to continue" : "Join CricScore — It's free!"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: "flex",
          backgroundColor: "#0d1117",
          borderRadius: "10px",
          padding: "4px",
          marginBottom: "28px",
          border: "1px solid #30363d",
        }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setMessage(null); }}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s",
                backgroundColor: mode === m ? "#161b22" : "transparent",
                color: mode === m ? "#e6edf3" : "#7d8590",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>

          {/* Username — only on signup */}
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#7d8590", display: "block", marginBottom: "6px", letterSpacing: "0.05em" }}>
                USERNAME
              </label>
              <input
                type="text"
                placeholder="e.g. cricket_fan_99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#0d1117",
                  border: "1px solid #30363d",
                  borderRadius: "8px",
                  color: "#e6edf3",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#7d8590", display: "block", marginBottom: "6px", letterSpacing: "0.05em" }}>
              EMAIL
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "8px",
                color: "#e6edf3",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#7d8590", display: "block", marginBottom: "6px", letterSpacing: "0.05em" }}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "8px",
                color: "#e6edf3",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: "10px 14px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "13px",
            backgroundColor: message.type === "error" ? "rgba(248,81,73,0.1)" : "rgba(63,185,80,0.1)",
            border: `1px solid ${message.type === "error" ? "rgba(248,81,73,0.3)" : "rgba(63,185,80,0.3)"}`,
            color: message.type === "error" ? "#f85149" : "#3fb950",
          }}>
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "700",
            background: loading ? "#21262d" : "linear-gradient(135deg, #3fb950, #2d9140)",
            color: loading ? "#7d8590" : "white",
            transition: "all 0.2s",
            letterSpacing: "0.02em",
          }}
        >
          {loading ? "Please wait..." : mode === "login" ? "Sign In 🏏" : "Create Account 🏏"}
        </button>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "24px 0",
        }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#21262d" }} />
          <span style={{ fontSize: "12px", color: "#7d8590" }}>OR</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#21262d" }} />
        </div>

        {/* Google Login */}
        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/` }
            });
          }}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: "8px",
            border: "1px solid #30363d",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: "#0d1117",
            color: "#e6edf3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: "18px" }}>G</span>
          Continue with Google
        </button>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#7d8590",
          marginTop: "24px",
        }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#3fb950", cursor: "pointer" }}>Terms</span>
          {" & "}
          <span style={{ color: "#3fb950", cursor: "pointer" }}>Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}