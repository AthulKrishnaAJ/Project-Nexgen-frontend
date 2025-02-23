import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../types/common/commonTypes"

const SeekerProtectedRoute = () => {
    const seekerInfo = useSelector((state: RootState) => state.seeker?.seekerInfo)
    if(!seekerInfo || seekerInfo.role !== 'user'){
        return <Navigate to='/login' replace/>

    }
    return <Outlet/>
}

export default SeekerProtectedRoute
