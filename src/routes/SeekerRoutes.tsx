import { Routes, Route } from "react-router-dom";
//Files
import SignupSeekerPage from "../pages/seekerPages/SignupSeekerPage";
import OtpVerifyPage from "../pages/seekerPages/OtpVerificationPage";
import LoginSeekerPage from "../pages/seekerPages/LoginSeekerPage";


const SeekerRoutes = () => {
    return (
      <>
        <Routes>
            <Route path="signup" element={<SignupSeekerPage/>}></Route>
            <Route path="otp" element={<OtpVerifyPage/>}></Route>
            <Route path="login" element={<LoginSeekerPage/>}></Route>
        </Routes>
      </>
    )
}


export default SeekerRoutes