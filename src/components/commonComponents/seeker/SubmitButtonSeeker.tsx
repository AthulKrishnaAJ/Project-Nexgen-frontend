import React from 'react'
import { MirageLoader } from '../spinner'
import { SubmitButtonProps } from '../../../types/common/commonTypes'

const SubmitButtonSeeker: React.FC<SubmitButtonProps> = ({loading, text}) => {
  return (
    <>
        <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm text-white font-semibold
         rounded-md bg-[#24A484] hover:bg-[#298872] focus:outline-none transition-colors">
                {loading ? <MirageLoader size={60}/> : text}
            </button>
    </>
    
  )
}

export default SubmitButtonSeeker
