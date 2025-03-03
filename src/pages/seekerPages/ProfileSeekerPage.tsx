import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { formatDate } from '@/utils/dateFormation';



//Components
import ResumeUpload from '@/components/seekerComponents/ResumeUpload';
import SkillsAdd from '@/components/seekerComponents/SkillsAdd';
import { CommonComponentLoader } from '@/components/commonComponents/spinner';

//Api's
import { fetchSeekerDetailsService } from '@/apiServices/seekerApi';

//Styles and icons
import { FiEdit } from "react-icons/fi";
import { CiLocationOn, CiMail  } from "react-icons/ci";

//Types and Interfaces
import { RootState } from '@/types/common/commonTypes';
import { SeekerProfileDatas } from '@/types/seeker/seekerInterfaces';



const ProfileSeekerPage: React.FC = () => {

  const seekerInfo = useSelector((state: RootState) => state.seeker?.seekerInfo)
  const [activeSection, setActiveSection] = useState<string>('Skills');
  const [seekerData, setSeekerData] = useState<SeekerProfileDatas | null>(null)
  const [componentLoading, setComponentLoading] = useState<boolean>(true)

  const fetchSeeker = async () => {
    try {
        const response = await fetchSeekerDetailsService(seekerInfo?._id as string)
        if(response?.data){
            setSeekerData(response.data?.seekerData)
            console.log('SeekerData in profile page: ', response.data.seekerData)
            setTimeout(() => {
              setComponentLoading(false)
            }, 500)
        }
    } catch (error: any) {
        console.error('Error in fetching seeker detail in profile component: ', error.message)
    } 
}
  useEffect(() => {
    fetchSeeker()
  }, [])
  
  const handleUploadSuccess = () => {
    fetchSeeker()
  }

 
  const renderSection = () => {
    switch (activeSection) {
      case 'Skills':
        return <SkillsAdd
                seekerId={seekerInfo?._id!}
                allSkills={seekerData?.skills || []}
                onUploadSuccess={handleUploadSuccess}

                />;
      case 'Resumes':
        return <ResumeUpload 
                seekerId={seekerInfo?._id!}
                resumeFiles={seekerData?.resumeFiles || []}
                onUploadSuccess={handleUploadSuccess}
                />;
      default:
        return <SkillsAdd 
                seekerId={seekerInfo?._id!}
                allSkills={seekerData?.skills || []}
                onUploadSuccess={handleUploadSuccess}
                />;    
    }
  };


  return (
    <>
      {componentLoading ? (
        <div className='fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50'>
          <div className="absolute top-1/3">
            <CommonComponentLoader size={25}/>
          </div>
        </div>
      ) : (
      <div className="flex p-4 w-full h-1/2">
      <div className="w-1/3 bg-white p-6 shadow-md rounded-xl overflow-y-auto h-full">
      <div className="flex space-x-6">
        <img
          className="w-24 h-24 rounded-3xl object-cover border-2 border-gray-300"
          src="https://i.pinimg.com/736x/8e/01/bd/8e01bdd405c7ca524c1a345210a6e04d.jpg"
          alt="User profile"
        />

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">{`${seekerData?.firstName} ${seekerData?.lastName}`}</h1>
            <Link
              to="/editProfile"
              className="flex items-center space-x-1 text-gray-800 text-sm hover:text-themeColor-dark transition cursor-pointer"
            >
              <FiEdit />
              <span>Edit</span>
            </Link>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600">
              <CiMail className="text-md mr-2" />
              <span className='text-sm'>{seekerData?.email}</span>
            </div>
              {seekerData?.state && seekerData?.city && (
            <div className="flex items-center text-gray-600">
              <CiLocationOn className="text-md mr-2" />
              <span className='text-sm'>{`${seekerData?.state}, ${seekerData?.city}`}</span>
            </div>
              )}
          </div>
        </div>
      </div>

      {seekerData?.bio && (
        <div className='pt-4 border-b pb-4'>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
              <p className='text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-pre-wrap'>
                  {seekerData?.bio}
                  </p>
        </div>
      )}
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h2>
          <ul className="space-y-2 text-sm">
              <li>
                  <span className="font-medium text-gray-800">Mobile:</span> 
                  <span className="ml-2 text-gray-700">{seekerData?.mobile}</span>
              </li>
          
                  <li>
                      <span className="font-medium text-gray-800">Date of Birth:</span> 
                      <span className="ml-2 text-gray-700">
                          {seekerData?.dateOfBirth ? formatDate(seekerData?.dateOfBirth as string) : 'nill'}
                          </span>
                  </li>
                  {seekerData?.pincode && (
                      <li>
                          <span className="font-medium text-gray-800">Pincode:</span> 
                          <span className="ml-2 text-gray-700">{seekerData.pincode}</span>
                      </li>
                  )}
            
              {seekerData?.gender && (
                          <li>
                              <span className="font-medium text-gray-800">Gender:</span> 
                              <span className="ml-2 text-gray-700">{seekerData?.gender}</span>
                          </li>

              )}
    </ul>
        </div>
      </div>


      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md mx-6 rounded-xl h-auto p-4 overflow-y-auto">
          <ul className="flex justify-start space-x-4 p-1">
            {["Skills", "Resumes"].map((section) => (
              <li key={section}>
                <button
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeSection === section ? "text-themeColor underline underline-offset-4" : "text-gray-700"
                  }`}
                  onClick={() => setActiveSection(section)}
                  type='button'
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t p-6">{renderSection()}</div>
        </div>
      </div>

    </div>
      )}
  </>
  );
};

export default ProfileSeekerPage;
