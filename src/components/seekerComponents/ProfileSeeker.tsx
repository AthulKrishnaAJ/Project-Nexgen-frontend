import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




import { formatDate } from '@/utils/dateFormation';

// Dummy components for the dynamic sections
const SkillSection = () => <div>Skill Section Content</div>;
const ResumeSection = () => {
    return (
        <div className="">
            resume
        </div>
    )
}
const PersonalInfoSection = () => <div>Personal Info Section Content</div>;

//Api's
import { fetchSeekerDetailsService } from '@/apiServices/seekerApi';

//Styles and icons
import { FiEdit } from "react-icons/fi";
import { CiLocationOn, CiMail  } from "react-icons/ci";

//Types and Interfaces
import { RootState } from '@/types/common/commonTypes';
import { SeekerProfileDatas } from '@/types/seeker/seekerInterfaces';


const ProfileSeeker: React.FC = () => {

  const seekerInfo = useSelector((state: RootState) => state.seeker?.seekerInfo)
  const [activeSection, setActiveSection] = useState<string>('skills');
  const [seekerData, setSeekerData] = useState<SeekerProfileDatas | null>(null)

  useEffect(() => {
        const fetchSeeker = async () => {
            try {
                const response = await fetchSeekerDetailsService(seekerInfo?._id as string)
                if(response?.data){
                    setSeekerData(response.data?.seekerData)
                }
            } catch (error: any) {
                console.error('Error in fetching seeker detail in profile component: ', error.message)
            }
        }
        fetchSeeker()
  }, [])
  

 
  const renderSection = () => {
    switch (activeSection) {
      case 'skills':
        return <SkillSection />;
      case 'resume':
        return <ResumeSection />;
      case 'personalInfo':
        return <PersonalInfoSection />;
      default:
        return <SkillSection />;    
    }
  };


  return (

    <div className="flex p-4 font-rubik">
    <div className="w-1/3 bg-white p-6 shadow-md rounded-lg h-1/2">
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
                    <span className="font-medium text-gray-800">Pincode:</span> 
                    <span className="ml-2 text-gray-700">{seekerData?.pincode || '___'}</span>
                </li>
           
         
                <li>
                    <span className="font-medium text-gray-800">Date of Birth:</span> 
                    <span className="ml-2 text-gray-700">
                        {seekerData?.dateOfBirth ? formatDate(seekerData?.dateOfBirth as string) : '___'}
                        </span>
                </li>
    
            <li>
                <span className="font-medium text-gray-800">Gender:</span> 
                <span className="ml-2 text-gray-700">{seekerData?.gender || '___'}</span>
            </li>
  </ul>
      </div>
    </div>


    <div className="flex-1 flex flex-col">
      <div className="bg-white shadow-md mx-6 rounded-lg h-2/3">
        <ul className="flex justify-start space-x-4 p-1">
          {["skills", "resume", "personalInfo"].map((section) => (
            <li key={section}>
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === section ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection(section)}
              >
                
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t p-4">{renderSection()}</div>
      </div>
    </div>

  </div>
  );
};

export default ProfileSeeker;
