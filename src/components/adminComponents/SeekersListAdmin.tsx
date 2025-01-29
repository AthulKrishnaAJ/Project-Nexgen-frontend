import React, {useState, useEffect} from 'react'

//Files
import { getAllSeekersService, seekerBlockUnblockService } from '../../apiServices/adminApi'

//Components
import ListingTable from '../commonComponents/ListingTable'
import ConfirmPopup from '../commonComponents/ConfirmPopup'

//Types and interfaces
import { SeekerPrimaryType } from '../../types/admin/adminTypes'

//Styles and icons
import { toast } from 'sonner'





const SeekersListAdmin: React.FC = () => {
    const [userDatas, setUserData] = useState<SeekerPrimaryType[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllSeekersService()
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
            } catch (error: any) {
                console.error('Error in SeekerListAdmin component: ', error)
                toast.error('An unexpected error occur while finding all seekers')
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
            toast.error('An undexpected error occur while block or unblock seekers')
        }
    }

    const rowStyle = (user: SeekerPrimaryType): { textColor?: string } => ({
        textColor: user.status === 'Blocked' ? 'text-red-600' : 'text-gray-700',
      });



  return (
    <>
        <h1 className="text-2xl font-semibold font-rubik text-gray-700">Seeker Listing</h1>
  
        <div className='mt-4'>
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
                hoverColor: 'hover:bg-gray-800'
            }
           },
           {
            label: 'Unblock',
            callback: blockAndUnblock,
            condition: (user) => user.status === 'Blocked',
            buttonStyle: {
                bgColor: 'bg-themeColor',
                hoverColor: 'hover:hoverThemeColor'
            }
           }
        ]}
        rowStyle={rowStyle}
        />
        </div>
    </>
  )
}

export default SeekersListAdmin
