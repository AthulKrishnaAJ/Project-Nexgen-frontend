import React, { useState } from 'react'
import { Popconfirm, Button } from 'antd'

interface ConfirmPopProps {
    action?: string;
    description?: string
    buttonText?: string;
    buttonColor: string;
    buttonHoverColor:string;
    callback: (row: any, action: string) => void;
    data?:any

}

const ConfirmPopup: React.FC<ConfirmPopProps> = ({
    action, 
    description,
    buttonColor,
    buttonHoverColor,
    callback,
    data
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
        setConfirmLoding(false)
        setOpen(false)

    }


    const handleCancel = () => {
        setOpen(false)
    }

  return (
   
    <Popconfirm
      placement='topRight'
      title={action}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button 
      className={`mr-4 px-3 py-1 font-medium text-white ${buttonColor} ${buttonHoverColor}`}
      onClick={showPopconfirm}
      >
        {action}
      </Button>
    </Popconfirm>
  )
}

export default ConfirmPopup
