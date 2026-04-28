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
        <p style={{ color: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Loading your profile...
        </p>
      </StudentLayout>
    )
  }

  const cards = [
    { label: "Course", value: student.course, icon: "📚", bg: "#eef2ff", border: "#c7d2fe", iconBg: "#e0e7ff" },
    { label: "Mobile", value: student.mobile, icon: "📞", bg: "#f0fdf4", border: "#bbf7d0", iconBg: "#dcfce7" },
    { label: "Parent Name", value: student.parent, icon: "👨‍👩‍👧", bg: "#fffbeb", border: "#fde68a", iconBg: "#fef3c7" },
    { label: "Parent Mobile", value: student.parentMobile, icon: "📱", bg: "#fdf4ff", border: "#e9d5ff", iconBg: "#f3e8ff" },
    { label: "Hostel", value: student.hostel, icon: "🏠", bg: "#f0f9ff", border: "#bae6fd", iconBg: "#e0f2fe" },
    { label: "Room No.", value: student.room, icon: "🚪", bg: "#fff1f2", border: "#fecdd3", iconBg: "#ffe4e6" },
  ]

  return (
    <StudentLayout>
      <div style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        borderRadius: "20px",
        padding: "30px 32px",
        color: "#fff",
        marginBottom: "28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(99,102,241,0.28)"
      }}>
        <div style={{ position: "absolute", width: "180px", height: "180px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", top: -60, right: -30, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "100px", height: "100px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", bottom: -30, right: 120, pointerEvents: "none" }} />
        <p style={{ margin: "0 0 6px", fontSize: "13px", opacity: 0.85, fontWeight: "500" }}>
          Welcome back 👋
        </p>
        <h1 style={{ margin: "0 0 6px", fontSize: "30px", fontWeight: "800", letterSpacing: "-0.5px", color: "#fff" }}>
          {student.name}
        </h1>
        <p style={{ margin: 0, fontSize: "13px", opacity: 0.75, fontWeight: "500" }}>
          Student ID: {student.studentId}
        </p>
      </div>

      <p style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 16px" }}>
        Your Details
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "22px",
              border: `1px solid ${card.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.09)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div style={{
              width: "42px", height: "42px",
              background: card.iconBg,
              borderRadius: "12px",
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "14px",
              border: `1px solid ${card.border}`
            }}>
              {card.icon}
            </div>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.6px" }}>
              {card.label}
            </p>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1f36", margin: 0 }}>
              {card.value || "—"}
            </p>
          </div>
        ))}
      </div>
    </StudentLayout>
  )
}

export default StudentDashboard