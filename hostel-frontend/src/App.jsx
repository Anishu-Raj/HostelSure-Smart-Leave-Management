import { Routes, Route } from "react-router-dom"

import RoleSelect from "./pages/RoleSelect"
import StudentLogin from "./pages/StudentLogin"
import WardenLogin from "./pages/WardenLogin"
import StudentDashboard from "./pages/StudentDashboard"
import WardenDashboard from "./pages/WardenDashboard"
import ApplyLeave from "./pages/ApplyLeave"
import LeaveStatus from "./pages/LeaveStatus"
import MyQR from "./pages/MyQR"
import ApprovedLeaves from "./pages/ApprovedLeaves"
import LateReturns from "./pages/LateReturns"

function App(){
  return(
    <Routes>
      <Route path="/" element={<RoleSelect />}  />
      <Route path="/student-login" element={<StudentLogin/>} />
      <Route path="/warden-login" element={<WardenLogin />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/warden" element={<WardenDashboard />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/leave-status" element={<LeaveStatus />} />
      <Route path="/qr" element={<MyQR />} />
      <Route path="/approved" element={<ApprovedLeaves />} />
      <Route path="/late" element={<LateReturns />} />
    </Routes>
  )
}
export default App