import { useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"

function GateScanner() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const startScanner = () => {
    setStarted(true)
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } })
    scanner.render(
      async (decodedText) => {
        scanner.clear()
        const parts = decodedText.split("|")
        if (parts.length !== 3 || parts[0] !== "HOSTELSURE") {
          setMessage("error")
          return
        }
        const leaveId = parts[2]
        const studentId = parts[1]
        setLoading(true)
        try {
          const res = await fetch(`http://localhost:5000/api/leaves/exit/${leaveId}`, {
            method: "PUT", headers: { "Content-Type": "application/json" }
          })
          const data = await res.json()
          setMessage(data.message === "Exit recorded" ? `success|${studentId}` : "error")
        } catch {
          setMessage("error")
        }
        setLoading(false)
      },
      () => {}
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      display: "flex", alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      padding: "24px"
    }}>
      <div style={{
        background: "#fff", borderRadius: "24px",
        padding: "40px 36px", width: "100%",
        maxWidth: "420px", textAlign: "center",
        boxShadow: "0 24px 64px rgba(0,0,0,0.15)"
      }}>
        <div style={{ width: "64px", height: "64px", background: "#f0fdf4", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 16px" }}>
          🚪
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px" }}>
          Gate Scanner
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
          Sarojini Hostel — Exit Gate
        </p>

        {!started && !message && (
          <button
            onClick={startScanner}
            style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff", border: "none",
              borderRadius: "12px", fontSize: "15px",
              fontWeight: "700", cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 16px rgba(34,197,94,0.35)"
            }}
          >
            📷 Start Camera Scanner
          </button>
        )}

        {started && !message && !loading && (
          <div>
            <div id="qr-reader" style={{ width: "100%" }} />
            <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "12px" }}>
              Hold student QR in front of camera
            </p>
          </div>
        )}

        {loading && (
          <p style={{ color: "#f59e0b", fontSize: "14px", fontWeight: "600" }}>
            Recording exit...
          </p>
        )}

        {message === "error" && (
          <div>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
              <p style={{ fontSize: "28px", margin: "0 0 8px" }}>❌</p>
              <p style={{ color: "#dc2626", fontWeight: "700", fontSize: "14px", margin: 0 }}>
                Invalid QR Code. Please try again.
              </p>
            </div>
            <button onClick={() => { setMessage(""); setStarted(false) }} style={{ padding: "10px 20px", background: "#eef2ff", color: "#6366f1", border: "1px solid #e0e7ff", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Try Again
            </button>
          </div>
        )}

        {message.startsWith("success") && (
          <div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <p style={{ fontSize: "40px", margin: "0 0 10px" }}>✅</p>
              <p style={{ color: "#16a34a", fontWeight: "800", fontSize: "18px", margin: "0 0 4px" }}>
                Exit Recorded!
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                Have a safe journey! 👋
              </p>
            </div>
            <button onClick={() => { setMessage(""); setStarted(false) }} style={{ padding: "10px 20px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Scan Next Student
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GateScanner