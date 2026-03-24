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

        // jinki endDate nikal gayi aur status abhi bhi Approved hai
        const late = data.filter(leave => {
          if (leave.status !== "Approved") return false
          const endDate = new Date(leave.endDate)
          endDate.setHours(0, 0, 0, 0)
          return endDate < today
        })

        setLateStudents(late)
      })
      .catch(err => console.log(err))
  }, [])

  const getDaysLate = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    const diff = Math.floor((today - end) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <WardenLayout>
      <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 6px" }}>
        Late Returns ⏰
      </h1>
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
        Students who haven't returned after their leave end date
      </p>

      {lateStudents.length === 0 && (
        <div style={{
          background: "#1e293b", border: "1px solid #334155",
          borderRadius: "20px", padding: "48px", textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
          <p style={{ color: "#64748b" }}>All students returned on time!</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {lateStudents.map((leave, i) => (
          <div key={i} style={{
            background: "#1e293b",
            border: "1px solid rgba(239,68,68,0.4)",
            borderRadius: "16px",
            padding: "20px 24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: "rgba(239,68,68,0.1)",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "20px"
                }}>⚠️</div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>
                    {leave.studentName || leave.studentId}
                  </p>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
                    ID: {leave.studentId}
                  </p>
                </div>
              </div>
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "100px", padding: "6px 14px",
                flexShrink: 0
              }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#f87171" }}>
                  {getDaysLate(leave.endDate)} day{getDaysLate(leave.endDate) > 1 ? "s" : ""} late
                </span>
              </div>
            </div>

            <div style={{
              background: "#0f172a",
              borderRadius: "10px", padding: "12px 14px",
              marginBottom: "14px"
            }}>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 4px" }}>
                📅 Was supposed to return by: <span style={{ color: "#f87171", fontWeight: "700" }}>{leave.endDate}</span>
              </p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                📝 Reason was: {leave.reason}
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "9px 18px",
                  background: "rgba(99,102,241,0.15)",
                  color: "#818cf8",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "10px", fontSize: "13px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif"
                }}
                onClick={() => alert(`Calling parent of ${leave.studentName || leave.studentId}...`)}
              >
                📞 Call Parent
              </button>
              <button
                style={{
                  padding: "9px 18px",
                  background: "rgba(34,197,94,0.1)",
                  color: "#4ade80",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "10px", fontSize: "13px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif"
                }}
                onClick={() => alert(`Marking ${leave.studentName || leave.studentId} as returned`)}
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