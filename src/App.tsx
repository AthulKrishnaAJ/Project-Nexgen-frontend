import { BrowserRouter, Routes, Route } from "react-router-dom"
import SeekerRoutes from "./routes/SeekerRoutes"
import EmployerRoutes from "./routes/EmployerRoutes"
import AdminRoutes from "./routes/AdminRoutes"



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SeekerRoutes/>}></Route> 
        <Route path="/employer/*" element={<EmployerRoutes/>}></Route>
        <Route path="/admin/*" element={<AdminRoutes/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
