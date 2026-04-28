import { useEffect, useState } from "react"
import WardenLayout from "../layouts/WardenLayout"

function ApprovedLeaves() {
  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => setLeaves(data.filter(l => l.status === "Approved")))
      .catch(err => console.log(err))
  }, [])

  return (
    <WardenLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
        On Leave Now ✅
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
        {leaves.length} students currently on approved leave
      </p>

      {leaves.length === 0 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#94a3b8" }}>No students on leave right now</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {leaves.map((leave, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: "14px",
            padding: "18px 22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px" }}>
                {leave.studentName || leave.studentId}
              </p>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 2px" }}>
                📅 {leave.startDate} → {leave.endDate}
              </p>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                📝 {leave.reason}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "100px", padding: "5px 12px", flexShrink: 0 }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#16a34a" }}>On Leave</span>
            </div>
          </div>
        ))}
      </div>
    </WardenLayout>
  )
}

export default ApprovedLeaves