import { Link, useNavigate, useLocation } from "react-router-dom"

function WardenLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: "/warden", label: "Leave Requests", emoji: "📬" },
    { path: "/approved", label: "Approved", emoji: "✅" },
    { path: "/late", label: "Late Returns", emoji: "⏰" },
  ]

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'Nunito', sans-serif",
      background: "#0f172a"
    }}>

      <div style={{
        width: "230px", flexShrink: 0,
        background: "#1e293b",
        borderRight: "1px solid #334155",
        display: "flex", flexDirection: "column",
        padding: "24px 0"
      }}>
        <div style={{ padding: "0 20px 28px" }}>
          <div style={{ fontSize: "20px", fontWeight: "800", color: "#f1f5f9" }}>
            🛡️ HostelSure
          </div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Warden Panel
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
                background: active ? "rgba(245,158,11,0.12)" : "transparent",
                color: active ? "#fbbf24" : "#64748b",
                fontWeight: active ? "700" : "600",
                fontSize: "14px",
                transition: "all 0.15s",
                borderLeft: active ? "3px solid #f59e0b" : "3px solid transparent"
              }}>
                <span style={{ fontSize: "16px" }}>{item.emoji}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <button
            onClick={() => navigate("/")}
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

      <div style={{ flex: 1, overflowY: "auto", padding: "36px" }}>
        {children}
      </div>

    </div>
  )
}

export default WardenLayout