import React, {useState, useEffect} from 'react'

//Files
import { getAllSeekersService, seekerBlockUnblockService } from '../../apiServices/adminApi'

//Components
import ListingTable from '../commonComponents/ListingTable'
import ComponentLoaderAdmin from '../commonComponents/admin/ComponentLoaderAdmin'

//Types and interfaces
import { SeekerPrimaryType } from '../../types/admin/adminTypes'

//Styles and icons
import {message} from 'antd'





const SeekersListAdmin: React.FC = () => {
    const [userDatas, setUserData] = useState<SeekerPrimaryType[]>([])
    const [componentLoading, setComponentLoading] = useState<boolean>(true)
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllSeekersService()
                if(response?.data?.status){
                    let buildData = response.data.userData.map((item: SeekerPrimaryType) => {
                        const {firstName, lastName, ...rest} = item
                        return {
                            ...rest,
                            name: `${firstName} ${lastName}`,
                            status: item.blocked ? 'Blocked' : 'Active'
                        }
                    })
                    console.log(buildData)
                    setUserData(buildData)
                }
            } catch (error: any) {
                console.error('Error in SeekerListAdmin component: ', error)
                message.error('An unexpected error occur while finding all seekers')
            } finally {
                setTimeout(() => {
                    setComponentLoading(false)
                }, 500)
            }
        }
        fetchUsers()
    }, [])

    const blockAndUnblock = async (row: SeekerPrimaryType, action: string) => {
        console.log('======>', row, action)
        try {
            const seekerId = row._id
            const response = await seekerBlockUnblockService(seekerId, action)
            if(response){
                const {status, userData} = response.data
                if(status){
                    message.success(`User has been ${action}ed`)
                    setUserData((prevData) => 
                       prevData.map((item) => 
                        item._id === seekerId ? {
                            ...item, blocked: userData.blocked,
                            status: userData.blocked ? 'Blocked' : 'Active',
                        } : item
                    )
                    )
                }
            }
        } catch (error: any) {
            console.error('Error in blockUnblock in SeekerListAdmin component: ', error.message)
            message.error('An undexpected error occur while block or unblock seekers')
        }
    }

    const rowStyle = (user: SeekerPrimaryType): { textColor?: string } => ({
        textColor: user.status === 'Blocked' ? 'text-red-600' : 'text-gray-700',
      });



  return (
    <>
        <h1 className="text-2xl font-semibold font-rubik text-gray-700">Seeker Listing</h1>
        <div className='mt-4'>
        {componentLoading ? (
            <div className='flex items-center justify-center h-[60vh] w-full'>
                <ComponentLoaderAdmin/>
            </div>
        ) : (
            <ListingTable
            data={userDatas}
            fields={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'mobile', label: 'Mobile' },
                { key: 'status', label: 'Status' },
            ]}
            actions={[
               {
                label: 'Block',
                callback: blockAndUnblock,
                condition: (user) => user.status === 'Active',
                buttonStyle: {
                    bgColor: 'bg-gray-700',
                    hoverClass:'secondary-btn'
                }
               },
               {
                label: 'Unblock',
                callback: blockAndUnblock,
                condition: (user) => user.status === 'Blocked',
                buttonStyle: {
                    bgColor: 'bg-themeColor',
                    
                }
               }
            ]}
            rowStyle={rowStyle}
            />
        )}

        </div>
    </>
  )
}

export default SeekersListAdmin
