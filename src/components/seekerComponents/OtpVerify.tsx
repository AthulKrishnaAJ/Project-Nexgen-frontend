import React, {useState, useRef, useEffect} from "react";

//Api's
import { verifyOtp } from "../../apiServices/seekerApi";
import { resendOtp } from "../../apiServices/seekerApi";

//Types
import { VerifyOtpPayloads } from "../../types/seeker/seekerTypes";
import { keyboardEvent, formEvent } from "../../types/common/commonTypes";

//Styles and icons
import { Loader } from "../commonComponents/spinner";
import {toast} from 'sonner'


const OtpVerify: React.FC = (): React.ReactElement => {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
    const inputRef = useRef<(HTMLInputElement | null)[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(30)
    const [isTimerActive, setIsTimerActive] = useState<boolean>(true)
    

    useEffect(() => {
        if(inputRef.current[0]){
            inputRef.current[0].focus()
        }
    }, [])

    useEffect(() => {
        if(timer > 0 && isTimerActive){
            const countDown = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(countDown)
        }
        if(timer === 0){
            setIsTimerActive(false)
        }
    }, [timer, isTimerActive])

    
    
    const handleChange = (index: number, value: string) => {
        if(isNaN(Number(value))) return;
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)  

        if(value !== '' && index < 3){
            inputRef.current[index + 1]?.focus()
        }
    }


    const handleKeyDown = (index: number, e: keyboardEvent) => {
        if(e.key === 'Backspace' && otp[index] === '' && index > 0){
            inputRef.current[index - 1]?.focus()
        }
    }


    const handleSubmit = async (e: formEvent) => {
        e.preventDefault();
        const otpValue = otp.join('')
        const email = localStorage.getItem('userEmail')
        let isValid = true

        if(!email){
            setError('Email not found. Please signup again');
            isValid = false
            return
        
        }

        if(otpValue.length !== 4 || isNaN(Number(otpValue))){
            setError('Please enter 4 digit valid OTP')
            isValid = false
            return
        
        }

        if(!isTimerActive){
            toast.warning('OTP has expired. Please resend the otp!')
            isValid = false
            return
        }
       

        if(isValid){
            setLoading(true)
            setError(null)
            const payload: VerifyOtpPayloads = {email, otp: otpValue}
            console.log('Otp submitted at handleSubmit: ', payload)
            try {
                const result = await verifyOtp(payload)
                const {data} = result
                if(data.status){
                    toast.success(data.message)
                    setLoading(false)
                } else {
                    toast.error(data.message)
                }
           
            } catch (error: any) {
                console.log('Error in verify otp at verify otp handleSubmit: ', error.message)
                toast.error('An unexpected error occur')
            } 
        }

    }

    const handleResendOtp = async () => {
        setError(null)
        setOtp(['', '', '', ''])
        setTimer(30)
        setIsTimerActive(true)

        if(inputRef.current[0]){
            inputRef.current[0].focus()
        }
        try {
            const seekerEmail = localStorage.getItem('userEmail') as string
            const result = await resendOtp(seekerEmail)
            const {data} = result

            if(data.status){
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            console.log('Error in resend otp submission at handleResendOtp: ', error.message)
            toast.error('An unexpected error occur')
        }
    }
    
    
    
    return (
    <div className="bg-[#F0FBFA] min-h-screen font-rubik flex items-center justify-center">
 
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">Otp verification</h2>
                    <p className="mb-6 text-sm text-center text-gray-600 ">
                    Enter the 4-digit verification code that was sent to your email.
                    </p>
                    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-4 mb-4">
                        {
                           otp.map((digit, index) => (
                                <input 
                                type="text"
                                key={index} 
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(elem) => inputRef.current[index] = elem}
                                className=" w-12 h-12 text-black text-center text-2xl font-semibold border-b-2 border-gray-400 focus:border-[#24A484] focus:outline-none transition-colors"
                                />
                            ))
                        }
                    
                        </div>
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button 
                    type="submit"
                     className="bg-[#24A484] w-full mt-8 py-3 px-3 text-white rounded-md hover:bg-[#298872] transition-colors">
                        {loading ? <Loader size={18}/> : 'Verify Otp'}
                    </button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        {
                            isTimerActive ? (
                                <p>Resend OTP in <span className="text-[#24A484]">{timer}</span> seconds</p>
                            ) : (
                                <button 
                                onClick={handleResendOtp}
                                className="text-[#24A484]">
                                Resend OTP
                            </button>
                            )
                        }
                   
                    </div>
                </div>
           
            </div>
     
    </div>
    )
}

export default OtpVerify