import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code, Database, Cloud, Palette, Shield, Zap, Brain, Gamepad2, GitBranch, Monitor } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: Skill[];
  description: string;
  keySkills: string[];
}

const SkillsPage: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#dadce0',
    cardBg: '#28292a',
    cardBorder: '#323334',
    linkColor: '#99c3ff',
    mutedText: '#9e9e9e',
    urlColor: '#34a853',
    progressBg: '#28292a',
    progressLine: '#99c3ff',
    progressFill: '#96a6fb',
    headingColor: '#e8e8e8',
    separatorColor: '#3c4043',
    tagBg: '#5f6368',
    tagText: '#e8eaed'
  };

  const skillCategories: SkillCategory[] = [
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: Code,
      description: 'Proficient in multiple programming languages with strong foundation in object-oriented and functional programming paradigms.',
      keySkills: ['Java', 'Python', 'C++', 'JavaScript'],
      skills: [
        { name: 'Java', proficiency: 90 },
        { name: 'Python', proficiency: 90 },
        { name: 'C++', proficiency: 80 },
        { name: 'JavaScript', proficiency: 60 }
      ]
    },
    {
      id: 'genai',
      title: 'GenAI & Agentic AI',
      icon: Brain,
      description: 'Specialized in building intelligent agents and generative AI applications using cutting-edge frameworks and tools.',
      keySkills: ['LangGraph', 'LangChain', 'Pydantic', 'Pinecone', 'CrewAI', 'AutoGen'],
      skills: [
        { name: 'LangGraph', proficiency: 85 },
        { name: 'LangChain', proficiency: 80 },
        { name: 'Pydantic', proficiency: 80 },
        { name: 'Pinecone', proficiency: 80 },
        { name: 'CrewAI', proficiency: 80 },
        { name: 'AutoGen', proficiency: 70 }
      ]
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: Zap,
      description: 'Experience in developing and deploying machine learning models for various applications and domains.',
      keySkills: ['PyTorch', 'scikit-learn'],
      skills: [
        { name: 'PyTorch', proficiency: 80 },
        { name: 'scikit-learn', proficiency: 60 }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Monitor,
      description: 'Creating responsive and interactive user interfaces with modern web technologies and frameworks.',
      keySkills: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'React', 'TypeScript'],
      skills: [
        { name: 'HTML5', proficiency: 85 },
        { name: 'CSS3', proficiency: 80 },
        { name: 'Bootstrap', proficiency: 80 },
        { name: 'Tailwind CSS', proficiency: 80 },
        { name: 'JavaScript', proficiency: 60 },
        { name: 'React', proficiency: 50 },
        { name: 'TypeScript', proficiency: 50 }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Database,
      description: 'Building robust server-side applications and managing databases with various technologies and frameworks.',
      keySkills: ['PHP', 'MySQL', 'MongoDB', 'Node.js'],
      skills: [
        { name: 'PHP', proficiency: 80 },
        { name: 'MySQL', proficiency: 75 },
        { name: 'MongoDB', proficiency: 70 },
        { name: 'Node.js', proficiency: 50 }
      ]
    },
    {
      id: 'arvr',
      title: 'AR/VR Development',
      icon: Gamepad2,
      description: 'Developing immersive augmented and virtual reality experiences using industry-standard game engines.',
      keySkills: ['Unity Engine', 'AR Foundation', 'Visual Scripting', 'Unreal Engine'],
      skills: [
        { name: 'Unity Engine', proficiency: 85 },
        { name: 'AR Foundation', proficiency: 80 },
        { name: 'Visual Scripting', proficiency: 80 },
        { name: 'Unreal Engine', proficiency: 70 }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Tools',
      icon: Palette,
      description: '3D modeling, sculpting, and animation tools for creating digital assets and visual content.',
      keySkills: ['Blender', 'ZBrush', 'Maya'],
      skills: [
        { name: 'Blender', proficiency: 70 },
        { name: 'ZBrush', proficiency: 70 },
        { name: 'Maya', proficiency: 50 }
      ]
    },
    {
      id: 'devops',
      title: 'Version Control & DevOps',
      icon: GitBranch,
      description: 'Managing code repositories and basic deployment workflows with version control and cloud platforms.',
      keySkills: ['Git & GitHub', 'Docker', 'AWS'],
      skills: [
        { name: 'Git & GitHub', proficiency: 85 },
        { name: 'Docker (basic)', proficiency: 50 },
        { name: 'AWS (basic)', proficiency: 50 }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleTitleClick = (categoryId: string) => {
    setExpandedCategory(categoryId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Results Header */}
      <div className="mb-6">
        <p className="text-sm mb-2" style={{ color: themeStyles.mutedText }}>About 623 results (0.38 seconds)</p>
      </div>

      {/* Skills Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-lg sm:text-xl hover:underline cursor-pointer mb-2" style={{ color: themeStyles.linkColor }}>
          Technical Skills & Expertise - Kidhurshan
        </h1>
        <p className="text-sm mb-3" style={{ color: themeStyles.urlColor }}>https://kidhurshan.dev/skills</p>
        <p className="leading-relaxed text-sm sm:text-base mb-4" style={{ color: themeStyles.text }}>
          I'm fluent in multiple programming languages including Python, Java, C++, JavaScript, HTML5, and CSS3, 
          and actively work with modern frameworks like LangChain, LangGraph, AutoGen, Pydantic, Pinecone, and GitHub 
          for AI development. On the creative and systems side, I use Unity, Blender, ZBrush, and Matlab to design 
          interactive visuals and models, especially for AR/VR and game development.
        </p>
        <p className="leading-relaxed text-sm sm:text-base" style={{ color: themeStyles.text }}>
          Whether I'm prototyping a GenAI agent, developing a peer-to-peer video conferencing app, or sculpting an 
          AI-enhanced AR game, I focus on clarity, minimalism, and unique user experiences. My engineering mindset 
          is paired with a visual storytelling approach that ensures every feature not only works but resonates with the user.
        </p>
      </motion.div>

      {/* Skills Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-4xl">
          <h2 className="text-base sm:text-lg font-medium mb-6" style={{ color: themeStyles.text }}>Technical Skills & Expertise</h2>
          
          <div className="space-y-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-lg border overflow-hidden"
                  style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}
                >
                  {/* Category Header */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: themeStyles.progressFill }}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 
                          className="text-lg sm:text-xl hover:underline cursor-pointer" 
                          style={{ color: themeStyles.linkColor }}
                          onClick={() => handleTitleClick(category.id)}
                        >
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: themeStyles.text }}>
                      {category.description}
                    </p>

                    {/* Key Skills Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {category.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                          style={{ backgroundColor: themeStyles.tagBg, color: themeStyles.tagText }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-2 transition-colors text-xs sm:text-sm"
                      style={{ color: themeStyles.linkColor }}
                    >
                      {expandedCategory === category.id ? (
                        <>
                          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          Hide proficiency levels
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                          Show proficiency levels
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Details - Progress Bars */}
                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t"
                        style={{ borderColor: themeStyles.cardBorder, backgroundColor: themeStyles.cardBg }}
                      >
                        <div className="p-4 sm:p-6">
                          <h4 className="font-medium mb-4 text-sm sm:text-base" style={{ color: themeStyles.text }}>Proficiency Levels</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.skills.map((skill, skillIndex) => (
                              <div key={skill.name} className="space-y-2">
                                {/* Skill Name and Percentage */}
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium" style={{ color: themeStyles.text }}>
                                    {skill.name}
                                  </span>
                                  <span className="text-sm font-medium" style={{ color: themeStyles.text }}>
                                    {skill.proficiency}%
                                  </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative">
                                  <div 
                                    className="w-full h-2 rounded-full"
                                    style={{ backgroundColor: themeStyles.progressBg }}
                                  >
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.proficiency}%` }}
                                      transition={{ 
                                        duration: 1.2, 
                                        delay: skillIndex * 0.1 + 0.3,
                                        ease: "easeOut"
                                      }}
                                      className="h-2 rounded-full relative"
                                      style={{ backgroundColor: themeStyles.progressFill }}
                                    >
                                      {/* Progress indicator circle */}
                                      <div 
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2"
                                        style={{ 
                                          backgroundColor: themeStyles.progressFill,
                                          borderColor: themeStyles.progressLine
                                        }}
                                      />
                                    </motion.div>
                                  </div>
                                  {/* Background line */}
                                  <div 
                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5"
                                    style={{ backgroundColor: themeStyles.progressLine }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;