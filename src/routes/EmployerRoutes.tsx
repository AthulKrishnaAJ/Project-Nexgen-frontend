import { Routes, Route } from "react-router-dom";
import SignupEmployerPage from "../pages/companyPages/SignupEmployerPage";


const EmployerRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="signup" element={<SignupEmployerPage/>}></Route>
            </Routes>
        </>
    )
}

export default EmployerRoutes