import React from 'react'
import { MirageLoader } from '../spinner'
import { SubmitButtonProps } from '../../../types/common/commonTypes'


const SubmitButton: React.FC<SubmitButtonProps> = ({loading, text}) => {
  return (
    <>
    <button 
        type="submit" 
        className="w-full py-2.5 px-4 text-sm tracking-wider rounded-md text-white focus:outline-none relative overflow-hidden group"
    >
        <span className="relative z-10">{loading ? <MirageLoader size={60}/> : text}</span>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-500 group-hover:opacity-0 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
    </>
  )
}

export default SubmitButton
