import { useState } from "react"
import { useNavigate } from "react-router-dom"

function WardenLogin() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (user === "warden" && pass === "12345") {
      navigate("/warden")
    } else {
      setError("Wrong credentials. Try warden / 12345")
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: "#f8fafc",
    color: "#1a1f36",
    fontWeight: "500",
    transition: "border-color 0.2s, box-shadow 0.2s"
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #fffbeb 0%, #fff7ed 50%, #fef3c7 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "24px",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "fixed", top: "-100px", right: "-60px",
        width: "320px", height: "320px",
        background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", bottom: "-80px", left: "-60px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />

      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 40px rgba(245,158,11,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(245,158,11,0.15)",
        position: "relative"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#fffbeb", border: "1px solid #fde68a",
            color: "#92400e", fontSize: "13px",
            cursor: "pointer", padding: "6px 14px",
            marginBottom: "28px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: "600", borderRadius: "8px"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fef3c7"; e.currentTarget.style.borderColor = "#f59e0b" }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fffbeb"; e.currentTarget.style.borderColor = "#fde68a" }}
        >
          ← Back
        </button>

        <div style={{
          width: "56px", height: "56px",
          background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
          borderRadius: "16px",
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "18px",
          border: "1px solid #fde68a"
        }}>
          🛡️
        </div>

        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1a1f36", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
          Warden Login
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 28px", fontWeight: "500" }}>
          Hostel staff access only
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.6px" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="warden"
            onChange={e => setUser(e.target.value)}
            style={{ ...inputStyle, marginBottom: "18px" }}
            onFocus={e => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)"; e.target.style.background = "#fff" }}
            onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc" }}
          />

          <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.6px" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••"
            onChange={e => setPass(e.target.value)}
            style={{ ...inputStyle, marginBottom: "22px" }}
            onFocus={e => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)"; e.target.style.background = "#fff" }}
            onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc" }}
          />

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#dc2626", padding: "11px 14px",
              borderRadius: "10px", fontSize: "13px",
              marginBottom: "18px", fontWeight: "600"
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              color: "#fff", border: "none",
              borderRadius: "12px", fontSize: "15px",
              fontWeight: "700", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,158,11,0.4)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(245,158,11,0.35)" }}
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  )
}

export default WardenLogin