import { Routes, Route } from "react-router-dom";

import SeekerProtectedRoute from "./protectedRoutes/SeekerProtectedRoute";

//Pages
import SignupSeekerPage from "../pages/seekerPages/SignupSeekerPage";
import OtpVerifyPage from "../pages/seekerPages/OtpVerificationPage";
import LoginSeekerPage from "../pages/seekerPages/LoginSeekerPage";
import ForgotPassowordVerifyEmailPage from "../pages/seekerPages/ForgotPassowordVerifyEmailPage";
import ChangePasswordPage from "../pages/seekerPages/ChangePasswordPage";

//Layout and components and pages
import SeekerLayout from "@/pages/layouts/SeekerLayout";
import EditProfileSeeker from "@/components/seekerComponents/EditProfileSeeker";
import HomeSeekerPage from "@/pages/seekerPages/HomeSeekerPage";
import ProfileSeekerPage from "@/pages/seekerPages/ProfileSeekerPage";
import JoblistingSeekerPage from "@/pages/seekerPages/JoblistingSeekerPage";




const SeekerRoutes = () => {
    return (
      <>
        <Routes>
            <Route path="signup" element={<SignupSeekerPage/>}></Route>
            <Route path="otp" element={<OtpVerifyPage/>}></Route>
            <Route path="login" element={<LoginSeekerPage/>}></Route>
            <Route path="emailVerify" element={<ForgotPassowordVerifyEmailPage/>}></Route>
            <Route path="changePassword" element={<ChangePasswordPage/>}></Route>

            <Route element={<SeekerLayout/>}>
            <Route path='/' element={<HomeSeekerPage/>}/>
            <Route path='/jobs' element={<JoblistingSeekerPage/>}/>

              <Route element={<SeekerProtectedRoute/>}>
                <Route path="/profile" element={<ProfileSeekerPage/>}/>
                <Route path="/editProfile" element={<EditProfileSeeker/>}/>
              </Route>

            </Route>
        </Routes>
      </>
    )
}


export default SeekerRoutes