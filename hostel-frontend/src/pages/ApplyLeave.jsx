import { useState, useEffect } from "react"
import StudentLayout from "../layouts/StudentLayout"

function ApplyLeave() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pendingLeave, setPendingLeave] = useState(null)
  const [checking, setChecking] = useState(true)

  const studentId = localStorage.getItem("studentId")

  useEffect(() => {
    fetch(`http://localhost:5000/api/leaves/${studentId}`)
      .then(res => res.json())
      .then(data => {
        const pending = data.find(l => l.status === "Pending")
        setPendingLeave(pending || null)
        setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const studentName = localStorage.getItem("studentName")
    const res = await fetch("http://localhost:5000/api/leaves/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, studentName, startDate: start, endDate: end, reason })
    })
    const data = await res.json()
    if (data.message) setSubmitted(true)
    setLoading(false)
  }

  const inputStyle = {
    width: "100%", padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
    fontFamily: "'Poppins', sans-serif",
    background: "#f8fafc", color: "#1e293b",
    transition: "border-color 0.2s"
  }

  if (checking) return (
    <StudentLayout>
      <p style={{ color: "#94a3b8" }}>Checking your leave status...</p>
    </StudentLayout>
  )

  if (pendingLeave) return (
    <StudentLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 24px" }}>
        Apply for Leave 📝
      </h1>
      <div style={{
        background: "#fff",
        borderRadius: "16px", padding: "28px",
        border: "2px solid #fde047",
        maxWidth: "500px",
        boxShadow: "0 4px 16px rgba(250,204,21,0.15)"
      }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#854d0e", margin: "0 0 8px" }}>
          You have a pending leave request!
        </h3>
        <p style={{ fontSize: "13px", color: "#92400e", margin: "0 0 16px" }}>
          You cannot apply for another leave until your current request is approved or rejected.
        </p>
        <div style={{ background: "#fefce8", borderRadius: "10px", padding: "14px", border: "1px solid #fde047" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "600", textTransform: "uppercase" }}>Pending Request</p>
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>
            {pendingLeave.startDate} → {pendingLeave.endDate}
          </p>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>{pendingLeave.reason}</p>
        </div>
        <p style={{ fontSize: "12px", color: "#a16207", margin: "12px 0 0" }}>
          Check My Leaves tab for status updates.
        </p>
      </div>
    </StudentLayout>
  )

  if (submitted) return (
    <StudentLayout>
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b", margin: "0 0 8px" }}>
          Leave Applied!
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 6px" }}>
          Your request has been sent to the warden.
        </p>
        <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
          You will be notified once it is approved ✨
        </p>
        <div style={{
          background: "#fefce8", border: "1px solid #fde047",
          borderRadius: "12px", padding: "14px 20px",
          fontSize: "13px", color: "#854d0e",
          display: "inline-block", marginBottom: "24px",
          fontWeight: "600"
        }}>
          ⏳ Waiting for Warden Approval
        </div>
        <br />
        <button
          onClick={() => { setSubmitted(false) }}
          style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", border: "none",
            borderRadius: "10px", fontSize: "14px",
            fontWeight: "700", cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)"
          }}
        >
          Apply Another
        </button>
      </div>
    </StudentLayout>
  )

  return (
    <StudentLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
        Apply for Leave 📝
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
        Fill the form and wait for warden approval
      </p>

      <div style={{
        background: "#fff", borderRadius: "20px",
        padding: "28px", maxWidth: "520px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                From Date
              </label>
              <input
                type="date" required
                onChange={e => setStart(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                To Date
              </label>
              <input
                type="date" required
                min={start}
                onChange={e => setEnd(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Reason
            </label>
            <textarea
              placeholder="Write your reason here..."
              required rows={4}
              onChange={e => setReason(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          <div style={{
            background: "#f0f9ff", border: "1px solid #bae6fd",
            borderRadius: "10px", padding: "12px 14px",
            fontSize: "13px", color: "#0369a1",
            marginBottom: "18px"
          }}>
            ℹ️ After applying, warden will contact your parents before approving.
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none",
              borderRadius: "10px", fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.3)"
            }}
          >
            {loading ? "Submitting..." : "Submit Request →"}
          </button>
        </form>
      </div>
    </StudentLayout>
  )
}

export default ApplyLeave