import { Link, useLocation, useNavigate } from "react-router-dom"

function WardenLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { path: "/warden", label: "Leave Requests", icon: "📬" },
    { path: "/approved", label: "On Leave Now", icon: "✅" },
    { path: "/late", label: "Late Returns", icon: "⏰" },
  ]

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#fffcf7"
    }}>
      <div style={{
        width: "248px",
        flexShrink: 0,
        background: "#ffffff",
        borderRight: "1px solid #fde68a",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 16px rgba(245,158,11,0.07)"
      }}>
        <div style={{
          padding: "26px 20px 22px",
          borderBottom: "1px solid #fef3c7"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "42px", height: "42px",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              borderRadius: "12px",
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
            }}>
              🛡️
            </div>
            <div>
              <p style={{ color: "#1a1f36", fontSize: "16px", fontWeight: "800", margin: 0 }}>
                HostelSure
              </p>
              <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0, textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>
                Warden Portal
              </p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 12px" }}>
          {links.map((link, i) => {
            const active = location.pathname === link.path
            return (
              <Link
                key={i}
                to={link.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  marginBottom: "4px",
                  textDecoration: "none",
                  background: active ? "#fffbeb" : "transparent",
                  color: active ? "#d97706" : "#64748b",
                  fontWeight: active ? "700" : "500",
                  fontSize: "14px",
                  borderLeft: active ? "3px solid #f59e0b" : "3px solid transparent",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#fffcf0"; e.currentTarget.style.color = "#1a1f36" } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" } }}
              >
                <span style={{ fontSize: "17px" }}>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid #fef3c7" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%", padding: "10px 14px",
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: "10px", color: "#ef4444",
              fontSize: "13px", cursor: "pointer",
              textAlign: "left",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: "600"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
          >
             Logout
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  )
}

export default WardenLayout