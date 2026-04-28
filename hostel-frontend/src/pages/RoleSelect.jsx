import { useNavigate } from "react-router-dom"

function RoleSelect() {
  const navigate = useNavigate()

  const roles = [
    {
      label: "Student",
      sub: "Apply leave, check status, get QR pass",
      icon: "🎓",
      path: "/student-login",
      accent: "#6366f1",
      lightBg: "#eef2ff",
      border: "#c7d2fe"
    },
    {
      label: "Warden",
      sub: "Approve leaves, track students",
      icon: "🛡️",
      path: "/warden-login",
      accent: "#f59e0b",
      lightBg: "#fffbeb",
      border: "#fde68a"
    },
    {
      label: "Gate Guard",
      sub: "Scan student QR at hostel gate",
      icon: "🚪",
      path: "/gate",
      accent: "#10b981",
      lightBg: "#ecfdf5",
      border: "#a7f3d0"
    },
    {
      label: "Admin",
      sub: "System overview and management",
      icon: "⚙️",
      path: "/admin",
      accent: "#64748b",
      lightBg: "#f8fafc",
      border: "#e2e8f0"
    },
  ]

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "24px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "fixed", top: "-120px", left: "-80px",
        width: "380px", height: "380px",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", bottom: "-100px", right: "-60px",
        width: "320px", height: "320px",
        background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none"
      }} />

      <div style={{ width: "100%", maxWidth: "460px", position: "relative" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "80px", height: "80px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "24px",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 20px",
            boxShadow: "0 12px 32px rgba(99,102,241,0.25)"
          }}>
            🏠
          </div>
          <h1 style={{
            color: "#1a1f36",
            fontSize: "34px",
            fontWeight: "800",
            margin: "0 0 8px",
            letterSpacing: "-0.5px"
          }}>
            HostelSure
          </h1>
          <p style={{
            color: "#64748b",
            fontSize: "15px",
            margin: 0,
            fontWeight: "500"
          }}>
            Digital Hostel Leave Management
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {roles.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              style={{
                background: "#ffffff",
                border: `1.5px solid ${item.border}`,
                borderRadius: "16px",
                padding: "18px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                width: "100%",
                textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = item.accent
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.10)`
                e.currentTarget.style.background = item.lightBg
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = item.border
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"
                e.currentTarget.style.background = "#ffffff"
              }}
            >
              <div style={{
                width: "50px", height: "50px",
                background: item.lightBg,
                borderRadius: "14px",
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
                border: `1px solid ${item.border}`
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: 0, fontSize: "15px",
                  fontWeight: "700", color: "#1a1f36"
                }}>
                  {item.label}
                </p>
                <p style={{
                  margin: "3px 0 0", fontSize: "13px",
                  color: "#94a3b8", fontWeight: "500"
                }}>
                  {item.sub}
                </p>
              </div>
              <span style={{ color: item.accent, fontSize: "20px", fontWeight: "700" }}>›</span>
            </button>
          ))}
        </div>

        <p style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "12px",
          marginTop: "28px",
          fontWeight: "500"
        }}>
          Web Wardens — FS-VI-T069
        </p>

      </div>
    </div>
  )
}

export default RoleSelect