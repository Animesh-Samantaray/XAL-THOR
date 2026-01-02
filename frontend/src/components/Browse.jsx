import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';

const randomJobs=[1,22,2,3];

const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-1'>Search res {randomJobs.length}</h1>
        <div className='grid grid-cols-3 gap-4'>
            {
            randomJobs.map((job,index)=>{
                return (
                    <Job/>
                )
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
