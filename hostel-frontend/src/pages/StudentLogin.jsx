import { useState } from "react"
import { useNavigate } from "react-router-dom"

function StudentLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: id, password })
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("studentId", id)
        localStorage.setItem("studentName",data.student.name);
        navigate("/student")
      } else {
        setError("Wrong ID or password, try again!")
      }
    } catch {
      setError("Can't reach server. Is backend running?")
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Nunito', sans-serif",
      padding: "24px"
    }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none",
            color: "#64748b", fontSize: "14px",
            cursor: "pointer", marginBottom: "24px",
            padding: "0", fontFamily: "'Nunito', sans-serif"
          }}
        >← back</button>

        <div style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "24px",
          padding: "36px 32px"
        }}>
          <div style={{
            width: "48px", height: "48px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "14px",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            fontSize: "22px", marginBottom: "20px"
          }}>🎒</div>

          <h2 style={{
            fontSize: "24px", fontWeight: "800",
            color: "#f1f5f9", margin: "0 0 6px"
          }}>Welcome back!</h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
            Login with your student credentials
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "14px" }}>
              <label style={{
                fontSize: "12px", fontWeight: "700",
                color: "#94a3b8", display: "block",
                marginBottom: "8px", textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>Student ID</label>
              <input
                type="text"
                placeholder="e.g. 23021112"
                value={id}
                onChange={e => setId(e.target.value)}
                style={{
                  width: "100%", padding: "13px 16px",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  fontSize: "15px", color: "#f1f5f9",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'Nunito', sans-serif",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                fontSize: "12px", fontWeight: "700",
                color: "#94a3b8", display: "block",
                marginBottom: "8px", textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>Password</label>
              <input
                type="password"
                placeholder="your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%", padding: "13px 16px",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  fontSize: "15px", color: "#f1f5f9",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'Nunito', sans-serif",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171", padding: "12px 14px",
                borderRadius: "10px", fontSize: "13px",
                marginBottom: "16px"
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                background: loading ? "#4338ca" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none",
                borderRadius: "12px", fontSize: "15px",
                fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Nunito', sans-serif",
                transition: "opacity 0.2s"
              }}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin