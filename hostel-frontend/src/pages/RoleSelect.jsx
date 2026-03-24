import { useNavigate } from "react-router-dom"

function RoleSelect() {
  const navigate = useNavigate()

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

      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* logo area */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "20px",
            marginBottom: "16px",
            fontSize: "28px"
          }}>🏠</div>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#f1f5f9",
            margin: "0 0 6px",
            letterSpacing: "-0.5px"
          }}>
            HostelSure
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Leave management, finally easy
          </p>
        </div>

        {/* role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>

          <button
            onClick={() => navigate("/student-login")}
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "20px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.2s",
              textAlign: "left",
              width: "100%"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#1e293b"
              e.currentTarget.style.borderColor = "#6366f1"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#334155"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <div style={{
              width: "46px", height: "46px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", flexShrink: 0
            }}>🎒</div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9", marginBottom: "2px" }}>
                I'm a Student
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                Apply leave, check status, get QR
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: "#334155", fontSize: "22px" }}>›</div>
          </button>

          <button
            onClick={() => navigate("/warden-login")}
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "20px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.2s",
              textAlign: "left",
              width: "100%"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#f59e0b"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#334155"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <div style={{
              width: "46px", height: "46px",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", flexShrink: 0
            }}>🛡️</div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9", marginBottom: "2px" }}>
                I'm the Warden
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                Approve leaves, track students
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: "#334155", fontSize: "22px" }}>›</div>
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#334155" }}>
          Made by Web Wardens
        </p>

      </div>
    </div>
  )
}

export default RoleSelect