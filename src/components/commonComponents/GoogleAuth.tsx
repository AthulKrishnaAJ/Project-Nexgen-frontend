import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

//Types and interfaces
import { GoogleAuthProps, GoogleAuthServiceProps } from '@/types/common/commonInterfaces'
import { AppDispatch } from '@/types/common/commonTypes'

//Api's
import { seekerGoogleAuthAction } from '@/redux/actions/seekerActions'

//Styles and icons
import {toast} from 'sonner'


const GoogleAuth: FC<GoogleAuthProps> = ({ role }) => {

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {

                    const data: GoogleAuthServiceProps = {
                        credential: credentialResponse.credential!,
                        clientId: credentialResponse.clientId!,
                        selectBy: credentialResponse.select_by!,
                    }

                    if (role === 'user') {
                        const response = await dispatch(seekerGoogleAuthAction(data))
                        console.log('Success response: ', response)
                        navigate('/')
                    } else {
                        const response = ''
                    }
                    
    
                }}
                onError={() => {
                    console.error('Error in google auth')
                    toast.error('An error occurd')
                }}
            />


        </GoogleOAuthProvider>
    )
}

export default GoogleAuth
