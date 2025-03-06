import React, {useState, useRef, useEffect} from 'react'

//Api's
import { uploadResumeService, deleteResumeService } from '@/apiServices/seekerApi';


//Components
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MirageLoader } from '../commonComponents/spinner';
import ConfirmPopWithIcons from '../commonComponents/ConfirmPopWithIcons';

//Types and interfaces
import { changeEvent } from '@/types/common/commonTypes';
import { ResumeProps } from '@/types/seeker/seekerInterfaces';

//Styles and icons
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import {toast} from 'sonner'


const ResumeUpload: React.FC<ResumeProps> = ({seekerId, resumeFiles, onUploadSuccess}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [fileUrls, setFileUrls] = useState<{fileKey: string; url: string}[]>([])

    useEffect(() => {
        if(resumeFiles.length > 0){
            const urls = resumeFiles.map(file => {
                const byteCharacters = atob(file.base64)
                const byteArrays = []
                for(let i = 0; i < byteCharacters.length; i++){
                    byteArrays.push(byteCharacters.charCodeAt(i))
                }
                const byteArray = new Uint8Array(byteArrays)
                const blob = new Blob([byteArray], {type: "application/pdf" });
                return {fileKey: file.fileKey, url: URL.createObjectURL(blob)}
            })
            setFileUrls(urls)
        }
    }, [resumeFiles])


    const handleFileChange = (event: changeEvent) => {
        const file = event.target.files?.[0]
        if(file){
            if(file.type !== 'application/pdf'){
                setError('Only PDF files are allowed!')
                return;
            }
            setError(null)
            setSelectedFile(file)
        }

    }

    const handleUpload = async () => {
        if(!selectedFile){
            setError('Please select a file to upload!')
            return;
        }
        try {
            setButtonLoading(true)
            const formData = new FormData()
            formData.append('resume', selectedFile)
            formData.append('seekerId', seekerId)

            const response = await uploadResumeService(formData)
            console.log('Success response in resume upload componenet: ', response)
            if(response?.data?.status){
                toast.success(response.data.message)

                if(fileInputRef.current){
                    fileInputRef.current.value = ''
                }
                onUploadSuccess();
            }
        } catch (error: any) {
            console.error('Error in uploading resume in resume component: ', error)
            toast.error('An unexpected error occur')
        } finally {
            setButtonLoading(false)
        }
      
    }

    const handleDelete = async (fileName: string) => {
        try {
            const data = {seekerId, fileName}
            const response = await deleteResumeService(data)
            console.log('Response after deleting resume: ', response)
            if(response?.data?.status){
                onUploadSuccess()
            }
        } catch (error: any) {
            console.error('Error in deleting resume in ResumeUpload component: ', error.message)
        }
    }


  return (
    <div className='w-full'>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Upload Resume</h2>
        <div className='flex items-center justify-between space-x-4 border p-3 rounded-lg bg-gray-50'>
            <Input type='file' ref={fileInputRef} onChange={handleFileChange} className='w-1/2'/> 
            <Button
                className="bg-themeColor hover:bg-hoverThemeColor text-white px-4 py-2 rounded-lg flex items-center"
                onClick={handleUpload}
            >
                {buttonLoading ? (
                    <MirageLoader size={70}/>
                ) : (
                    <>
                        <AiOutlineCloudUpload/> upload
                    </>
                )}
            </Button>   
        </div>
        {error && (
            <p className='text-red-500 text-xs'>{error}</p>
        )}


        <div className='mt-14'>
            <h3 className="text-md font-medium text-gray-700 mb-4">Your Resumes</h3>
            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4'>
  
                    {fileUrls.length > 0 ? (
                        fileUrls.map((file, index) => (
                            <div key={index} className='flex items-center justify-between border shadow-lg p-3 rounded-md bg-gray-100'>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                               {file.fileKey.split('/').pop()}
                            </a>
                            <ConfirmPopWithIcons
                            callback={() => handleDelete(file.fileKey)}
                            title='Delete'
                            description='Are you want to delete this ?'
                            icon={<AiOutlineDelete/>}
                            />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">No resumes uploaded yet.</p>
                    )}
    
            </div>
        </div>
    </div>
  )
}

export default ResumeUpload
