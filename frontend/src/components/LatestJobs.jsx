import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 


const LatestJobs = () => {
    // const {allJobs} = useSelector(store=>store.job);
   const allJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    description: "Build responsive user interfaces using React and Tailwind CSS.",
    position: 3,
    jobType: "Full-time",
    salary: 6,
    company: {
      name: "TechNova",
    },
  },
  {
    _id: "2",
    title: "Backend Developer",
    description: "Design scalable APIs using Node.js, Express, and MongoDB.",
    position: 2,
    jobType: "Full-time",
    salary: 8,
    company: {
      name: "CodeBase Inc",
    },
  },
  {
    _id: "3",
    title: "MERN Stack Developer",
    description: "Work across frontend and backend using the MERN stack.",
    position: 4,
    jobType: "Internship",
    salary: 5,
    company: {
      name: "DevHub",
    },
  },
  {
    _id: "4",
    title: "UI/UX Designer",
    description: "Create intuitive user experiences and clean design systems.",
    position: 1,
    jobType: "Contract",
    salary: 7,
    company: {
      name: "PixelCraft",
    },
  },
  {
    _id: "5",
    title: "Data Scientist",
    description: "Analyze data and build predictive models using Python.",
    position: 2,
    jobType: "Full-time",
    salary: 12,
    company: {
      name: "DataWorks",
    },
  },
  {
    _id: "6",
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines and cloud infrastructure.",
    position: 1,
    jobType: "Full-time",
    salary: 10,
    company: {
      name: "CloudOps",
    },
  },
  {
    _id: "7",
    title: "Mobile App Developer",
    description: "Develop cross-platform mobile apps using React Native.",
    position: 2,
    jobType: "Full-time",
    salary: 9,
    company: {
      name: "AppForge",
    },
  },
  {
    _id: "8",
    title: "Machine Learning Engineer",
    description: "Build and deploy ML models for real-world problems.",
    position: 1,
    jobType: "Full-time",
    salary: 14,
    company: {
      name: "AI Labs",
    },
  },
];

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs