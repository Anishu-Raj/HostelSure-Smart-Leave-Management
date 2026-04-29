import { useNavigate } from "react-router-dom"

function RoleSelect() {
  const navigate = useNavigate()

  const roles = [
    { label: "Student", sub: "Apply leave, check status, get QR pass", icon: "🎓", path: "/student-login", accent: "#6366f1", iconBg: "#eef2ff" },
    { label: "Warden", sub: "Approve leaves, track students", icon: "🛡️", path: "/warden-login", accent: "#f59e0b", iconBg: "#fff7ed" },
    { label: "Gate Guard", sub: "Scan student QR at hostel gate", icon: "🚪", path: "/gate", accent: "#22c55e", iconBg: "#f0fdf4" },
    { label: "Admin", sub: "System overview and management", icon: "⚙️", path: "/admin", accent: "#64748b", iconBg: "#f8fafc" },
  ]

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
      <div style={{ width: "100%", maxWidth: "440px" }}>

        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "80px", height: "80px",
            background: "rgba(255,255,255,0.25)",
            borderRadius: "24px",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 16px"
          }}>🏠</div>
          <h1 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "800", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            HostelSure
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: 0 }}>
            Digital Hostel Leave Management
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {roles.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid transparent",
                borderRadius: "16px",
                padding: "18px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                width: "100%",
                textAlign: "left",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = item.accent
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "transparent"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <div style={{
                width: "48px", height: "48px",
                backgroundColor: item.iconBg,
                borderRadius: "14px",
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: "24px", flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>
                  {item.label}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
                  {item.sub}
                </p>
              </div>
              <span style={{ color: "#94a3b8", fontSize: "20px" }}>›</span>
            </button>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "24px" }}>
          Web Wardens
        </p>
      </div>
    </div>
  )
}

export default RoleSelect