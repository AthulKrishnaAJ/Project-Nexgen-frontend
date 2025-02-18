import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy components for the dynamic sections
const SkillSection = () => <div>Skill Section Content</div>;
const ResumeSection = () => <div>Resume Section Content</div>;
const PersonalInfoSection = () => <div>Personal Info Section Content</div>;

//Types and icons
import { FiEdit } from "react-icons/fi";

const ProfileSeeker: React.FC = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState<string>('skills');

  // Function to render the active section
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
    <div className="flex min-h-screen font-rubik">
    <div className="w-1/3 bg-white p-6 shadow-md rounded-lg h-1/2">
      <div className="flex">
        <img
          className="w-28 h-28 rounded-3xl object-cover mb-4 border-2 border-themeColor"
          src="https://i.pinimg.com/736x/8e/01/bd/8e01bdd405c7ca524c1a345210a6e04d.jpg"
          alt="User profile"
        />
        <div className='self-center mx-4'>
            <h1 className="text-2xl font-semibold text-gray-800">User Name</h1>
            <p className="text-gray-600 mt-2">user@example.com</p>
            <p className="text-gray-600">Location: City, Country</p>
        </div>
        <Link to='/editProfile'>
            <p className='mt-9 ml-6 cursor-pointer'>
                <FiEdit/>
            </p>
        </Link>
      </div>
      <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit obcaecati
         error expedita odio. Odit eaque sapiente impedit temporibus ea! Laudantium voluptas
          consectetur quaerat beatae ab mollitia corporis, deleniti obcaecati. Tempore.
          </p>
      </div>
      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Phone: +1 234 567 890</li>
          <li>Date of Birth: January 1, 1990</li>
          <li>Gender: Male</li>
          <li>Languages: English, Spanish</li>
        </ul>
      </div>
    </div>


    <div className="flex-1 flex flex-col">
      <div className="bg-white shadow-md mx-6 rounded-lg h-3/4">
        <ul className="flex justify-start space-x-4 p-1">
          {["skills", "resume", "personalInfo"].map((section) => (
            <li key={section}>
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === section ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
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
