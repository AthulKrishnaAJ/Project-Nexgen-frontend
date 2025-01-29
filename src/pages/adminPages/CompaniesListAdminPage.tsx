import React from 'react'

//Components
import CompaniesListAdmin from '../../components/adminComponents/CompaniesListAdmin'
import AdminHeader from "../../components/commonComponents/admin/AdminHeader"
import AdminSidebar from "../../components/commonComponents/admin/AdminSidebar"
// import './admin.css'

const CompaniesListAdminPage: React.FC = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-200'>
    <AdminHeader/>
    <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar/> 
        <main className='flex-1 p-4'>
        <CompaniesListAdmin/>
        </main>
       
    </div>
</div>
  )
}

export default CompaniesListAdminPage
