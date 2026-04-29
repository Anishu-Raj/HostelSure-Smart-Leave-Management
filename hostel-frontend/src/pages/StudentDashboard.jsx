import { useEffect, useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function StudentDashboard() {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const id = localStorage.getItem("studentId")
    fetch(`http://localhost:5000/api/students/${id}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log(err))
  }, [])

  if (!student) {
    return (
      <StudentLayout>
        <p style={{ color: "#94a3b8" }}>Loading your profile...</p>
      </StudentLayout>
    )
  }

  const cards = [
    { label: "Course", value: student.course, icon: "📚", bg: "#eef2ff" },
    { label: "Mobile", value: student.mobile, icon: "📞", bg: "#f0fdf4" },
    { label: "Parent Name", value: student.parent, icon: "👨‍👩‍👧", bg: "#fff7ed" },
    { label: "Parent Mobile", value: student.parentMobile, icon: "📱", bg: "#fdf4ff" },
    { label: "Hostel", value: student.hostel, icon: "🏠", bg: "#f0f9ff" },
    { label: "Room No.", value: student.room, icon: "🚪", bg: "#fff1f2" },
  ]

  return (
    <StudentLayout>

      <div style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        borderRadius: "20px",
        padding: "28px 32px",
        color: "#ffffff",
        marginBottom: "28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(99,102,241,0.3)"
      }}>
        <div style={{ position: "absolute", width: "150px", height: "150px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", top: -40, right: -20 }} />
        <p style={{ margin: "0 0 6px", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>Welcome back 👋</p>
        <h1 style={{ margin: "0 0 6px", fontSize: "30px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px" }}>
          {student.name}
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
          Student ID: {student.studentId}
        </p>
      </div>

      <p style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 16px" }}>
        Your Details
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{
              width: "42px", height: "42px",
              backgroundColor: card.bg,
              borderRadius: "12px",
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              marginBottom: "12px"
            }}>
              {card.icon}
            </div>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "600", textTransform: "uppercase" }}>
              {card.label}
            </p>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
              {card.value || "—"}
            </p>
          </div>
        ))}
      </div>
    </StudentLayout>
  )
}

export default StudentDashboard