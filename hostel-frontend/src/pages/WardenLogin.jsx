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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      padding: "24px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.15)"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#94a3b8",
            fontSize: "13px",
            cursor: "pointer",
            padding: 0,
            marginBottom: "28px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            display: "block",
            boxShadow: "none"
          }}
        >
          ← Back
        </button>

        <div style={{
          width: "56px", height: "56px",
          backgroundColor: "#fff7ed",
          borderRadius: "16px",
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "20px"
        }}>🛡️</div>

        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
          Warden Login
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 32px" }}>
          Hostel staff access only
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="warden"
            onChange={e => setUser(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              marginBottom: "18px",
              boxSizing: "border-box",
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: "#f8fafc",
              color: "#1e293b",
              display: "block"
            }}
            onFocus={e => e.target.style.borderColor = "#f59e0b"}
            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
          />

          <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••"
            onChange={e => setPass(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              marginBottom: "22px",
              boxSizing: "border-box",
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: "#f8fafc",
              color: "#1e293b",
              display: "block"
            }}
            onFocus={e => e.target.style.borderColor = "#f59e0b"}
            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
          />

          {error && (
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "18px"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
              display: "block"
            }}
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  )
}

export default WardenLogin