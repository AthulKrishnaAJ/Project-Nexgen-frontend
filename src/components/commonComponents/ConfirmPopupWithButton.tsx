import React, { useState } from 'react'
import { Popconfirm, Button } from 'antd'

//Types and interfaces
import { ConfirmPopProps } from '../../types/common/commonTypes'



const ConfirmPopupWithButton: React.FC<ConfirmPopProps> = ({
    action, 
    description,
    buttonText,
    buttonColor,
    hoverClass,
    callback,
    data,
    buttonDisabler
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoding] = useState(false)

    const showPopconfirm = () => {
        setOpen(true)
    }

    const handleOk = () => {
        setConfirmLoding(true)

        if(data && action){
            callback(data, action)
        }
      setTimeout(() => {
        setConfirmLoding(false)
        setOpen(false)
      }, 3000)

    }

    const handleCancel = () => {
        setOpen(false)
    }

  return (
   
    <Popconfirm
      placement='topRight'
      title={action && action.charAt(0).toUpperCase() + action.slice(1)}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading, className: 'custom-ok-button'}}
      cancelButtonProps={{className: 'custom-cancel-button'}}
      onCancel={handleCancel}
    >
      <Button 
      className={`mr-4 px-3 py-1 font-medium text-white ${buttonColor} ${!buttonDisabler ? hoverClass || 'primary-btn' : ''}`}
      onClick={showPopconfirm}
      disabled={buttonDisabler}
      >
        {buttonText}
      </Button>
    </Popconfirm>
  )
}

export default ConfirmPopupWithButton
