import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const demoJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    description: "Build modern UIs using React and Tailwind CSS.",
    position: 3,
    jobType: "Full Time",
    salary: 6,
    createdAt: new Date(),
    company: {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com",
    },
  },
  {
    _id: "2",
    title: "Backend Developer",
    description: "Develop scalable APIs using Node.js and MongoDB.",
    position: 2,
    jobType: "Remote",
    salary: 8,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    company: {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
    },
  },
  {
    _id: "3",
    title: "MERN Stack Developer",
    description: "End-to-end development using MERN stack.",
    position: 4,
    jobType: "Full Time",
    salary: 7,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    company: {
      name: "Flipkart",
      logo: "https://logo.clearbit.com/flipkart.com",
    },
  },
];



const Jobs = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 flex gap-6">
        {/* Left filter */}
        <div className="w-1/4">
          <FilterCard />
        </div>

        {/* Job list */}
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
