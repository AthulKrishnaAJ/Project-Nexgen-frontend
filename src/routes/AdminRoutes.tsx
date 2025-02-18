import {Routes, Route} from 'react-router-dom'
import AdminProtectedRoute from './protectedRoutes/AdminProtectedRoute'

//Pages
import LoginAdminPage from '../pages/adminPages/LoginAdminPage'

//Layouts and Outlets
import AdminLayout from '../pages/layouts/AdminLayout'
import DashboardAdmin from '../components/adminComponents/DashboardAdmin'
import SeekersListAdmin from '../components/adminComponents/SeekersListAdmin'
import CompaniesListAdmin from '../components/adminComponents/CompaniesListAdmin'


const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<LoginAdminPage/>}></Route>

                <Route element={<AdminProtectedRoute/>}>
                    <Route element={<AdminLayout/>}>
                        <Route path="/" element={<DashboardAdmin/>}></Route>
                        <Route path="seekers" element={<SeekersListAdmin/>}></Route>
                        <Route path="companies" element={<CompaniesListAdmin/>}></Route>

                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default AdminRoutes