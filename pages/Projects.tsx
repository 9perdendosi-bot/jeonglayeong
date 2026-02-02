import React from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Bordtennis Danmark",
    category: "Motion, App Design & Visual Identity",
    imageUrl: "https://picsum.photos/id/120/800/1000",
    year: "2024"
  },
  {
    id: 2,
    title: "Novafos",
    category: "Employer Branding & Illustration",
    imageUrl: "https://picsum.photos/id/110/800/1000",
    year: "2023"
  },
  {
    id: 3,
    title: "Danish Design Awards",
    category: "Infographics",
    imageUrl: "https://picsum.photos/id/250/800/1000",
    year: "2023"
  },
  {
    id: 4,
    title: "Villa Kultur",
    category: "3D & Social Media",
    imageUrl: "https://picsum.photos/id/314/800/1000",
    year: "2022"
  },
  {
    id: 5,
    title: "Abstract Forms",
    category: "Installation Art",
    imageUrl: "https://picsum.photos/id/338/800/1000",
    year: "2024"
  },
  {
    id: 6,
    title: "Silent Noise",
    category: "Sound & Sculpture",
    imageUrl: "https://picsum.photos/id/349/800/1000",
    year: "2022"
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Selected Works</h1>
          <p className="text-3xl md:text-5xl font-light">An archive of visual exploration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-4 bg-gray-100 aspect-[4/5] relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    {project.category}
                  </p>
                </div>
                <span className="text-xs font-mono text-gray-400">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}