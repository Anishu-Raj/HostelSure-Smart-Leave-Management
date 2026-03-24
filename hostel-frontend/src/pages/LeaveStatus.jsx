import { useEffect, useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function LeaveStatus() {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentId = localStorage.getItem("studentId")
    fetch(`http://localhost:5000/api/leaves/${studentId}`)
      .then(res => res.json())
      .then(data => { setLeaves(data); setLoading(false) })
  }, [])

  const statusConfig = {
    Approved: { bg: "rgba(34,197,94,0.1)", color: "#4ade80", border: "rgba(34,197,94,0.2)", dot: "#4ade80" },
    Rejected: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)", dot: "#f87171" },
    Pending:  { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "rgba(245,158,11,0.2)", dot: "#fbbf24" },
  }

  return (
    <StudentLayout>
      <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 6px" }}>
        My Leaves 📋
      </h1>
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
        Track all your leave requests here
      </p>

      {loading && <p style={{ color: "#64748b" }}>Loading...</p>}

      {!loading && leaves.length === 0 && (
        <div style={{
          background: "#1e293b", border: "1px solid #334155",
          borderRadius: "20px", padding: "48px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            No leaves applied yet. Go apply one!
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {leaves.map((leave, i) => {
          const s = statusConfig[leave.status] || statusConfig.Pending
          return (
            <div key={i} style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9" }}>
                    {leave.startDate}
                  </span>
                  <span style={{ color: "#475569" }}>→</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9" }}>
                    {leave.endDate}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  {leave.reason}
                </p>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: "100px",
                padding: "6px 14px",
                flexShrink: 0
              }}>
                <div style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: s.dot
                }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: s.color }}>
                  {leave.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </StudentLayout>
  )
}

export default LeaveStatus