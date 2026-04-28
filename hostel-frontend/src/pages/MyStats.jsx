import { useEffect, useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function MyStats() {
  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    const studentId = localStorage.getItem("studentId")
    fetch(`http://localhost:5000/api/leaves/${studentId}`)
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => console.log(err))
  }, [])

  const now = new Date()
  const thisMonth = leaves.filter(l => {
    const d = new Date(l.startDate)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const approved = leaves.filter(l => l.status === "Approved").length
  const rejected = leaves.filter(l => l.status === "Rejected").length

  const getStatusStyle = (status) => {
    if (status === "Approved") return { bg: "#f0fdf4", color: "#16a34a" }
    if (status === "Rejected") return { bg: "#fef2f2", color: "#dc2626" }
    if (status === "Returned") return { bg: "#f0f9ff", color: "#0369a1" }
    return { bg: "#fefce8", color: "#ca8a04" }
  }

  return (
    <StudentLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
        My Stats 📊
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
        Your leave history and summary
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "This Month", value: thisMonth.length, color: "#6366f1", bg: "#eef2ff", icon: "📅" },
          { label: "Total Leaves", value: leaves.length, color: "#1e293b", bg: "#f8fafc", icon: "📋" },
          { label: "Approved", value: approved, color: "#16a34a", bg: "#f0fdf4", icon: "✅" },
          { label: "Rejected", value: rejected, color: "#dc2626", bg: "#fef2f2", icon: "❌" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: "16px",
            padding: "20px", border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {s.label}
            </p>
            <p style={{ fontSize: "28px", fontWeight: "800", color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "22px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", margin: "0 0 16px" }}>
          Leave History
        </h3>
        {leaves.length === 0 && <p style={{ color: "#94a3b8", fontSize: "13px" }}>No leaves yet.</p>}
        {leaves.map((l, i) => {
          const s = getStatusStyle(l.status)
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < leaves.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: "0 0 2px" }}>
                  {l.startDate} → {l.endDate}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>{l.reason}</p>
              </div>
              <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: "600", flexShrink: 0 }}>
                {l.status}
              </span>
            </div>
          )
        })}
      </div>
    </StudentLayout>
  )
}

export default MyStats