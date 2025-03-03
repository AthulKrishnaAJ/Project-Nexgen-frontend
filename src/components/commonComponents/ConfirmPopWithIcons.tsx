import React, {useState} from 'react'
import { Popconfirm } from "antd";

interface ConfirmActionProps {
    callback: () => void;
    title: string;
    description: string;
    icon: JSX.Element
}

const ConfirmPopWithIcons: React.FC<ConfirmActionProps> = ({callback, title, description, icon}) => {
    const [confirmLoading, setConfirmLoding] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)


    const handleOk = () => {
        setConfirmLoding(true)
        callback()
        
      setTimeout(() => {
        setConfirmLoding(false)
        setOpen(false)
      }, 2000)

    }


    const showPopconfirm = () => {
        setOpen(true)
}
    const handleCancel = () => {
        setOpen(false)
    }


  return (
    <Popconfirm
    title={title}
    description={description}
    open={open}
    okText='Yes'
    cancelText='No'
    onConfirm={handleOk}
    okButtonProps={{ loading: confirmLoading, className: 'custom-ok-button'}}
    cancelButtonProps={{className: 'custom-cancel-button'}}
    onCancel={handleCancel}
    >
    <p className="text-red-500 cursor-pointer"
    onClick={showPopconfirm}
    >
        {icon}
      </p>
    </Popconfirm>
  )
}

export default ConfirmPopWithIcons


