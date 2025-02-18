import React from 'react'
import { Outlet } from 'react-router-dom'

//Components
import AdminHeader from '../../components/commonComponents/admin/AdminHeader'
import AdminSidebar from '../../components/commonComponents/admin/AdminSidebar'

const AdminLayout: React.FC = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-200'>
    <AdminHeader/>
    <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar/> 
        <main className='flex-1 p-4'>
        <Outlet/>
        </main>
       
    </div>
</div>
  )
}

export default AdminLayout
