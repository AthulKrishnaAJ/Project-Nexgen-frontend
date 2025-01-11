import { BrowserRouter, Routes, Route } from "react-router-dom"
import SeekerRoutes from "./routes/SeekerRoutes"



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SeekerRoutes/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
