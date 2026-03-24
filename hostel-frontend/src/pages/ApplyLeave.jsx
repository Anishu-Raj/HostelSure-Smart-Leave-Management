import { useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function ApplyLeave() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [reason, setReason] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const studentId = localStorage.getItem("studentId")
    const studentName = localStorage.getItem("studentName")
    const res = await fetch("http://localhost:5000/api/leaves/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId,studentName, startDate: start, endDate: end, reason })
    })
    const data = await res.json()
    if (data.message) setSubmitted(true)
    setLoading(false)
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "12px",
    fontSize: "15px", color: "#f1f5f9",
    outline: "none", boxSizing: "border-box",
    fontFamily: "'Nunito', sans-serif",
    transition: "border-color 0.2s"
  }

  const labelStyle = {
    fontSize: "12px", fontWeight: "700",
    color: "#94a3b8", display: "block",
    marginBottom: "8px", textTransform: "uppercase",
    letterSpacing: "0.5px"
  }

  if (submitted) return (
    <StudentLayout>
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "60vh", textAlign: "center"
      }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 10px" }}>
          Leave Applied!
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "28px" }}>
          Warden will review it soon. You'll see status in My Leaves.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStart(""); setEnd(""); setReason("") }}
          style={{
            padding: "13px 28px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", border: "none",
            borderRadius: "12px", fontSize: "15px",
            fontWeight: "700", cursor: "pointer",
            fontFamily: "'Nunito', sans-serif"
          }}
        >
          Apply Another
        </button>
      </div>
    </StudentLayout>
  )

  return (
    <StudentLayout>
      <div style={{ maxWidth: "500px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 6px" }}>
          Apply for Leave
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
          Fill the form and wait for warden to approve
        </p>

        <div style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "20px",
          padding: "28px"
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>From Date</label>
                <input type="date" style={inputStyle}
                  onChange={e => setStart(e.target.value)}
                  onFocus={e => e.target.style.borderColor = "#6366f1"}
                  onBlur={e => e.target.style.borderColor = "#334155"}
                  required />
              </div>
              <div>
                <label style={labelStyle}>To Date</label>
                <input type="date" style={inputStyle}
                  onChange={e => setEnd(e.target.value)}
                  onFocus={e => e.target.style.borderColor = "#6366f1"}
                  onBlur={e => e.target.style.borderColor = "#334155"}
                  required />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Reason</label>
              <textarea
                placeholder="Why do you need leave?"
                rows={4}
                onChange={e => setReason(e.target.value)}
                required
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px",
              background: loading ? "#4338ca" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none",
              borderRadius: "12px", fontSize: "15px",
              fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Nunito', sans-serif"
            }}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  )
}

export default ApplyLeave