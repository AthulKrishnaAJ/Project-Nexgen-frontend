import { Routes, Route } from "react-router-dom";
import SignupEmployerPage from "../pages/companyPages/SignupEmployerPage";
import EmployerOtpVerificationPage from "../pages/companyPages/OtpVerificationEmployerPage";
import LoginEmployerPage from "../pages/companyPages/LoginEmployerPage";
import ForgotPasswordEmployerEmailVerifyPage from "../pages/companyPages/ForgotPasswordEmployerEmailVerifyPage";
import EmployerChangePasswordPage from "../pages/companyPages/EmployerChangePasswordPage";


const EmployerRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="signup" element={<SignupEmployerPage/>}></Route>
                <Route path="otp" element={<EmployerOtpVerificationPage/>}></Route>
                <Route path="login" element={<LoginEmployerPage/>}></Route>
                <Route path="emailVerify" element={<ForgotPasswordEmployerEmailVerifyPage/>}></Route>
                <Route path="changePassword" element={<EmployerChangePasswordPage/>}></Route>
            </Routes>
        </>
    )
}

export default EmployerRoutes