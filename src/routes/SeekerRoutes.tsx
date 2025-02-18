import { Routes, Route } from "react-router-dom";

import SeekerProtectedRoute from "./protectedRoutes/SeekerProtectedRoute";

//Files
import SignupSeekerPage from "../pages/seekerPages/SignupSeekerPage";
import OtpVerifyPage from "../pages/seekerPages/OtpVerificationPage";
import LoginSeekerPage from "../pages/seekerPages/LoginSeekerPage";
import ForgotPassowordVerifyEmailPage from "../pages/seekerPages/ForgotPassowordVerifyEmailPage";
import ChangePasswordPage from "../pages/seekerPages/ChangePasswordPage";



//Layout and components
import SeekerLayout from "@/pages/layouts/SeekerLayout";
import ProfileSeeker from "@/components/seekerComponents/ProfileSeeker";
import EditProfileSeeker from "@/components/seekerComponents/EditProfileSeeker";


const SeekerRoutes = () => {
    return (
      <>
        <Routes>
            <Route path="signup" element={<SignupSeekerPage/>}></Route>
            <Route path="otp" element={<OtpVerifyPage/>}></Route>
            <Route path="login" element={<LoginSeekerPage/>}></Route>
            <Route path="emailVerify" element={<ForgotPassowordVerifyEmailPage/>}></Route>
            <Route path="changePassword" element={<ChangePasswordPage/>}></Route>

            <Route  path='/' element={<SeekerLayout/>}>
              <Route element={<SeekerProtectedRoute/>}>
                <Route path="/profile" element={<ProfileSeeker/>}/>
                <Route path="/editProfile" element={<EditProfileSeeker/>}/>
              </Route>

            </Route>
        </Routes>
      </>
    )
}


export default SeekerRoutes