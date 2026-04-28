import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const [students, setStudents] = useState([])
  const [leaves, setLeaves] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/students/all")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.log(err))

    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => console.log(err))
  }, [])

  const approved = leaves.filter(l => l.status === "Approved").length
  const pending = leaves.filter(l => l.status === "Pending").length
  const rejected = leaves.filter(l => l.status === "Rejected").length

  const getStatusStyle = (s) => {
    if (s === "Approved") return { bg: "#f0fdf4", color: "#16a34a" }
    if (s === "Rejected") return { bg: "#fef2f2", color: "#dc2626" }
    return { bg: "#fefce8", color: "#ca8a04" }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "18px 32px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #64748b, #475569)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⚙️</div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: "800", color: "#1e293b", margin: 0 }}>Admin Dashboard</p>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>Sarojini Hostel</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{ padding: "8px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#ef4444", fontSize: "13px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: "28px 32px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Students", value: students.length, color: "#6366f1", bg: "#eef2ff", icon: "👥" },
            { label: "Total Leaves", value: leaves.length, color: "#1e293b", bg: "#f8fafc", icon: "📋" },
            { label: "Approved", value: approved, color: "#16a34a", bg: "#f0fdf4", icon: "✅" },
            { label: "Pending", value: pending, color: "#ca8a04", bg: "#fefce8", icon: "⏳" },
            { label: "Rejected", value: rejected, color: "#dc2626", bg: "#fef2f2", icon: "❌" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "18px 16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "700", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ fontSize: "26px", fontWeight: "800", color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 16px" }}>
            All Students ({students.length})
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Student ID", "Name", "Course", "Hostel", "Room", "Parent Mobile"].map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px", color: "#6366f1", fontWeight: "700" }}>{s.studentId}</td>
                    <td style={{ padding: "12px", color: "#1e293b", fontWeight: "600" }}>{s.name}</td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{s.course}</td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{s.hostel}</td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{s.room}</td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{s.parentMobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 16px" }}>
            All Leave Records ({leaves.length})
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Student", "Dates", "Reason", "Status"].map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaves.map((l, i) => {
                  const s = getStatusStyle(l.status)
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "12px", color: "#1e293b", fontWeight: "600" }}>{l.studentName || l.studentId}</td>
                      <td style={{ padding: "12px", color: "#64748b" }}>{l.startDate} → {l.endDate}</td>
                      <td style={{ padding: "12px", color: "#64748b" }}>{l.reason}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: "700" }}>
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard