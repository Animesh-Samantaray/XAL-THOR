import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const user=false;
  const navigate=useNavigate();
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-14">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center  gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* <li><Link>Home</Link></li>
                        <li><Link>Jobs</Link></li>
                        <li><Link>Browse</Link></li> */}
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

{
  !user ? (
   <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
  ):(

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
             <div>
                <Avatar className='cursor-pointer '>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
             </Avatar>
             <h4 className="font-medium">Animesh</h4>
             </div>
            </PopoverContent>
          </Popover>)
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
