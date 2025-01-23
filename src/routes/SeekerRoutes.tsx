import { Routes, Route } from "react-router-dom";

//Files
import SignupSeekerPage from "../pages/seekerPages/SignupSeekerPage";
import OtpVerifyPage from "../pages/seekerPages/OtpVerificationPage";
import LoginSeekerPage from "../pages/seekerPages/LoginSeekerPage";
import ForgotPassowordVerifyEmailPage from "../pages/seekerPages/ForgotPassowordVerifyEmailPage";
import ChangePasswordPage from "../pages/seekerPages/ChangePasswordPage";


const SeekerRoutes = () => {
    return (
      <>
        <Routes>
            <Route path="signup" element={<SignupSeekerPage/>}></Route>
            <Route path="otp" element={<OtpVerifyPage/>}></Route>
            <Route path="login" element={<LoginSeekerPage/>}></Route>
            <Route path="emailVerify" element={<ForgotPassowordVerifyEmailPage/>}></Route>
            <Route path="changePassword" element={<ChangePasswordPage/>}></Route>
        </Routes>
      </>
    )
}


export default SeekerRoutes