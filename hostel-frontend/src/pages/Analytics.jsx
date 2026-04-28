import { useEffect, useState } from "react"

const S = {
  page: { minHeight: "100vh", background: "#0f172a", fontFamily: "'Nunito', sans-serif", padding: "28px 20px" },
  center: { maxWidth: 680, margin: "0 auto" },
  logo: { fontSize: 20, fontWeight: 800, color: "#6366f1", marginBottom: 2 },
  logoSpan: { color: "#f1f5f9" },
  title: { fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "2px 0 4px" },
  sub: { color: "#64748b", fontSize: 13, marginBottom: 24 },
  card: { background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: "24px", marginBottom: 20 },
  label: { fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px", display: "block" },
  val: (color) => ({ fontSize: 32, fontWeight: 800, color, margin: "0 0 4px" }),
  zone: (color) => ({
    display: "inline-block",
    background: `${color}20`,
    border: `1px solid ${color}40`,
    color,
    padding: "6px 16px",
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 700,
    marginTop: 8,
  }),
  barRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  barLabel: { fontSize: 12, color: "#94a3b8", minWidth: 64, textAlign: "right" },
  barTrack: { flex: 1, background: "#0f172a", borderRadius: 6, height: 28, position: "relative" },
  bar: (w, color) => ({
    width: `${Math.min(w, 100)}%`,
    height: "100%",
    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
    borderRadius: 6,
    transition: "width 0.6s ease",
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
  }),
  barVal: { fontSize: 12, color: "#fff", fontWeight: 700 },

  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 },
  statCard: { background: "#0f172a", borderRadius: 12, padding: "14px 16px" },
  statLabel: { fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px" },
  statVal: (c) => ({ fontSize: 22, fontWeight: 800, color: c, margin: 0 }),
}

const ZONE_COLORS = { Green: "#4ade80", Yellow: "#fbbf24", Red: "#f87171" }
const ZONE_DESC = {
  Green:  "Normal leave frequency. No restrictions.",
  Yellow: "Frequent leaves. Warden may review.",
  Red:    "Excessive leaves. Stricter approval required.",
}

export default function Analytics() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentId = localStorage.getItem("studentId")
    if (!studentId) return
    fetch(`http://localhost:5000/api/leaves/analytics/${studentId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#64748b" }}>Loading analytics...</p>
      </div>
    )
  }

  const { monthly, totalLeaves, zone } = data
  const zoneColor = ZONE_COLORS[zone] || "#4ade80"
  const monthEntries = Object.entries(monthly).sort()
  const maxVal = Math.max(...monthEntries.map(([, v]) => v), 1)
  const barColor = (v) => v >= 4 ? "#f87171" : v >= 2 ? "#fbbf24" : "#6366f1"

  return (
    <div style={S.page}>
      <div style={S.center}>
        <div style={S.logo}>Hostel<span style={S.logoSpan}>Sure</span></div>
        <h1 style={S.title}>Leave Analytics</h1>
        <p style={S.sub}>Your personal leave frequency report</p>

        {/* Zone card */}
        <div style={S.card}>
          <div style={S.statsRow}>
            <div style={S.statCard}>
              <p style={S.statLabel}>Total Leaves</p>
              <p style={S.statVal(zoneColor)}>{totalLeaves}</p>
            </div>
            <div style={S.statCard}>
              <p style={S.statLabel}>Active Months</p>
              <p style={S.statVal("#818cf8")}>{monthEntries.length}</p>
            </div>
            <div style={S.statCard}>
              <p style={S.statLabel}>Avg / Month</p>
              <p style={S.statVal("#a78bfa")}>{monthEntries.length ? (totalLeaves / monthEntries.length).toFixed(1) : 0}</p>
            </div>
          </div>

          <div style={{ background: "#0f172a", borderRadius: 14, padding: "18px 20px" }}>
            <p style={{ ...S.label, marginBottom: 8 }}>Your Zone Classification</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                <span style={S.zone(zoneColor)}>● {zone} Zone</span>
              </div>
              <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{ZONE_DESC[zone]}</p>
            </div>
          </div>
        </div>

        {/* Monthly chart */}
        <div style={S.card}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", margin: "0 0 18px" }}>
            Monthly Leave Frequency
          </p>
          {monthEntries.length === 0 && (
            <p style={{ color: "#475569", fontSize: 13 }}>No leave history yet.</p>
          )}
          {monthEntries.map(([month, count]) => (
            <div key={month} style={S.barRow}>
              <span style={S.barLabel}>{month}</span>
              <div style={S.barTrack}>
                <div style={S.bar((count / maxVal) * 100, barColor(count))}>
                  <span style={S.barVal}>{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone explanation */}
        <div style={S.card}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", margin: "0 0 14px" }}>
            Zone Classification Guide
          </p>
          {[
            { zone: "Green",  range: "0–4 leaves",  desc: "Normal. No restrictions apply." },
            { zone: "Yellow", range: "5–9 leaves",  desc: "Frequent. Warden may request additional review." },
            { zone: "Red",    range: "10+ leaves",  desc: "Excessive. Stricter warden approval required." },
          ].map(z => (
            <div key={z.zone} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <span style={S.zone(ZONE_COLORS[z.zone])}>{z.zone}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", margin: "0 0 2px" }}>{z.range}</p>
                <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{z.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}