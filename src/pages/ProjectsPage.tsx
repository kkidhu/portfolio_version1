import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Github, Calendar, Users, Play, Award } from 'lucide-react';
import ImageOverlay from '../components/ImageOverlay';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  video?: string;
  date: string;
  team?: string;
  role: string;
  details: string;
  achievements: string[];
  images: string[];
}

const ProjectsPage: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);
  
  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#ffffff',
    cardBg: '#28292a',
    cardBorder: 'transparent',
    linkColor: '#8ab4f8',
    mutedText: '#9aa0a6',
    tagBg: '#5f6368',
    tagText: '#e8eaed',
    buttonBg: '#5f6368',
    buttonText: '#e8eaed'
  };

  const projects: Project[] = [
    {
      id: 'medsync',
      title: 'MedSync — Secure Medical Records Platform',
      description: 'A comprehensive healthcare platform with secure medical records management, featuring intuitive interfaces for doctors, patients, and administrators.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'JWT'],
      liveDemo: 'https://medsync-demo.example.com',
      github: 'https://github.com/kidhurshan/medsync',
      date: 'Nov 2024',
      team: 'Team of 4',
      role: 'Frontend Developer',
      details: 'As the Frontend Developer, I designed intuitive interfaces for doctors, patients, and admins using React, TypeScript, and Tailwind CSS. I implemented key features like an analytics dashboard, security verification system, and real-time access logs. This platform achieved 100% audit trail coverage and full HIPAA compliance, streamlining the healthcare workflow across roles.',
      achievements: [
        '100% audit trail coverage',
        'Full HIPAA compliance',
        'Real-time access logs',
        'Multi-role dashboard system',
        'Security verification system'
      ],
      images: [
        'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=300'
      ]
    },
    {
      id: 'attendance-system',
      title: 'Student Attendance Management System',
      description: 'A university-wide attendance tracking system with multi-role dashboards, real-time notifications, and comprehensive analytics.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Chart.js'],
      liveDemo: 'https://attendance-demo.example.com',
      github: 'https://github.com/kidhurshan/attendance-system',
      date: 'Sep 2024',
      team: 'Solo Project',
      role: 'Full-Stack Developer',
      details: 'I developed a university-wide attendance system from scratch using HTML5, CSS3, JavaScript, PHP, and MySQL. The system supports multi-role dashboards, real-time notifications, and visual analytics. It dramatically reduced manual work for staff and improved engagement through automated processes and student feedback loops.',
      achievements: [
        'Reduced manual work by 80%',
        'Real-time notification system',
        'Visual analytics dashboard',
        'Multi-role access control',
        'Automated attendance tracking'
      ],
      images: [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300'
      ]
    },
    {
      id: 'meetly',
      title: 'Meetly — Real-Time Peer-to-Peer Video Conferencing',
      description: 'A custom-built WebRTC application for secure, low-latency video calls with advanced features like adaptive layouts and real-time chat.',
      technologies: ['React', 'Vite', 'Node.js', 'WebRTC', 'WebSockets', 'STUN'],
      liveDemo: 'https://meetly-demo.example.com',
      github: 'https://github.com/kidhurshan/meetly',
      video: 'https://youtube.com/watch?v=meetly-demo',
      date: 'Aug 2024',
      team: 'Solo Project',
      role: 'Full-Stack Developer & Architect',
      details: 'Meetly is a custom-built WebRTC application for secure, low-latency video calls, using React, Vite, Node.js, WebSockets, and STUN. As the Full-Stack Developer & Architect, I built the full stack, from room generation and adaptive layouts to chat and media controls. Meetly delivers <200ms latency and was praised for its simplicity and performance.',
      achievements: [
        '<200ms latency achieved',
        'Secure P2P connections',
        'Adaptive video layouts',
        'Real-time chat integration',
        'Cross-platform compatibility'
      ],
      images: [
        'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=300'
      ]
    },
    {
      id: 'ar-ai-game',
      title: 'AR AI Game — Unity-based Mixed Reality Experience',
      description: 'An innovative mobile AR game featuring adaptive AI bots, procedural world interactions, and spatial puzzles using Unity and AR Foundation.',
      technologies: ['Unity', 'C#', 'AR Foundation', 'Blender', 'FMOD', 'Visual Scripting'],
      liveDemo: 'https://play.google.com/store/apps/details?id=com.kidhurshan.argame',
      github: 'https://github.com/kidhurshan/ar-ai-game',
      video: 'https://youtube.com/watch?v=ar-game-demo',
      date: 'Jul 2024',
      team: 'Solo Project',
      role: 'Unity Developer & Game Designer',
      details: 'As a Solo Unity Developer, I built a mobile AR game using Unity Visual Scripting, AR Foundation, Blender, and FMOD. The game features adaptive AI bots, procedural world interactions, and spatial puzzles. By optimizing performance and deploying across Android and iOS, I created a unique and engaging AR experience that showcases real-world navigation and virtual logic.',
      achievements: [
        'Cross-platform AR deployment',
        'Adaptive AI bot behavior',
        'Procedural world generation',
        'Spatial puzzle mechanics',
        'Optimized mobile performance'
      ],
      images: [
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/7862492/pexels-photo-7862492.jpeg?auto=compress&cs=tinysrgb&w=300'
      ]
    }
  ];

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleTitleClick = (projectId: string) => {
    setExpandedProject(projectId);
  };

  const handleImageClick = (src: string, alt: string) => {
    setOverlayImage({ src, alt });
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Results Header */}
      <div className="mb-6">
        <p className="text-sm mb-2" style={{ color: themeStyles.mutedText }}>About 847 results (0.52 seconds)</p>
      </div>

      {/* Featured Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-4xl">
          <h2 className="text-base sm:text-lg font-medium mb-6" style={{ color: themeStyles.text }}>Featured Projects & Experience</h2>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-lg border overflow-hidden"
                style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}
              >
                {/* Project Header */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    {/* Left Side - Project Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <h3 
                          className="text-lg sm:text-xl hover:underline cursor-pointer" 
                          style={{ color: themeStyles.linkColor }}
                          onClick={() => handleTitleClick(project.id)}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-3" style={{ color: themeStyles.mutedText }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          {project.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          {project.team}
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                          {project.role}
                        </div>
                      </div>

                      <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: themeStyles.text }}>
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                            style={{ backgroundColor: themeStyles.tagBg, color: themeStyles.tagText }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleProject(project.id)}
                        className="flex items-center gap-2 transition-colors text-xs sm:text-sm"
                        style={{ color: themeStyles.linkColor }}
                      >
                        {expandedProject === project.id ? (
                          <>
                            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                            Show more details
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right Side - Project Images */}
                    <div className="lg:col-span-1">
                      <div className="grid grid-cols-2 gap-2">
                        {project.images.slice(0, 4).map((image, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img 
                              src={image} 
                              alt={`${project.title} screenshot ${imgIndex + 1}`}
                              className="w-full h-16 sm:h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => handleImageClick(image, `${project.title} screenshot ${imgIndex + 1}`)}
                            />
                            {imgIndex === 3 && project.images.length > 4 && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm font-medium">
                                  +{project.images.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t"
                      style={{ borderColor: themeStyles.cardBorder, backgroundColor: themeStyles.cardBg }}
                    >
                      <div className="p-4 sm:p-6">
                        <h4 className="font-medium mb-3 text-sm sm:text-base" style={{ color: themeStyles.text }}>Project Details</h4>
                        <p className="leading-relaxed mb-4 text-sm sm:text-base" style={{ color: themeStyles.text }}>
                          {project.details}
                        </p>
                        
                        {/* Achievements */}
                        <h5 className="font-medium mb-3 text-sm" style={{ color: themeStyles.text }}>Key Achievements:</h5>
                        <ul className="mb-4 space-y-1">
                          {project.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm" style={{ color: themeStyles.text }}>
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:gap-3 flex-wrap">
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                            >
                              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              Live Demo
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 sm:px-4 py-2 rounded transition-colors text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                              style={{ 
                                backgroundColor: themeStyles.buttonBg,
                                color: themeStyles.buttonText
                              }}
                            >
                              <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                              View Source
                            </a>
                          )}
                          {project.video && (
                            <a
                              href={project.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 sm:px-4 py-2 rounded transition-colors text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                              style={{ 
                                backgroundColor: themeStyles.buttonBg,
                                color: themeStyles.buttonText
                              }}
                            >
                              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                              View Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Image Overlay */}
      <ImageOverlay
        isOpen={!!overlayImage}
        imageSrc={overlayImage?.src || ''}
        imageAlt={overlayImage?.alt || ''}
        onClose={closeOverlay}
      />
    </div>
  );
};

export default ProjectsPage;