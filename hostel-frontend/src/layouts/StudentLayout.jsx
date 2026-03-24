import { Link, useNavigate, useLocation } from "react-router-dom"

function StudentLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: "/student", label: "Dashboard", emoji: "🏠" },
    { path: "/apply-leave", label: "Apply Leave", emoji: "📝" },
    { path: "/leave-status", label: "My Leaves", emoji: "📋" },
    { path: "/qr", label: "Exit QR", emoji: "📱" },
  ]

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'Nunito', sans-serif",
      background: "#0f172a"
    }}>

      {/* sidebar */}
      <div style={{
        width: "230px", flexShrink: 0,
        background: "#1e293b",
        borderRight: "1px solid #334155",
        display: "flex", flexDirection: "column",
        padding: "24px 0"
      }}>
        <div style={{ padding: "0 20px 28px" }}>
          <div style={{ fontSize: "20px", fontWeight: "800", color: "#f1f5f9" }}>
            🏠 HostelSure
          </div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Student Panel
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 12px" }}>
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} style={{
                display: "flex", alignItems: "center",
                gap: "10px", padding: "11px 14px",
                borderRadius: "12px", marginBottom: "4px",
                textDecoration: "none",
                background: active ? "rgba(99,102,241,0.15)" : "transparent",
                color: active ? "#818cf8" : "#64748b",
                fontWeight: active ? "700" : "600",
                fontSize: "14px",
                transition: "all 0.15s",
                borderLeft: active ? "3px solid #6366f1" : "3px solid transparent"
              }}>
                <span style={{ fontSize: "16px" }}>{item.emoji}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <button
            onClick={() => { localStorage.removeItem("studentId"); navigate("/") }}
            style={{
              width: "100%", padding: "11px 14px",
              background: "none", border: "1px solid #334155",
              borderRadius: "12px", color: "#64748b",
              fontSize: "13px", cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              textAlign: "left"
            }}
          >
            👋 Logout
          </button>
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px" }}>
        {children}
      </div>

    </div>
  )
}

export default StudentLayout