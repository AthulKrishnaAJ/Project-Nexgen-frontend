import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../types/common/commonTypes"

const AdminProtectedRoute = () => {

    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo)
    console.log('Admin info from Admin protect route: ', adminInfo)
    if(!adminInfo || adminInfo.role !== 'admin'){
        return <Navigate to='/admin/login' replace/>
    }
    return <Outlet/>
}

export default AdminProtectedRoute
