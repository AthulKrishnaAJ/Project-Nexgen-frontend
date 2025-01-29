import {Routes, Route} from 'react-router-dom'
import LoginAdminPage from '../pages/adminPages/LoginAdminPage'
import DashboardAdminPage from '../pages/adminPages/DashBoardAdminPage'
import SeekerListAdminPage from '../pages/adminPages/SeekerListAdminPage'
import CompaniesListAdminPage from '../pages/adminPages/CompaniesListAdminPage'


const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<LoginAdminPage/>}></Route>
                <Route path="dashboard" element={<DashboardAdminPage/>}></Route>
                <Route path="seekers" element={<SeekerListAdminPage/>}></Route>
                <Route path="companies" element={<CompaniesListAdminPage/>}></Route>
            </Routes>
        </>
    )
}

export default AdminRoutes