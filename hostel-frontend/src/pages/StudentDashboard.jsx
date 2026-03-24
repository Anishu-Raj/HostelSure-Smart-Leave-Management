import { useEffect, useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function StudentDashboard() {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const studentId = localStorage.getItem("studentId")
    fetch(`http://localhost:5000/api/students/${studentId}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log(err))
  }, [])

  if (!student) return (
    <StudentLayout>
      <p style={{ color: "#64748b", fontFamily: "'Nunito', sans-serif" }}>Loading your info...</p>
    </StudentLayout>
  )

  const cards = [
    { label: "Course", value: student.course, emoji: "📚" },
    { label: "Mobile", value: student.mobile, emoji: "📞" },
    { label: "Parent", value: student.parent, emoji: "👩‍👧" },
    { label: "Parent Mobile", value: student.parentMobile, emoji: "📱" },
    { label: "Hostel", value: student.hostel, emoji: "🏠" },
    { label: "Room No.", value: student.room, emoji: "🚪" },
  ]

  return (
    <StudentLayout>

      {/* header */}
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        borderRadius: "20px",
        padding: "28px 32px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-20px", right: "-20px",
          width: "100px", height: "100px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%"
        }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 6px" }}>
          Good morning 👋
        </p>
        <h1 style={{
          fontSize: "28px", fontWeight: "800",
          color: "#fff", margin: "0 0 4px",
          letterSpacing: "-0.5px"
        }}>
          {student.name}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>
          ID: {student.studentId}
        </p>
      </div>

      {/* info grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px"
          }}>
            <div style={{
              fontSize: "22px",
              width: "40px", height: "40px",
              background: "#0f172a",
              borderRadius: "10px",
              display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0
            }}>
              {card.emoji}
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700" }}>
                {card.label}
              </p>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9", margin: 0 }}>
                {card.value || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>

    </StudentLayout>
  )
}

export default StudentDashboard