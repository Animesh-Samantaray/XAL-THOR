import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
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
];

const CategoryCarousel = () => {
  return (
    <section className="my-24">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Explore Top Job Categories
        </h2>
        <p className="text-gray-500 mt-2">
          Roles that are trending in today’s tech market
        </p>
      </div>

      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent className="-ml-2">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="
                    rounded-full
                    px-6 py-2
                    text-sm font-medium
                    bg-white
                    border border-gray-200
                    shadow-sm
                    transition-all duration-300
                    hover:bg-purple-600
                    hover:text-white
                    hover:border-purple-600
                    hover:shadow-md
                    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  "
                >
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hover:bg-gray-100" />
        <CarouselNext className="hover:bg-gray-100" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
