import { useEffect, useState } from "react"
import WardenLayout from "../layouts/WardenLayout"

function WardenDashboard() {
  const [requests, setRequests] = useState([])
  const [allLeaves, setAllLeaves] = useState([])
  const [selected, setSelected] = useState(null)
  const [studentInfo, setStudentInfo] = useState(null)
  const [studentLeaveHistory, setStudentLeaveHistory] = useState([])
  const [callStarted, setCallStarted] = useState(false)
  const [callConnected, setCallConnected] = useState(false)
  const [parentResponse, setParentResponse] = useState(null)
  const [newEndDate, setNewEndDate] = useState("")

  const FREQUENT_LIMIT = 3 

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => {
    fetch("http://localhost:5000/api/leaves/all")
      .then(res => res.json())
      .then(data => {
        setRequests(data)
        setAllLeaves(data)
      })
      .catch(err => console.log(err))
  }

  const getMonthlyLeaveCount = (studentId) => {
    const now = new Date()
    const thisMonth = allLeaves.filter(l => {
      if (l.studentId !== studentId) return false
      if (l.status === "Pending" || l.status === "Rejected") return false
      const d = new Date(l.startDate)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    return thisMonth.length
  }

  const getTotalLeaveCount = (studentId) => {
    return allLeaves.filter(l =>
      l.studentId === studentId && l.status !== "Rejected"
    ).length
  }

  const isFrequent = (studentId) => {
    return getMonthlyLeaveCount(studentId) >= FREQUENT_LIMIT
  }

  const openLeave = async (leave) => {
    setSelected(leave)
    setStudentInfo(null)
    setStudentLeaveHistory([])
    setCallStarted(false)
    setCallConnected(false)
    setParentResponse(null)
    setNewEndDate(leave.requestedEndDate || "")

    const res = await fetch(`http://localhost:5000/api/students/${leave.studentId}`)
    const data = await res.json()
    setStudentInfo(data)

    const leavesRes = await fetch(`http://localhost:5000/api/leaves/${leave.studentId}`)
    const leavesData = await leavesRes.json()
    setStudentLeaveHistory(leavesData)
  }

  const handleApprove = async () => {
    const res = await fetch(`http://localhost:5000/api/leaves/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" })
    })
    await res.json()
    const updated = { ...selected, status: "Approved" }
    setRequests(prev => prev.map(r => r._id === selected._id ? updated : r))
    setSelected(updated)
  }

  const handleReject = async (reason = "") => {
    const res = await fetch(`http://localhost:5000/api/leaves/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Rejected", rejectReason: reason })
    })
    await res.json()
    const updated = { ...selected, status: "Rejected", extendRequested: false }
    setRequests(prev => prev.map(r => r._id === selected._id ? updated : r))
    setSelected(updated)
  }

  const handleApproveExtension = async () => {
    if (!newEndDate) { alert("Please select a new end date"); return }
    const res = await fetch(`http://localhost:5000/api/leaves/extend-approve/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEndDate })
    })
    const data = await res.json()
    if (data.message === "Extension approved") {
      const updated = { ...selected, extendRequested: false, endDate: newEndDate, status: "Approved", requestedEndDate: "" }
      setRequests(prev => prev.map(r => r._id === selected._id ? updated : r))
      setSelected(updated)
    }
  }

  const handleRejectExtension = async () => {
    const res = await fetch(`http://localhost:5000/api/leaves/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Rejected" })
    })
    await res.json()
    const updated = { ...selected, status: "Rejected", extendRequested: false }
    setRequests(prev => prev.map(r => r._id === selected._id ? updated : r))
    setSelected(updated)
  }

  const markReturned = async (leaveId, e) => {
    e.stopPropagation()
    const res = await fetch(`http://localhost:5000/api/leaves/return/${leaveId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    if (data.message === "Return recorded") fetchAll()
  }

  const startCall = () => {
    setCallStarted(true)
    setCallConnected(false)
    setParentResponse(null)
    setTimeout(() => setCallConnected(true), 2500)
  }

  const parentPressed = (key) => setParentResponse(key)

  const getStatusStyle = (status) => {
    if (status === "Approved") return { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" }
    if (status === "Rejected") return { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" }
    if (status === "Returned") return { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" }
    return { bg: "#fefce8", color: "#ca8a04", border: "#fde047" }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const pending = requests.filter(r => r.status === "Pending" && !r.extendRequested)
  const extendReqs = requests.filter(r => r.extendRequested === true && r.status !== "Rejected")
  const reviewed = requests.filter(r => r.status !== "Pending" && !r.extendRequested)
  const lateStudents = requests.filter(r => {
    if (r.status !== "Approved") return false
    const end = new Date(r.endDate)
    end.setHours(0, 0, 0, 0)
    return end < today && !r.returnTime
  })

  const getDaysLate = (endDate) => {
    const end = new Date(endDate)
    return Math.floor((today - end) / (1000 * 60 * 60 * 24))
  }
  const card = (extra = {}) => ({
    background: "#fff", borderRadius: "14px",
    padding: "18px 22px", marginBottom: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    ...extra
  })
  if (selected) {
    const s = getStatusStyle(selected.status)
    const monthCount = getMonthlyLeaveCount(selected.studentId)
    const totalCount = getTotalLeaveCount(selected.studentId)
    const frequent = monthCount >= FREQUENT_LIMIT

    return (
      <WardenLayout>
        <button
          onClick={() => { setSelected(null); setStudentInfo(null) }}
          style={{
            background: "none", border: "none",
            color: "#6366f1", fontSize: "14px",
            fontWeight: "600", cursor: "pointer",
            padding: 0, marginBottom: "18px",
            fontFamily: "Poppins, sans-serif"
          }}
        >
          ← Back to all requests
        </button>

        <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px" }}>
          Leave Request Detail
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 22px" }}>
          Review all details carefully before taking action
        </p>
        {frequent && (
          <div style={{
            background: "#fff7ed", border: "2px solid #fed7aa",
            borderRadius: "14px", padding: "16px 20px",
            marginBottom: "14px"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>⚠️</span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: "800", color: "#c2410c", margin: "0 0 4px" }}>
                  Frequent Leave Alert!
                </p>
                <p style={{ fontSize: "13px", color: "#92400e", margin: "0 0 8px" }}>
                  This student has taken <strong>{monthCount} leaves this month</strong> and <strong>{totalCount} total approved leaves</strong>. This exceeds the recommended limit of {FREQUENT_LIMIT} per month.
                </p>
                <p style={{ fontSize: "12px", color: "#b45309", margin: 0 }}>
                  It is recommended to reject this leave request and inform the student.
                </p>
              </div>
            </div>
          </div>
        )}
        {studentInfo && (
          <div style={card()}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 14px" }}>
              Student Details
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {[
                ["Name", studentInfo.name],
                ["Student ID", studentInfo.studentId],
                ["Course", studentInfo.course],
                ["Mobile", studentInfo.mobile],
                ["Room No.", studentInfo.room],
                ["Hostel", studentInfo.hostel],
              ].map(([label, value], i) => (
                <div key={i}>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 2px", fontWeight: "600", textTransform: "uppercase" }}>{label}</p>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", margin: 0 }}>{value || "—"}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "12px" }}>
              <div style={{
                flex: 1, background: frequent ? "#fff7ed" : "#f0fdf4",
                borderRadius: "10px", padding: "10px 14px",
                border: `1px solid ${frequent ? "#fed7aa" : "#bbf7d0"}`
              }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 2px", fontWeight: "600", textTransform: "uppercase" }}>
                  This Month
                </p>
                <p style={{ fontSize: "20px", fontWeight: "800", color: frequent ? "#c2410c" : "#16a34a", margin: 0 }}>
                  {monthCount}
                  <span style={{ fontSize: "12px", fontWeight: "600", marginLeft: "4px" }}>
                    / {FREQUENT_LIMIT} limit
                  </span>
                </p>
              </div>
              <div style={{ flex: 1, background: "#f8fafc", borderRadius: "10px", padding: "10px 14px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 2px", fontWeight: "600", textTransform: "uppercase" }}>
                  Total Approved
                </p>
                <p style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", margin: 0 }}>
                  {totalCount}
                </p>
              </div>
              <div style={{ flex: 1, background: "#f8fafc", borderRadius: "10px", padding: "10px 14px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 2px", fontWeight: "600", textTransform: "uppercase" }}>
                  Status
                </p>
                <p style={{ fontSize: "13px", fontWeight: "800", color: frequent ? "#c2410c" : "#16a34a", margin: 0 }}>
                  {frequent ? "🔴 Frequent" : "🟢 Normal"}
                </p>
              </div>
            </div>
          </div>
        )}
        <div style={card()}>
          <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 14px" }}>
            Leave Details
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 3px", fontWeight: "600", textTransform: "uppercase" }}>From</p>
              <p style={{ fontSize: "20px", fontWeight: "800", color: "#6366f1", margin: 0 }}>{selected.startDate}</p>
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 3px", fontWeight: "600", textTransform: "uppercase" }}>To</p>
              <p style={{ fontSize: "20px", fontWeight: "800", color: "#6366f1", margin: 0 }}>{selected.endDate}</p>
            </div>
          </div>
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "600", textTransform: "uppercase" }}>Reason</p>
          <p style={{ fontSize: "14px", color: "#1e293b", margin: 0 }}>{selected.reason}</p>
        </div>
        {selected.extendRequested && selected.status !== "Rejected" && (
          <div style={{ ...card(), border: "2px solid #ddd6fe", background: "#faf5ff" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px" }}>
              Extension Request
            </p>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 6px" }}>
              Student has not reached hostel and wants to extend leave.
            </p>
            {selected.requestedEndDate && (
              <p style={{ fontSize: "14px", color: "#7c3aed", fontWeight: "700", margin: "0 0 14px" }}>
                Student requested new end date: {selected.requestedEndDate}
              </p>
            )}
            <p style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "600", textTransform: "uppercase", margin: "0 0 8px" }}>
              Approve Till (New End Date)
            </p>
            <input
              type="date"
              value={newEndDate}
              min={selected.endDate}
              onChange={e => setNewEndDate(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px",
                border: "2px solid #ddd6fe", borderRadius: "10px",
                fontSize: "14px", outline: "none",
                boxSizing: "border-box", marginBottom: "14px",
                fontFamily: "Poppins, sans-serif", background: "#fff"
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleApproveExtension}
                style={{
                  flex: 1, padding: "12px",
                  background: newEndDate ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#e2e8f0",
                  color: newEndDate ? "#fff" : "#94a3b8",
                  border: "none", borderRadius: "10px",
                  fontSize: "14px", fontWeight: "700",
                  cursor: newEndDate ? "pointer" : "not-allowed",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Approve Extension
              </button>
              <button
                onClick={handleRejectExtension}
                style={{
                  flex: 1, padding: "12px",
                  background: "#fef2f2", color: "#dc2626",
                  border: "2px solid #fecaca",
                  borderRadius: "10px", fontSize: "14px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Reject Extension
              </button>
            </div>
          </div>
        )}

        {studentInfo && selected.status === "Pending" && !selected.extendRequested && (
          <div style={card()}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 14px" }}>
              Parent Verification — Call
            </p>

            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "14px",
              background: "#f8fafc", borderRadius: "10px", padding: "12px 14px"
            }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>
                  {studentInfo.parent}
                </p>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  📱 {studentInfo.parentMobile}
                </p>
              </div>
              {!callStarted && (
                <button
                  onClick={startCall}
                  style={{
                    padding: "9px 18px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff", border: "none",
                    borderRadius: "10px", fontSize: "13px",
                    fontWeight: "700", cursor: "pointer",
                    fontFamily: "Poppins, sans-serif"
                  }}
                >
                  📞 Call Parent
                </button>
              )}
            </div>

            {callStarted && !callConnected && (
              <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "28px", margin: "0 0 8px" }}>📞</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#0369a1", margin: "0 0 4px" }}>
                  Calling {studentInfo.parent}...
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  Please wait while the call connects
                </p>
              </div>
            )}

            {callConnected && parentResponse === null && (
              <div>
                <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px", padding: "14px", marginBottom: "14px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#0369a1", margin: "0 0 4px" }}>
                    Call connected to {studentInfo.parent}
                  </p>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                    Message: "Your ward {selected.studentName} wants leave from {selected.startDate} to {selected.endDate}. Press 1 if aware, Press 0 if not aware."
                  </p>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 10px", textAlign: "center", fontWeight: "600" }}>
                  Waiting for parent response...
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => parentPressed("1")}
                    style={{
                      flex: 1, padding: "20px 16px",
                      background: "#f0fdf4", color: "#16a34a",
                      border: "2px solid #bbf7d0",
                      borderRadius: "12px", fontSize: "28px",
                      fontWeight: "800", cursor: "pointer",
                      fontFamily: "Poppins, sans-serif", textAlign: "center"
                    }}
                  >
                    1
                    <p style={{ fontSize: "12px", margin: "4px 0 0", fontWeight: "600" }}>Yes, I am aware</p>
                  </button>
                  <button
                    onClick={() => parentPressed("0")}
                    style={{
                      flex: 1, padding: "20px 16px",
                      background: "#fef2f2", color: "#dc2626",
                      border: "2px solid #fecaca",
                      borderRadius: "12px", fontSize: "28px",
                      fontWeight: "800", cursor: "pointer",
                      fontFamily: "Poppins, sans-serif", textAlign: "center"
                    }}
                  >
                    0
                    <p style={{ fontSize: "12px", margin: "4px 0 0", fontWeight: "600" }}>No, not aware</p>
                  </button>
                </div>
              </div>
            )}

            {parentResponse === "1" && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "18px", margin: "0 0 6px" }}>✅</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#16a34a", margin: "0 0 2px" }}>
                  Parent pressed 1 — Aware of leave
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  You can now approve this leave.
                </p>
              </div>
            )}

            {parentResponse === "0" && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "18px", margin: "0 0 6px" }}>❌</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#dc2626", margin: "0 0 2px" }}>
                  Parent pressed 0 — Not aware of leave
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  Please reject this leave request.
                </p>
              </div>
            )}
          </div>
        )}


        {selected.status === "Pending" && !selected.extendRequested && (
          <div style={card()}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px" }}>
              Take Action
            </p>

            {!parentResponse && !frequent && (
              <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#854d0e", marginBottom: "12px" }}>
                Please call and verify with parent first.
              </div>
            )}

            {frequent && (
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#c2410c", marginBottom: "12px", fontWeight: "600" }}>
                ⚠️ This student is taking frequent leaves. Consider rejecting with a reason.
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleApprove}
                disabled={parentResponse !== "1" || frequent}
                style={{
                  flex: 1, padding: "13px",
                  background: parentResponse === "1" && !frequent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "#e2e8f0",
                  color: parentResponse === "1" && !frequent ? "#fff" : "#94a3b8",
                  border: "none", borderRadius: "10px",
                  fontSize: "15px", fontWeight: "700",
                  cursor: parentResponse === "1" && !frequent ? "pointer" : "not-allowed",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Approve Leave
              </button>
              <button
                onClick={() => handleReject(frequent ? "Frequent leave limit exceeded" : "")}
                style={{
                  flex: 1, padding: "13px",
                  background: frequent ? "#fef2f2" : "#fef2f2",
                  color: "#dc2626",
                  border: "2px solid #fecaca",
                  borderRadius: "10px", fontSize: "15px",
                  fontWeight: "700", cursor: "pointer",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Reject Leave
              </button>
            </div>

            {parentResponse === "0" && (
              <p style={{ fontSize: "12px", color: "#dc2626", margin: "8px 0 0", textAlign: "center" }}>
                Parent is not aware — please reject this leave.
              </p>
            )}
          </div>
        )}

        {selected.status !== "Pending" && !selected.extendRequested && (
          <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "12px", padding: "14px 18px", fontSize: "14px", fontWeight: "700", color: s.color }}>
            {selected.status === "Approved" && "✅ Leave is approved."}
            {selected.status === "Rejected" && "❌ Leave is rejected."}
            {selected.status === "Returned" && "🏠 Student has returned to hostel."}
          </div>
        )}

      </WardenLayout>
    )
  }
  return (
    <WardenLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px" }}>
        Leave Requests 📬
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 22px" }}>
        {pending.length} pending · {requests.length} total
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: requests.length, color: "#6366f1", bg: "#eef2ff" },
          { label: "Pending", value: pending.length, color: "#ca8a04", bg: "#fefce8" },
          { label: "Approved", value: requests.filter(r => r.status === "Approved").length, color: "#16a34a", bg: "#f0fdf4" },
          { label: "Late", value: lateStudents.length, color: "#dc2626", bg: "#fef2f2" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: "12px", padding: "16px", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 4px", fontWeight: "700", textTransform: "uppercase" }}>{s.label}</p>
            <p style={{ fontSize: "26px", fontWeight: "800", color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {lateStudents.length > 0 && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "14px 18px", marginBottom: "18px" }}>
          <p style={{ fontSize: "14px", fontWeight: "700", color: "#dc2626", margin: "0 0 6px" }}>
            ⚠️ {lateStudents.length} student{lateStudents.length > 1 ? "s have" : " has"} not returned yet!
          </p>
          {lateStudents.map((l, i) => (
            <p key={i} style={{ fontSize: "13px", color: "#64748b", margin: "2px 0" }}>
              • {l.studentName || l.studentId} — due {l.endDate} · {getDaysLate(l.endDate)} day{getDaysLate(l.endDate) > 1 ? "s" : ""} late
            </p>
          ))}
        </div>
      )}

      {extendReqs.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>
            Extension Requests ({extendReqs.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {extendReqs.map((r, i) => (
              <div
                key={i}
                onClick={() => openLeave(r)}
                style={{
                  background: "#fff", border: "2px solid #ddd6fe",
                  borderRadius: "14px", padding: "14px 18px",
                  cursor: "pointer", display: "flex",
                  justifyContent: "space-between", alignItems: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#7c3aed"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ddd6fe"}
              >
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>
                    {r.studentName || r.studentId}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                    Current: {r.endDate}{r.requestedEndDate ? ` · Requested: ${r.requestedEndDate}` : ""}
                  </p>
                </div>
                <span style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ddd6fe", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: "700" }}>
                  Extend
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pending.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>
            Pending Approval ({pending.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {pending.map((r, i) => {
              const freq = isFrequent(r.studentId)
              return (
                <div
                  key={i}
                  onClick={() => openLeave(r)}
                  style={{
                    background: "#fff",
                    border: `2px solid ${freq ? "#fed7aa" : "#e0e7ff"}`,
                    borderRadius: "14px", padding: "14px 18px",
                    cursor: "pointer", display: "flex",
                    justifyContent: "space-between", alignItems: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = freq ? "#f97316" : "#6366f1"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = freq ? "#fed7aa" : "#e0e7ff"}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                        {r.studentName || r.studentId}
                      </p>
                      {freq && (
                        <span style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "2px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: "700" }}>
                          Frequent Leaves
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      {r.startDate} → {r.endDate} · {r.reason}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ background: "#fefce8", color: "#ca8a04", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: "700" }}>
                      Pending
                    </span>
                    <span style={{ color: "#cbd5e1" }}>›</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {lateStudents.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>
            Late Returns
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {lateStudents.map((r, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #fecaca",
                borderRadius: "14px", padding: "14px 18px",
                display: "flex", justifyContent: "space-between",
                alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
              }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>
                    {r.studentName || r.studentId}
                  </p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                    Due: {r.endDate} · {getDaysLate(r.endDate)} day{getDaysLate(r.endDate) > 1 ? "s" : ""} late
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); alert(`Calling parent of ${r.studentName || r.studentId}`) }}
                    style={{ padding: "7px 14px", background: "#eef2ff", color: "#6366f1", border: "1px solid #e0e7ff", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}
                  >
                    📞 Call
                  </button>
                  <button
                    onClick={(e) => markReturned(r._id, e)}
                    style={{ padding: "7px 14px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}
                  >
                    Returned
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <p style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>
            Already Reviewed
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {reviewed.map((r, i) => {
              const s = getStatusStyle(r.status)
              return (
                <div
                  key={i}
                  onClick={() => openLeave(r)}
                  style={{
                    background: "#fff", border: "1px solid #e2e8f0",
                    borderRadius: "12px", padding: "12px 16px",
                    cursor: "pointer", display: "flex",
                    justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: "0 0 2px" }}>
                      {r.studentName || r.studentId}
                    </p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      {r.startDate} → {r.endDate}
                    </p>
                  </div>
                  <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: "700" }}>
                    {r.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "40px", margin: "0 0 10px" }}>🎉</p>
          <p style={{ color: "#94a3b8" }}>No leave requests right now!</p>
        </div>
      )}

    </WardenLayout>
  )
}

export default WardenDashboard