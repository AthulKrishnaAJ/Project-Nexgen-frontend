import DashboardAdmin from "../../components/adminComponents/DashboardAdmin"

//Components
import AdminHeader from "../../components/commonComponents/admin/AdminHeader"
import AdminSidebar from "../../components/commonComponents/admin/AdminSidebar"

const DashboardAdminPage = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-200'>
    <AdminHeader/>
    <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar/> 
        <main className="flex-1 p-4">
        <DashboardAdmin/>
        </main>
    </div>
</div>
  )
}

export default DashboardAdminPage
