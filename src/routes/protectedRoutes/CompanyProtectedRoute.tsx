import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../types/common/commonTypes"

const CompanyProtectedRoute = () => {
    const companyInfo = useSelector((state: RootState) => state.company.employerInfo)

    if(!companyInfo || companyInfo.role !== 'company'){
        return <Navigate to='/employer/login' replace/>

    }
    return <Outlet/>
}

export default CompanyProtectedRoute
