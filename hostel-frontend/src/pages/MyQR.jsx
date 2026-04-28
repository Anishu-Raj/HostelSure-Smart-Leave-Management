import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import StudentLayout from "../layouts/StudentLayout"

function MyQR() {
  const [approvedLeave, setApprovedLeave] = useState(null)
  const [loading, setLoading] = useState(true)

  const studentId = localStorage.getItem("studentId")
  const studentName = localStorage.getItem("studentName")

  useEffect(() => {
    fetch(`http://localhost:5000/api/leaves/${studentId}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(l => l.status === "Approved")
        setApprovedLeave(found)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const qrValue = `HOSTELSURE|${studentId}|${approvedLeave?._id}`

  return (
    <StudentLayout>
      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px" }}>
        Exit QR Pass 📱
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 28px" }}>
        Show this to the gate guard when leaving hostel
      </p>

      {loading && <p style={{ color: "#94a3b8" }}>Checking your leaves...</p>}

      {!loading && !approvedLeave && (
        <div style={{
          background: "#fff", borderRadius: "20px",
          padding: "48px 32px", textAlign: "center",
          border: "1px solid #e2e8f0", maxWidth: "380px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
          <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#1e293b", margin: "0 0 8px" }}>
            No QR Pass Available
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
            Apply for leave and wait for warden approval to get your gate pass.
          </p>
        </div>
      )}

      {!loading && approvedLeave && (
        <div style={{
          background: "#fff", borderRadius: "20px",
          padding: "32px", maxWidth: "360px",
          textAlign: "center",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 32px rgba(99,102,241,0.12)"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "100px", padding: "5px 14px", marginBottom: "10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#16a34a" }}>Leave Approved ✓</span>
          </div>

          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "6px 0 4px" }}>
            {studentName}
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 20px" }}>
            {approvedLeave.startDate} → {approvedLeave.endDate}
          </p>

          <div style={{
            background: "#f8fafc", borderRadius: "16px",
            padding: "20px", display: "inline-block",
            marginBottom: "16px",
            border: "2px solid #e2e8f0"
          }}>
            <QRCodeSVG value={qrValue} size={180} />
          </div>

          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>
            Show this to the gate guard 👮
          </p>
          <p style={{ fontSize: "10px", color: "#cbd5e1", margin: 0, fontFamily: "monospace", wordBreak: "break-all" }}>
            {qrValue}
          </p>
        </div>
      )}
    </StudentLayout>
  )
}

export default MyQR