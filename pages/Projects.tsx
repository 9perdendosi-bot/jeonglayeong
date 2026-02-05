
import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  path: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Facing the divided a",
    category: "Installation Art",
    imageUrl: "https://i.imgur.com/zcICRjS.jpeg",
    path: "/facing-the-divided-a"
  },
  {
    id: 2,
    title: "Project Archive 02",
    category: "Visual Exploration",
    imageUrl: "", // Placeholder
    path: "#"
  },
  {
    id: 3,
    title: "Project Archive 03",
    category: "3D & Motion",
    imageUrl: "", // Placeholder
    path: "#"
  },
  {
    id: 4,
    title: "Project Archive 04",
    category: "Installation",
    imageUrl: "", // Placeholder
    path: "#"
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-[5%] py-[2rem] md:py-[4rem]">
        
        {/* Header Section (Hyundai Originals style) */}
        <div className="mb-[2.5rem] md:mb-[4rem]">
          <h1 className="font-bold tracking-tight text-black mb-[0.75rem] text-[clamp(1.8rem,4vw,3rem)]">
            Selected Works
          </h1>
          <p className="text-gray-500 font-medium text-[clamp(0.875rem,1.5vw,1.125rem)]">
            예술적 본질과 이미지의 경계를 탐구하는 기록들
          </p>
        </div>

        {/* Responsive Grid (Mobile Focused) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1rem] md:gap-[2rem]">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={project.path}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
            >
              {/* Thumbnail Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                {project.imageUrl ? (
                  <OptimizedImage
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    imgClassName="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[clamp(0.6rem,1vw,0.75rem)] text-gray-300 uppercase tracking-widest font-mono p-4 text-center">
                    Coming Soon
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Card Label Section */}
              <div className="p-[0.75rem] md:p-[1.25rem] flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-black group-hover:text-gray-600 transition-colors leading-tight text-[clamp(0.8125rem,1.2vw,1rem)]">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
