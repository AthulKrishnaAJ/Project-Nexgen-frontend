import { BrowserRouter, Routes, Route } from "react-router-dom"
import SeekerRoutes from "./routes/SeekerRoutes"
import EmployerRoutes from "./routes/EmployerRoutes"



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SeekerRoutes/>}></Route> 
        <Route path="/employer/*" element={<EmployerRoutes/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
