import React from "react";
import { useSelector } from "react-redux";


//Components
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

//Types and interfaces
import { JobDetailProp } from "@/types/common/commonInterfaces";
import { RootState } from "@/types/common/commonTypes";


const JobDetailCard: React.FC<JobDetailProp> = ({job, buttons}) => {
    const seekerInfo = useSelector((state: RootState) => state.seeker?.seekerInfo)

    if (!job) return <p className="text-center text-gray-500">No job selected</p>;

    return (
        <Card className="w-full shadow-lg rounded-2xl p-2">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
        <div>
          <Avatar className="w-16 h-16">
                <AvatarImage src={job?.logo || "https://github.com/shadcn.png"} alt={job.companyName || "Company"} />
                <AvatarFallback>{job.companyName?.charAt(0) || "C"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-gray-400 font-normal">{job.companyName}</CardTitle>
          </div>
          </div>
          {seekerInfo && (
            <div className="mt-2 sm:mt-0">{buttons}</div>
          )}
        </CardHeader>
  
        {/* Job Details */}
        <CardContent className="space-y-3">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600 text-sm">{job.description}</p>
  
          
        <div>
          <h4 className="font-semibold mb-2">Skills Required:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="my-1">
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-700 text-sm">
                {job.state}, {job.district}
                </p>
            </div>
            <div className="my-1">
                <h4 className="font-semibold">Work Mode</h4>
                <p className="text-gray-700 text-sm">{job.workMode}</p>
            </div>
            <div className="my-1">
                <h4 className="font-semibold">Employment Type</h4>
                <p className="text-gray-700 text-sm">{job.employmentType}</p>
            </div>
            <div className="my-1">
                <h4 className="font-semibold">Salary Range</h4>
                <p className="text-gray-700 text-sm">
                ₹{job.salaryRange.min.toLocaleString()} - ₹{job.salaryRange.max.toLocaleString()}/month
                </p>
            </div>
        </div>
        
        <div>
            <h4 className="font-semibold">Requirements</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm">
                {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>
        </div>
        <div>
            <h4 className="font-semibold">Benefits</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm">
                {job.benefits.map((ben, index) => (
                    <li key={index}>{ben}</li>
                ))}
            </ul>
        </div>
        </CardContent>
  
      </Card>
    );
  };
  
  export default JobDetailCard;
