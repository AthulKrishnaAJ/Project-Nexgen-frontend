import React from 'react'
import { MirageLoader } from '../spinner'
import { SubmitButtonProps } from '../../../types/common/commonTypes'

const SubmittButtonAdmin:React.FC<SubmitButtonProps> = ({loading, text}) => {
  return (
    <>
    <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm text-white font-semibold
                       rounded-md bg-gray-800 hover:bg-black focus:outline-none transition-colors">
                              {loading ? <MirageLoader size={60}/> : text}
                          </button>
    </>
  )
}

export default SubmittButtonAdmin
