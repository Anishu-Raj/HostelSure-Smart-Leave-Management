import { useEffect, useState } from "react"
import WardenLayout from "../layouts/WardenLayout"

function WardenDashboard() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.log(err))
  }, [])

  const handleAction = async (leaveId, status) => {
    const res = await fetch(`http://localhost:5000/api/leaves/${leaveId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    const updated = await res.json()
    setRequests(prev => prev.map(r => r._id === leaveId ? { ...r, status: updated.status } : r))
  }

  const pending = requests.filter(r => r.status === "Pending")
  const done = requests.filter(r => r.status !== "Pending")

  const statusConfig = {
    Approved: { bg: "rgba(34,197,94,0.1)", color: "#4ade80", border: "rgba(34,197,94,0.2)" },
    Rejected: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)" },
    Pending:  { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "rgba(245,158,11,0.2)" },
  }

  return (
    <WardenLayout>
      <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 6px" }}>
        Leave Requests 📬
      </h1>
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 24px" }}>
        {pending.length} pending, {requests.length} total
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total", value: requests.length, color: "#818cf8" },
          { label: "Pending", value: pending.length, color: "#fbbf24" },
          { label: "Approved", value: requests.filter(r => r.status === "Approved").length, color: "#4ade80" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "18px 20px"
          }}>
            <p style={{ fontSize: "12px", color: "#475569", margin: "0 0 4px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {s.label}
            </p>
            <p style={{ fontSize: "28px", fontWeight: "800", color: s.color, margin: 0 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div style={{
          background: "#1e293b", border: "1px solid #334155",
          borderRadius: "20px", padding: "48px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
          <p style={{ color: "#64748b" }}>No leave requests right now!</p>
        </div>
      )}
      {pending.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>
            ⏳ Needs Your Action
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pending.map((r, i) => (
              <div key={i} style={{
                background: "#1e293b",
                border: "1px solid #f59e0b",
                borderRadius: "16px",
                padding: "20px 24px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: "800", color: "#f1f5f9", margin: "0 0 2px" }}>
                      {r.studentName || r.studentId}
                    </p>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      {r.startDate} → {r.endDate}
                    </p>
                  </div>
                  <span style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    color: "#fbbf24",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    fontSize: "12px", fontWeight: "700"
                  }}>Pending</span>
                </div>

                <div style={{
                  background: "#0f172a",
                  borderRadius: "10px", padding: "12px 14px",
                  marginBottom: "16px"
                }}>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                    "{r.reason}"
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleAction(r._id, "Approved")}
                    style={{
                      padding: "10px 20px",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#fff", border: "none",
                      borderRadius: "10px", fontSize: "14px",
                      fontWeight: "700", cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                  >✓ Approve</button>
                  <button
                    onClick={() => handleAction(r._id, "Rejected")}
                    style={{
                      padding: "10px 20px",
                      background: "rgba(239,68,68,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "10px", fontSize: "14px",
                      fontWeight: "700", cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                  >✕ Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {done.length > 0 && (
        <div>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>
            ✅ Already Reviewed
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {done.map((r, i) => {
              const s = statusConfig[r.status]
              return (
                <div key={i} style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: "700", color: "#f1f5f9", margin: "0 0 2px" }}>
                      {r.studentId}
                    </p>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                      {r.startDate} → {r.endDate} · {r.reason}
                    </p>
                  </div>
                  <span style={{
                    background: s.bg, border: `1px solid ${s.border}`,
                    color: s.color, padding: "5px 12px",
                    borderRadius: "100px", fontSize: "12px",
                    fontWeight: "700", flexShrink: 0
                  }}>{r.status}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </WardenLayout>
  )
}

export default WardenDashboard