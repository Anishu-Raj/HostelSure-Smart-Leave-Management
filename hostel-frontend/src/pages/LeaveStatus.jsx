import { useEffect, useState } from "react"
import StudentLayout from "../layouts/StudentLayout"

function LeaveStatus() {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [returnPrompt, setReturnPrompt] = useState(null)
  const [extendPrompt, setExtendPrompt] = useState(null)
  const [newExtendDate, setNewExtendDate] = useState("")
  const [extendDone, setExtendDone] = useState(false)
  const [returnDone, setReturnDone] = useState(false)

  const studentId = localStorage.getItem("studentId")

  const fetchLeaves = () => {
    fetch(`http://localhost:5000/api/leaves/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setLeaves(data)
        setLoading(false)
        checkReturnAlert(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => { fetchLeaves() }, [])

  const checkReturnAlert = (data) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    data.forEach(leave => {
      if (leave.status !== "Approved") return
      if (leave.returnTime || leave.extendRequested) return
      const end = new Date(leave.endDate)
      end.setHours(0, 0, 0, 0)
      if (end <= today) setReturnPrompt(leave)
    })
  }

  const handleReturnYes = async () => {
    const res = await fetch(`http://localhost:5000/api/leaves/return/${returnPrompt._id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    if (data.message === "Return recorded") {
      setReturnPrompt(null)
      setReturnDone(true)
      fetchLeaves()
    }
  }

  const handleExtendRequest = async () => {
    if (!newExtendDate) { alert("Please select a new return date"); return }
    const res = await fetch(`http://localhost:5000/api/leaves/extend-request/${extendPrompt._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: "Student requested extension", newEndDate: newExtendDate })
    })
    const data = await res.json()
    if (data.message === "Extension requested") {
      setExtendDone(true)
      setExtendPrompt(null)
      fetchLeaves()
    }
  }

  const statusConfig = {
    Approved: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", dot: "#22c55e" },
    Rejected: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", dot: "#ef4444" },
    Returned: { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd", dot: "#0ea5e9" },
    Extended: { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe", dot: "#a855f7" },
    Pending:  { bg: "#fefce8", color: "#ca8a04", border: "#fde047", dot: "#eab308" },
  }

  return (
    <StudentLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
        My Leaves 📋
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
        All your leave requests and their status
      </p>

      {returnPrompt && (
        <div style={{
          background: "#fff", border: "2px solid #fbbf24",
          borderRadius: "16px", padding: "22px",
          marginBottom: "20px",
          boxShadow: "0 8px 24px rgba(251,191,36,0.15)"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔔</div>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
            Your leave ends today!
          </h3>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>
            Leave end date: <strong>{returnPrompt.endDate}</strong><br />
            Have you reached the hostel?
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleReturnYes} style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(34,197,94,0.3)" }}>
              Yes, I am back!
            </button>
            <button onClick={() => { setExtendPrompt(returnPrompt); setReturnPrompt(null) }} style={{ flex: 1, padding: "11px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              No, not yet
            </button>
          </div>
        </div>
      )}

      {extendPrompt && (
        <div style={{
          background: "#fff", border: "2px solid #ddd6fe",
          borderRadius: "16px", padding: "22px",
          marginBottom: "20px",
          boxShadow: "0 8px 24px rgba(124,58,237,0.1)"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📅</div>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
            Want to extend your leave?
          </h3>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 14px" }}>
            Select a new return date. Warden will need to approve the extension.
          </p>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#7c3aed", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>
            New Return Date
          </label>
          <input
            type="date"
            value={newExtendDate}
            min={extendPrompt.endDate}
            onChange={e => setNewExtendDate(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", border: "2px solid #ddd6fe", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "14px", fontFamily: "'Poppins', sans-serif", background: "#f8fafc" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleExtendRequest} style={{ flex: 1, padding: "11px", background: newExtendDate ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#e2e8f0", color: newExtendDate ? "#fff" : "#94a3b8", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: newExtendDate ? "pointer" : "not-allowed", fontFamily: "'Poppins', sans-serif" }}>
              Send Extension Request
            </button>
            <button onClick={() => setExtendPrompt(null)} style={{ flex: 1, padding: "11px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {returnDone && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px", color: "#16a34a", fontWeight: "600" }}>
          Welcome back! Your return has been recorded. ✅
        </div>
      )}

      {extendDone && (
        <div style={{ background: "#faf5ff", border: "1px solid #ddd6fe", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px", color: "#7c3aed", fontWeight: "600" }}>
          Extension request sent to warden. Waiting for approval. ⏳
        </div>
      )}

      {loading && <p style={{ color: "#94a3b8" }}>Loading your leaves...</p>}

      {!loading && leaves.length === 0 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#94a3b8" }}>No leaves applied yet!</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {leaves.map((leave, i) => {
          const s = statusConfig[leave.status] || statusConfig.Pending
          return (
            <div key={i} style={{
              background: "#fff", borderRadius: "16px",
              padding: "20px 24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px" }}>
                    {leave.startDate} → {leave.endDate}
                  </p>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    {leave.reason}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: s.bg, border: `1px solid ${s.border}`, borderRadius: "100px", padding: "5px 12px", flexShrink: 0, marginLeft: "12px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot }} />
                  <span style={{ fontSize: "12px", fontWeight: "600", color: s.color }}>{leave.status}</span>
                </div>
              </div>

              {leave.status === "Approved" && (
                <div style={{ marginTop: "10px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#16a34a", fontWeight: "600" }}>
                  🎉 Approved! Go to Exit QR tab to get your gate pass.
                </div>
              )}
              {leave.status === "Rejected" && (
                <div style={{ marginTop: "10px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#dc2626", fontWeight: "600" }}>
                  {leave.rejectReason === "Frequent leave limit exceeded"
                    ? "❌ Rejected due to frequent leaves this month. Please contact the warden."
                    : "❌ Your leave request was rejected by the warden."}
                </div>
              )}
              {leave.extendRequested && (
                <div style={{ marginTop: "10px", background: "#faf5ff", border: "1px solid #ddd6fe", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#7c3aed", fontWeight: "600" }}>
                  ⏳ Extension request sent — waiting for warden approval.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </StudentLayout>
  )
}

export default LeaveStatus