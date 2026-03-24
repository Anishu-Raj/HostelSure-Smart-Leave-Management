import { useEffect, useState } from "react"
import WardenLayout from "../layouts/WardenLayout"

function ApprovedLeaves() {
  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => {
        const approved = data.filter(l => l.status === "Approved")
        setLeaves(approved)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <WardenLayout>
      <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 6px" }}>
        Approved Leaves ✅
      </h1>
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
        {leaves.length} students currently on approved leave
      </p>

      {leaves.length === 0 && (
        <div style={{
          background: "#1e293b", border: "1px solid #334155",
          borderRadius: "20px", padding: "48px", textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#64748b" }}>No approved leaves right now</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {leaves.map((leave, i) => (
          <div key={i} style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{
                  width: "36px", height: "36px",
                  background: "rgba(99,102,241,0.15)",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "16px"
                }}>👤</div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>
                    {leave.studentName || leave.studentId}
                  </p>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
                    ID: {leave.studentId}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "8px 0 0" }}>
                📅 {leave.startDate} → {leave.endDate}
              </p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                📝 {leave.reason}
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "100px", padding: "6px 14px",
              flexShrink: 0
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#4ade80" }}>
                On Leave
              </span>
            </div>
          </div>
        ))}
      </div>
    </WardenLayout>
  )
}

export default ApprovedLeaves