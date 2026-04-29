import { Link, useLocation, useNavigate } from "react-router-dom"

function StudentLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { path: "/student", label: "Dashboard", icon: "🏠" },
    { path: "/apply-leave", label: "Apply Leave", icon: "📝" },
    { path: "/leave-status", label: "My Leaves", icon: "📋" },
    { path: "/my-stats", label: "My Stats", icon: "📊" },
    { path: "/qr", label: "Exit QR", icon: "📱" },
  ]

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      background: "#f5f7ff",
      backgroundColor: "#f5f7ff",
    }}>
      
      <div style={{
        width: "252px",
        flexShrink: 0,
        background: "#ffffff",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e8ecf8",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 16px rgba(99,102,241,0.07)"
      }}>
        
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              boxShadow: "0 4px 12px rgba(99,102,241,0.25)"
            }}>🏠</div>
            <div>
              <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: "800", margin: 0 }}>HostelSure</p>
              <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0, textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>Student Portal</p>
            </div>
          </div>
        </div>

        
        <nav style={{ flex: 1, padding: "12px 10px" }}>
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
                  marginBottom: "2px",
                  textDecoration: "none",
                  background: active ? "#eef2ff" : "transparent",
                  backgroundColor: active ? "#eef2ff" : "transparent",
                  color: active ? "#6366f1" : "#64748b",
                  fontWeight: active ? "700" : "500",
                  fontSize: "14px",
                  borderLeft: active ? "3px solid #6366f1" : "3px solid transparent",
                  transition: "all 0.15s"
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f5f7ff"; e.currentTarget.style.color = "#0f172a" } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" } }}
              >
                <span style={{ fontSize: "16px" }}>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        
        <div style={{ padding: "14px 10px", borderTop: "1px solid #f1f5f9" }}>
          <button
            onClick={() => { localStorage.clear(); navigate("/") }}
            style={{
              width: "100%", padding: "10px 14px",
              background: "#fef2f2", backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px", color: "#ef4444",
              fontSize: "13px", cursor: "pointer",
              textAlign: "left",
              fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
              fontWeight: "600"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2" }}
          >
             Logout
          </button>
        </div>
      </div>

      
      <div style={{
        flex: 1, padding: "32px", overflowY: "auto",
        background: "#f5f7ff", backgroundColor: "#f5f7ff"
      }}>
        {children}
      </div>
    </div>
  )
}

export default StudentLayout