import React from "react";

import { SeekerProfileDatas } from "../seeker/seekerInterfaces";

export interface JobsRuleType {
    _id: string;
    title: string;
    description: string;
    state: string;
    district: string;
    employmentType: 'Full-time' | 'Part-time' | 'Internship';
    workMode: 'On-site' | 'Hybrid' | 'Remote';
    salaryRange: {min: string, max: string};
    experience: {min: string, max: string};
    skills: string[];
    requirements: string[];
    benefits: string[];
    jobApplications?: string[] | [];
    companyId: string;
    status?: 'open' | 'closed'
    companyName?: string;
    createdAt?: string;
    updatedAt?: string;
    logo?: string;

}

export interface JobPropsToCard {
    job: {
        _id: string;
        companyName?: string;
        logo?: string;
        title: string;
        state: string;
        district: string;
        workMode: string;
        salaryRange: {
            min: string;
            max: string;
        }
        timeAgo?: string;

    }
    buttons?: React.ReactNode
}

export interface CompanyAllDetailsState {
    _id: string;
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    state: string;
    district: string;
    verify:string;
    blocked: boolean;
    rejection: {
        reason: string | null;
        expiryDate: Date | string | null;
    }
    createdAt: string | Date;
    updatedAt: string | Date
    __v: number
}

export interface CompanyDataToCard {
    company: {
        _id: string;
        companyName: string;
        industry: string;
        state: string;
        district: string;
        verify: string;
    }
    buttons?: React.ReactNode
}

export interface JobDetailProp {
    job: JobsRuleType
    buttons: React.ReactNode
}

export interface ApplicationModalProp {
    isOpen: boolean;
    selectedJob: JobsRuleType;
    onClose: () => void
    seekerData: SeekerProfileDatas;
}

export interface GoogleAuthProps {
    role: string
}

export interface GoogleAuthServiceProps {
    credential: string;
    clientId: string;
    selectBy: string;
}


export const skills = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Go", "Ruby", "PHP", "Swift", "Kotlin", "Rust", "Dart",

    "React.js", "Next.js", "Vue.js", "Angular", "Svelte", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "SASS/SCSS", "Redux", "Zustand",
  
    // Backend Development
    "Node.js", "Express.js", "NestJS", "Django", "Flask", "Spring Boot", "Ruby on Rails", "ASP.NET Core", "GraphQL", "REST API", "FastAPI",
  
    // Databases
    "MongoDB", "MySQL", "PostgreSQL", "MariaDB", "SQLite", "Firebase", "Redis", "Cassandra", "DynamoDB", "Neo4j", "Elasticsearch",
  
    // DevOps & Cloud
    "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Google Cloud", "CI/CD", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible", "Serverless", "Nginx", "Apache",
  
    // Mobile Development
    "Flutter", "React Native", "SwiftUI", "Jetpack Compose", "Ionic", "Xamarin", "Cordova",
  
    // Cybersecurity
    "Ethical Hacking", "Penetration Testing", "Cryptography", "Network Security", "SOC Analyst", "SIEM", "OWASP", "Endpoint Security",
  
    // Machine Learning & AI
    "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Deep Learning", "Computer Vision", "AI Model Deployment", "LLMs", "LangChain",
  
    // Data Science & Analytics
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "SQL for Data Analysis", "Power BI", "Tableau", "ETL", "BigQuery",
  
    // Blockchain & Web3
    "Solidity", "Ethereum", "Smart Contracts", "NFT Development", "DeFi", "Web3.js", "IPFS", "Hyperledger",
  
    // Game Development
    "Unity", "Unreal Engine", "Cocos2d", "Godot", "Blender (for 3D modeling)", "OpenGL", "DirectX",
  
    // Software Testing & QA
    "Selenium", "Cypress", "Jest", "Mocha", "Chai", "Appium", "Load Testing", "Unit Testing", "Integration Testing",
  
    // Networking & System Administration
    "Linux", "Windows Server", "Cisco Networking", "Routing & Switching", "Network Troubleshooting", "Active Directory", "DNS", "Firewall Management",
  
    // UI/UX & Product Design
    "Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Design Thinking", "A/B Testing", "Interaction Design", "Usability Testing", "Accessibility (WCAG)", "Visual Hierarchy", "User Persona Creation", "Microinteractions", "Material Design", "iOS Human Interface Guidelines", "Webflow", "Framer", "Zeplin", "Lottie Animations", "Dark Mode UI", "Responsive Design",
  
    // Graphic Design
    "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "CorelDRAW", "Affinity Designer", "GIMP", "Canva", "Gravit Designer", "Vector Graphics", "Logo Design", "Typography", "Color Theory", "Brand Identity Design", "Print Design", "Packaging Design", "Illustration", "Digital Painting", "Raster Graphics", "3D Design", "Motion Graphics", "Adobe After Effects", "Adobe Premiere Pro", "Final Cut Pro", "Cinema 4D", "Blender",
  
    // Web & Mobile App Design
    "HTML & CSS for Designers", "Mobile App UI", "Web UI", "Landing Page Design", "Neumorphism", "Glassmorphism", "Brutalism UI", "Minimalist Design", "Conversion Rate Optimization",
  
    // Branding & Marketing Design
    "Social Media Design", "Marketing Graphics", "Print Advertising", "Infographics", "Presentation Design (PowerPoint/Keynote)", "Email Newsletter Design", "Ebook & Magazine Layouts",
  
    // Soft Skills & Business
    "Creative Thinking", "Communication", "Client Management", "Time Management", "Design Thinking", "Problem Solving", "Collaboration with Developers", "Storytelling with Design", "Agile Methodologies", "Scrum", "Project Management", "Technical Writing"
  ];
  
 
  


