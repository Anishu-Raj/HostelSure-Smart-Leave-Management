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
        setError("Wrong Student ID or password. Please try again.")
      }
    } catch {
      setError("Cannot reach server. Is backend running?")
    }
    setLoading(false)
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
      background: "linear-gradient(145deg, #f0f4ff 0%, #faf5ff 100%)",
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
        background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", bottom: "-80px", left: "-60px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />

      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(99,102,241,0.1)",
        position: "relative"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#64748b",
            fontSize: "13px",
            cursor: "pointer",
            padding: "6px 14px",
            marginBottom: "28px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: "600",
            borderRadius: "8px",
            display: "flex", alignItems: "center", gap: "6px"
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderColor = "#c7d2fe"; e.currentTarget.style.background = "#eef2ff" }}
          onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }}
        >
          ← Back
        </button>

        <div style={{
          width: "56px", height: "56px",
          background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
          borderRadius: "16px",
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "18px",
          border: "1px solid #c7d2fe"
        }}>
          🎓
        </div>

        <h2 style={{
          fontSize: "26px", fontWeight: "800",
          color: "#1a1f36", margin: "0 0 6px",
          letterSpacing: "-0.3px"
        }}>
          Student Login
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 28px", fontWeight: "500" }}>
          Enter your credentials to continue
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.6px" }}>
            Student ID
          </label>
          <input
            type="text"
            placeholder="e.g. 23021112"
            onChange={e => setId(e.target.value)}
            style={{ ...inputStyle, marginBottom: "18px" }}
            onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; e.target.style.background = "#fff" }}
            onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc" }}
          />

          <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.6px" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: "22px" }}
            onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; e.target.style.background = "#fff" }}
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
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#c7d2fe" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none",
              borderRadius: "12px", fontSize: "15px",
              fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.4)" } }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)" }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin