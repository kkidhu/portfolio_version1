import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import ImageOverlay from '../components/ImageOverlay';

const AboutPage: React.FC = () => {
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);

  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#dadce0',
    cardBg: '#28292a',
    cardBorder: 'transparent',
    linkColor: '#8ab4f8',
    mutedText: '#9aa0a6',
    urlColor: '#34a853',
    separatorColor: '#3c4043',
    headingColor: '#e8e8e8',
    hyperlinkColor: '#99c3ff',
    descriptionColor: '#9e9e9e'
  };

  const educationData = [
    {
      id: 1,
      title: 'Bachelor of Engineering in Computer Engineering',
      institution: 'University of Jaffna, Sri Lanka',
      description: 'Specializing in AI, Machine Learning, and Deep Learning with focus on real-world applications',
      timeAgo: 'Current',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Advanced Level (A/L)',
      institution: 'Science Stream with Mathematics',
      description: 'Strong foundation in Mathematics, Physics, and Chemistry',
      timeAgo: '3 years ago',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Ordinary Level (O/L)',
      institution: 'High School Education',
      description: 'Comprehensive secondary education with excellent academic performance',
      timeAgo: '5 years ago',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleImageClick = (src: string, alt: string) => {
    setOverlayImage({ src, alt });
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Results Header */}
      <div className="mb-6">
        <p className="text-sm mb-2" style={{ color: themeStyles.mutedText }}>About 1,230 results (0.45 seconds)</p>
      </div>

      {/* Featured Snippet Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        {/* Name Header */}
        <h1 className="text-2xl sm:text-3xl font-normal mb-6" style={{ color: themeStyles.text, fontFamily: 'arial, sans-serif' }}>
          Kidhurshan - Computer Engineering Student & AI Enthusiast
        </h1>

        {/* Main Content Row - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
          {/* Left Side - Summary */}
          <div className="lg:col-span-2">
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: themeStyles.text, fontFamily: 'arial, sans-serif' }}>
              Hi, I'm Kidhurshan, an enthusiastic Computer Engineering undergraduate at the University of Jaffna, Sri Lanka, 
              with a deep passion for building real-world solutions through AI, Machine Learning, and Deep Learning. My journey 
              into the world of technology began with a curiosity to solve complex problems, and over time, this curiosity evolved 
              into a purposeful drive to become a skilled AI Engineer.
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: themeStyles.text, fontFamily: 'arial, sans-serif' }}>
              I specialize in crafting intelligent systems, developing immersive AR/VR experiences, and experimenting with agentic 
              AI applications. With a growing portfolio of solo and team-driven projects, I strive to fuse innovation with 
              usability—always aiming to build tools that are functional, scalable, and human-centered.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: themeStyles.text, fontFamily: 'arial, sans-serif' }}>
              Whether I'm prototyping a GenAI agent, developing a peer-to-peer video conferencing app, or sculpting an AI-enhanced 
              AR game, I focus on clarity, minimalism, and unique user experiences. My engineering mindset is paired with a visual 
              storytelling approach that ensures every feature not only works but resonates with the user.
            </p>
          </div>

          {/* Right Side - Profile Image */}
          <div className="lg:col-span-1">
            <div 
              className="w-full h-32 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-4xl sm:text-6xl font-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kidhurshan Profile')}
            >
              K
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div 
          className="h-px mb-8"
          style={{ backgroundColor: themeStyles.separatorColor }}
        ></div>
      </motion.div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Side - Education */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg sm:text-xl font-normal mb-6" style={{ color: themeStyles.headingColor, fontFamily: 'arial, sans-serif' }}>
            Education & Learning Journey
          </h2>
          
          <div className="space-y-6">
            {educationData.map((education, index) => (
              <motion.div
                key={education.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4"
              >
                {/* Education Content - Left Side */}
                <div className="sm:col-span-3">
                  <h3 className="text-base sm:text-lg hover:underline cursor-pointer mb-1" style={{ color: themeStyles.hyperlinkColor, fontFamily: 'arial, sans-serif' }}>
                    {education.title}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: themeStyles.hyperlinkColor, fontFamily: 'arial, sans-serif' }}>
                    {education.institution}
                  </p>
                  <p className="text-sm mb-2" style={{ color: themeStyles.text, fontFamily: 'arial, sans-serif' }}>
                    {education.description}
                  </p>
                  <p className="text-xs" style={{ color: themeStyles.descriptionColor, fontFamily: 'arial, sans-serif' }}>
                    {education.timeAgo}
                  </p>
                </div>

                {/* Education Image - Right Side */}
                <div className="sm:col-span-1 flex justify-start sm:justify-end">
                  <img 
                    src={education.image} 
                    alt={education.institution}
                    className="w-16 h-12 sm:w-20 sm:h-16 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(education.image, education.institution)}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Collaboration Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 p-4 sm:p-6 rounded-lg border"
            style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}
          >
            <h4 className="font-medium mb-3 text-sm sm:text-base" style={{ color: themeStyles.headingColor }}>I'm interested in:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'AI/ML Engineering Roles',
                'AR/VR Development Projects',
                'Open Source Collaborations',
                'Research Opportunities',
                'Internship Programs',
                'Freelance Projects',
                'Tech Mentorship',
                'Industry Partnerships'
              ].map((interest, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm" style={{ color: themeStyles.text }}>{interest}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Personal Details */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="rounded-lg p-4 sm:p-6 border" style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
            <h2 className="text-base sm:text-lg font-normal mb-6" style={{ color: themeStyles.headingColor, fontFamily: 'arial, sans-serif' }}>
              Personal Details
            </h2>

            {/* Bio Information */}
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Location: </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Jaffna, Sri Lanka</a>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Education: </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>University of Jaffna</a>
                <span className="text-sm" style={{ color: themeStyles.text }}> (Current)</span>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Field: </span>
                <span className="text-sm" style={{ color: themeStyles.text }}>Computer Engineering, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>AI & ML Specialist</a>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Focus Areas: </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>AI Engineering</a>
                <span className="text-sm" style={{ color: themeStyles.text }}>, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>AR/VR Development</a>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Specialization: </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Machine Learning</a>
                <span className="text-sm" style={{ color: themeStyles.text }}>, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Deep Learning</a>
                <span className="text-sm" style={{ color: themeStyles.text }}>, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Agentic AI</a>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Languages: </span>
                <span className="text-sm" style={{ color: themeStyles.text }}>English, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Tamil</a>
                <span className="text-sm" style={{ color: themeStyles.text }}>, </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>Sinhala</a>
              </div>

              <div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Goal: </span>
                <span className="text-sm" style={{ color: themeStyles.text }}>Becoming a leading </span>
                <a href="#" className="text-sm hover:underline" style={{ color: themeStyles.hyperlinkColor }}>AI Engineer</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: themeStyles.cardBorder }}>
              <div className="space-y-2">
                <a href="https://linkedin.com/in/kidhurshan" className="flex items-center gap-2 hover:underline text-sm" style={{ color: themeStyles.hyperlinkColor }}>
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn Profile
                </a>
                <a href="https://github.com/kidhurshan" className="flex items-center gap-2 hover:underline text-sm" style={{ color: themeStyles.hyperlinkColor }}>
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
                <a href="mailto:d.kidhu@gmail.com" className="flex items-center gap-2 hover:underline text-sm" style={{ color: themeStyles.hyperlinkColor }}>
                  <ExternalLink className="h-4 w-4" />
                  Email Contact
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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

export default AboutPage;