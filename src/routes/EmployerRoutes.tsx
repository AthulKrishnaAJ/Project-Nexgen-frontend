import { Routes, Route } from "react-router-dom";
import CompanyProtectedRoute from "./protectedRoutes/CompanyProtectedRoute";

//Pages
import SignupEmployerPage from "../pages/companyPages/SignupEmployerPage";
import EmployerOtpVerificationPage from "../pages/companyPages/OtpVerificationEmployerPage";
import LoginEmployerPage from "../pages/companyPages/LoginEmployerPage";
import ForgotPasswordEmployerEmailVerifyPage from "../pages/companyPages/ForgotPasswordEmployerEmailVerifyPage";
import EmployerChangePasswordPage from "../pages/companyPages/EmployerChangePasswordPage";

//Layout and components
import CompanyLayout from "../pages/layouts/CompanyLayout";
import DashboardContentCompany from "../components/companyComponents/DashboardContentCompany";
import JobPostCompany from "../components/companyComponents/JobPostCompany";



const EmployerRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="signup" element={<SignupEmployerPage/>}></Route>
                <Route path="otp" element={<EmployerOtpVerificationPage/>}></Route>
                <Route path="login" element={<LoginEmployerPage/>}></Route>
                <Route path="emailVerify" element={<ForgotPasswordEmployerEmailVerifyPage/>}></Route>
                <Route path="changePassword" element={<EmployerChangePasswordPage/>}></Route>

                <Route element={<CompanyProtectedRoute/>}>
                    <Route element={<CompanyLayout/>}>
                        <Route path="/" element={<DashboardContentCompany/>}></Route>
                        <Route path="jobPost" element={<JobPostCompany/>}></Route>
                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default EmployerRoutes