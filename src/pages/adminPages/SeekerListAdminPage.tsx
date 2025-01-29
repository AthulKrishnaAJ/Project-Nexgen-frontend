
import React from "react"


//Components
import SeekersListAdmin from "../../components/adminComponents/SeekersListAdmin"
import AdminHeader from "../../components/commonComponents/admin/AdminHeader"
import AdminSidebar from "../../components/commonComponents/admin/AdminSidebar"
// import './admin.css'
const SeekerListAdminPage: React.FC = () => {

  return (
    <div className='flex flex-col h-screen bg-gray-200'>
    <AdminHeader/>
    <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar/> 
        <main className='flex-1 p-4'>
        <SeekersListAdmin/>
        </main>
       
    </div>
</div>
  )
}

export default SeekerListAdminPage
