import { useEffect, useState } from "react"
import WardenLayout from "../layouts/WardenLayout"

function LateReturns() {
  const [lateStudents, setLateStudents] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const late = data.filter(leave => {
          if (leave.status !== "Approved") return false
          const end = new Date(leave.endDate)
          end.setHours(0, 0, 0, 0)
          return end < today
        })
        setLateStudents(late)
      })
      .catch(err => console.log(err))
  }, [])

  const getDaysLate = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    return Math.floor((today - end) / (1000 * 60 * 60 * 24))
  }

  const markReturned = async (leaveId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leaves/return/${leaveId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      if (data.message === "Return recorded") {
        setLateStudents(prev => prev.filter(l => l._id !== leaveId))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <WardenLayout>

      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px" }}>
        Late Returns ⏰
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
        Students who have not returned after their leave end date
      </p>

      {lateStudents.length === 0 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "40px", margin: "0 0 10px" }}>🎉</p>
          <p style={{ color: "#94a3b8" }}>All students returned on time!</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {lateStudents.map((leave, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: "14px",
            padding: "18px 22px",
            border: "1px solid #fecaca"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>
                  {leave.studentName || leave.studentId}
                </p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                  ID: {leave.studentId}
                </p>
              </div>
              <span style={{
                background: "#fef2f2", color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "4px 12px", borderRadius: "100px",
                fontSize: "12px", fontWeight: "700"
              }}>
                {getDaysLate(leave.endDate)} day{getDaysLate(leave.endDate) > 1 ? "s" : ""} late
              </span>
            </div>

            <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px", marginBottom: "12px" }}>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 3px" }}>
                📅 Should have returned by: <span style={{ color: "#dc2626", fontWeight: "700" }}>{leave.endDate}</span>
              </p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                📝 Reason: {leave.reason}
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => alert(`Calling parent of ${leave.studentName || leave.studentId}...`)}
                style={{
                  padding: "8px 16px",
                  background: "#eef2ff", color: "#6366f1",
                  border: "1px solid #e0e7ff",
                  borderRadius: "8px", fontSize: "13px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                📞 Call Parent
              </button>
              <button
                onClick={() => markReturned(leave._id)}
                style={{
                  padding: "8px 16px",
                  background: "#f0fdf4", color: "#16a34a",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px", fontSize: "13px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                ✓ Mark Returned
              </button>
            </div>
          </div>
        ))}
      </div>

    </WardenLayout>
  )
}

export default LateReturns