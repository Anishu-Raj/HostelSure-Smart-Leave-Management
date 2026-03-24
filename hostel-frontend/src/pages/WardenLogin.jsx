import { useState } from "react"
import { useNavigate } from "react-router-dom"

function WardenLogin() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
     
    if (user === "warden" && pass === "12345") {
      navigate("/warden")
    } else {
      setError("Invalid warden credentials. Try again.")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f5f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        margin: "0 24px"
      }}>

        <div style={{ marginBottom: "32px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "#fff4e6",
            borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px",
            marginBottom: "20px"
          }}>🛡️</div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "28px",
            color: "#1a1a1a",
            margin: "0 0 6px"
          }}>Warden Login</h2>
          <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
            Hostel staff access only
          </p>
        </div>

        <form onSubmit={login}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>
              Username
            </label>
            <input
              placeholder="warden"
              onChange={e => setUser(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                border: "1.5px solid #e8e8e8",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'DM Sans', sans-serif"
              }}
              onFocus={e => e.target.style.borderColor = "#f59e0b"}
              onBlur={e => e.target.style.borderColor = "#e8e8e8"}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              onChange={e => setPass(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                border: "1.5px solid #e8e8e8",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'DM Sans', sans-serif"
              }}
              onFocus={e => e.target.style.borderColor = "#f59e0b"}
              onBlur={e => e.target.style.borderColor = "#e8e8e8"}
            />
          </div>

          {error && (
            <div style={{
              background: "#fff2f2",
              border: "1px solid #ffd0d0",
              color: "#c0392b",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "16px"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Login →
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            background: "none",
            border: "none",
            color: "#999",
            fontSize: "13px",
            cursor: "pointer",
            width: "100%",
            textAlign: "center"
          }}
        >
          ← Back to home
        </button>
      </div>
    </div>
  )
}

export default WardenLogin