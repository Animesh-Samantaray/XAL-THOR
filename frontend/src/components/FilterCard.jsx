import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'
const fitlerData = [
  {
    filterType: "Location",
    array: [
      "Bhubaneswar",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi NCR",
      "Noida",
      "Gurgaon",
      "Kolkata",
      "Chennai",
      "Remote"
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "MERN Stack Developer",
      "Mobile App Developer",
      "Data Scientist",
      "Machine Learning Engineer",
      "DevOps Engineer",
      "Cloud Engineer",
      "UI/UX Designer",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0 – 3 LPA",
      "3 – 6 LPA",
      "6 – 10 LPA",
      "10 – 15 LPA",
      "15+ LPA",
    ],
  },
  
];


const FilterCard = () => {
     
    
   
    
  return (
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup >
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
  )
}

export default FilterCard
