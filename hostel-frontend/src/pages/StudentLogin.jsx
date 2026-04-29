import { useState } from "react"
import { useNavigate } from "react-router-dom"

function StudentLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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
        localStorage.setItem("studentName", data.student.name)
        localStorage.setItem("token", data.token)
        navigate("/student")
      } else {
        setError("Wrong Student ID or password.")
      }
    } catch {
      setError("Cannot reach server. Is backend running?")
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
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
          backgroundColor: "#eef2ff",
          borderRadius: "16px",
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "20px"
        }}>🎓</div>

        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
          Student Login
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 32px" }}>
          Enter your credentials to continue
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Student ID
          </label>
          <input
            type="text"
            placeholder="e.g. 23021112"
            onChange={e => setId(e.target.value)}
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
            onFocus={e => e.target.style.borderColor = "#6366f1"}
            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
          />

          <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
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
            onFocus={e => e.target.style.borderColor = "#6366f1"}
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
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#c7d2fe" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
              display: "block"
            }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin