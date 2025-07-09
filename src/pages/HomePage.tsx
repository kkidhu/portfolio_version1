import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnimation from '../components/LoadingAnimation';
import useSlowLoading from '../hooks/useSlowLoading';
import { Search, Download, User, Code, Award, Mail, Github, Linkedin, Mic, Camera, Sun, Moon } from 'lucide-react';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showLoading } = useSlowLoading(600); // Show loading after 600ms for home page

  const suggestions = [
    { text: 'about', icon: User, path: 'about' },
    { text: 'projects', icon: Code, path: 'projects' },
    { text: 'skills', icon: Award, path: 'skills' },
    { text: 'contact', icon: Mail, path: 'contact' },
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedSuggestion(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    };

    if (showSuggestions) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showSuggestions, focusedSuggestion, filteredSuggestions.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (focusedSuggestion >= 0 && filteredSuggestions[focusedSuggestion]) {
      navigate(`/search/${filteredSuggestions[focusedSuggestion].path}`);
    } else if (searchQuery.trim()) {
      const matchedSuggestion = suggestions.find(s => 
        s.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedSuggestion) {
        navigate(`/search/${matchedSuggestion.path}`);
      } else {
        navigate(`/search/404?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleSuggestionClick = (path: string) => {
    navigate(`/search/${path}`);
  };

  const handleAboutMe = () => {
    navigate('/search/about');
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Kidhurshan_Resume.pdf';
    link.click();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeStyles = {
    background: isDarkTheme ? '#202124' : '#ffffff',
    text: isDarkTheme ? '#ffffff' : '#202124',
    searchBar: isDarkTheme ? '#4d5156' : '#ffffff',
    searchBarHover: isDarkTheme ? '#5f6368' : '#f8f9fa',
    searchBarFocus: isDarkTheme ? '#303134' : '#ffffff',
    buttonBg: isDarkTheme ? '#303134' : '#f8f9fa',
    buttonText: isDarkTheme ? '#e8eaed' : '#202124',
    suggestionBg: isDarkTheme ? '#303134' : '#ffffff',
    footer: isDarkTheme ? '#171717' : '#f2f2f2',
    footerText: isDarkTheme ? '#9aa0a6' : '#70757a',
    iconColor: isDarkTheme ? '#e0e0e0' : '#5f6368',
    dropdownBg: isDarkTheme ? '#282a2c' : '#f8f9fa'
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative" style={{ backgroundColor: themeStyles.background, color: themeStyles.text }}>
      <LoadingAnimation isVisible={showLoading} />
      
      {/* Theme Toggle Button - Positioned above footer */}
      <div className="fixed bottom-16 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-lg"
          style={{
            backgroundColor: isDarkTheme ? '#303134' : '#f8f9fa',
            border: isDarkTheme ? 'none' : '1px solid #dadce0',
            width: 'clamp(32px, 8vw, 48px)',
            height: 'clamp(32px, 8vw, 48px)'
          }}
        >
          {isDarkTheme ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#d1d2d5' }} />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#2f3033' }} />
          )}
        </button>
      </div>

      {/* Header */}
      <header className="flex justify-end items-center p-4 text-sm" style={{ height: '60px' }}>
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Desktop Social Links */}
          <div className="hidden sm:flex gap-4">
            <a 
              href="https://github.com/kidhurshan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: themeStyles.iconColor }} />
            </a>
            <a 
              href="https://linkedin.com/in/kidhurshan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: themeStyles.iconColor }} />
            </a>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:shadow-lg transition-shadow text-base"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              K
            </div>
            
            {/* Account Dropdown */}
            <AnimatePresence>
              {showAccountDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 rounded-lg shadow-2xl z-50 overflow-hidden"
                  style={{ backgroundColor: themeStyles.dropdownBg }}
                >
                  {/* Header */}
                  <div className="p-6 text-center border-b" style={{ borderColor: isDarkTheme ? '#5f6368' : '#dadce0' }}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm" style={{ color: isDarkTheme ? '#e8eaed' : '#5f6368' }}>kidhurshan@gmail.com</span>
                      <button 
                        onClick={() => setShowAccountDropdown(false)}
                        className="hover:opacity-75 transition-opacity text-xl"
                        style={{ color: isDarkTheme ? '#9aa0a6' : '#5f6368' }}
                      >
                        ×
                      </button>
                    </div>
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-medium relative">
                      K
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                        <Camera className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-normal mb-4" style={{ color: isDarkTheme ? '#e8eaed' : '#202124' }}>Hi, Kidhurshan!</h3>
                    <button 
                      className="px-6 py-2 border rounded-full text-sm transition-colors"
                      style={{ 
                        borderColor: isDarkTheme ? '#5f6368' : '#dadce0',
                        color: isDarkTheme ? '#e8eaed' : '#1a73e8',
                        backgroundColor: 'transparent'
                      }}
                    >
                      Connect via Gmail
                    </button>
                  </div>

                  {/* Mobile Social Links */}
                  <div className="p-4 border-b sm:hidden" style={{ borderColor: isDarkTheme ? '#5f6368' : '#dadce0' }}>
                    <h4 className="text-sm font-medium mb-3" style={{ color: isDarkTheme ? '#e8eaed' : '#202124' }}>Connect</h4>
                    <div className="space-y-3">
                      <a
                        href="https://github.com/kidhurshan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                        style={{ color: isDarkTheme ? '#e8eaed' : '#202124' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkTheme ? '#3c4043' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/kidhurshan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                        style={{ color: isDarkTheme ? '#e8eaed' : '#202124' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkTheme ? '#3c4043' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button 
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors text-left"
                        style={{ 
                          color: isDarkTheme ? '#e8eaed' : '#202124'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkTheme ? '#3c4043' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span className="text-lg">+</span>
                        <span className="text-sm">Add account</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors text-left"
                        style={{ 
                          color: isDarkTheme ? '#e8eaed' : '#202124'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkTheme ? '#3c4043' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span className="text-lg">↗</span>
                        <span className="text-sm">Sign out</span>
                      </button>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-center text-xs space-x-4" style={{ color: isDarkTheme ? '#9aa0a6' : '#70757a' }}>
                      <a href="#" className="hover:underline">Privacy Policy</a>
                      <span>•</span>
                      <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content - Google-like Mobile Layout */}
      <main className="flex-1 flex flex-col items-center px-4" style={{ paddingTop: '60px', paddingBottom: '10vh' }}>
        {/* Logo - Mobile Optimized */}
        <motion.h1 
          className="mb-8 text-center font-normal leading-tight"
          style={{ 
            color: isDarkTheme ? '#ffffff' : undefined,
            fontSize: 'clamp(60px, 15vw, 90px)',
            lineHeight: 'clamp(60px, 15vw, 90px)',
            fontFamily: 'Product Sans, arial, sans-serif',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isDarkTheme ? (
            'Kidhurshan'
          ) : (
            <>
              <span style={{ color: '#4285f4' }}>K</span>
              <span style={{ color: '#ea4335' }}>i</span>
              <span style={{ color: '#fbbc05' }}>d</span>
              <span style={{ color: '#4285f4' }}>h</span>
              <span style={{ color: '#34a853' }}>u</span>
              <span style={{ color: '#ea4335' }}>r</span>
              <span style={{ color: '#fbbc05' }}>s</span>
              <span style={{ color: '#4285f4' }}>h</span>
              <span style={{ color: '#34a853' }}>a</span>
              <span style={{ color: '#ea4335' }}>n</span>
            </>
          )}
        </motion.h1>

        {/* Search Bar - Mobile Optimized */}
        <motion.div 
          className="relative mb-8 w-full"
          style={{ maxWidth: '584px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div 
              className={`flex items-center rounded-full border transition-all duration-200 ${
                isSearchFocused ? 'shadow-lg' : 'hover:shadow-md'
              }`}
              style={{ 
                backgroundColor: isSearchFocused ? themeStyles.searchBarFocus : (showSuggestions ? themeStyles.searchBarHover : themeStyles.searchBar),
                height: 'clamp(48px, 12vw, 48px)',
                borderColor: isSearchFocused ? themeStyles.searchBarFocus : (showSuggestions ? themeStyles.searchBarHover : themeStyles.searchBar),
                boxShadow: isSearchFocused ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                border: isDarkTheme ? 'none' : '1px solid #dfe1e5'
              }}
            >
              {/* Search Icon */}
              <div className="pl-4 flex items-center">
                <Search className="h-5 w-5" style={{ color: isDarkTheme ? '#9aa0a6' : '#9aa0a6' }} />
              </div>
              
              {/* Input */}
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setShowSuggestions(true);
                  setIsSearchFocused(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggestions(false);
                    setIsSearchFocused(false);
                  }, 200);
                }}
                placeholder="Search Kidhurshan's profile"
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none"
                style={{ 
                  color: isDarkTheme ? '#ffffff' : '#202124',
                  fontSize: 'clamp(14px, 4vw, 16px)'
                }}
              />
              
              {/* Right Icons */}
              <div className="pr-4 flex items-center gap-3">
                <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                  <Mic className="h-5 w-5" style={{ color: isDarkTheme ? '#9aa0a6' : '#9aa0a6' }} />
                </button>
                <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                  <Camera className="h-5 w-5" style={{ color: isDarkTheme ? '#9aa0a6' : '#9aa0a6' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-2xl overflow-hidden z-50"
                style={{ 
                  backgroundColor: themeStyles.suggestionBg,
                  border: `1px solid ${isDarkTheme ? '#5f6368' : '#e8eaed'}`,
                  boxShadow: '0 4px 6px rgba(32,33,36,.28)'
                }}
              >
                <div className="p-4">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.path}
                      onClick={() => handleSuggestionClick(suggestion.path)}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors rounded
                                ${index === focusedSuggestion ? (isDarkTheme ? 'bg-gray-600' : 'bg-gray-100') : (isDarkTheme ? 'hover:bg-gray-600' : 'hover:bg-gray-100')}`}
                    >
                      <Search className="h-4 w-4" style={{ color: isDarkTheme ? '#9aa0a6' : '#9aa0a6' }} />
                      <span style={{ color: '#c58af3' }} className="text-sm">{suggestion.text}</span>
                      <span className="text-xs ml-auto hidden sm:inline" style={{ color: isDarkTheme ? '#9aa0a6' : '#70757a' }}>- Google Search</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons - Mobile Optimized */}
        <motion.div 
          className="flex gap-4 flex-col sm:flex-row mb-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleAboutMe}
            className="rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md flex-1"
            style={{ 
              backgroundColor: themeStyles.buttonBg,
              color: themeStyles.buttonText,
              borderColor: themeStyles.buttonBg,
              height: 'clamp(44px, 12vw, 48px)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              padding: '0 16px',
              fontFamily: 'Product Sans, arial, sans-serif',
              border: isDarkTheme ? 'none' : '1px solid #f8f9fa'
            }}
          >
            About Me
          </button>
          <button
            onClick={handleResumeDownload}
            className="rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md flex items-center justify-center gap-2 flex-1"
            style={{ 
              backgroundColor: themeStyles.buttonBg,
              color: themeStyles.buttonText,
              borderColor: themeStyles.buttonBg,
              height: 'clamp(44px, 12vw, 48px)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              padding: '0 16px',
              fontFamily: 'Product Sans, arial, sans-serif',
              border: isDarkTheme ? 'none' : '1px solid #f8f9fa'
            }}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Resume Download</span>
            <span className="sm:hidden">Resume</span>
          </button>
        </motion.div>

        {/* Language Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm text-center px-4"
          style={{ color: isDarkTheme ? '#9aa0a6' : '#70757a' }}
        >
          Kidhurshan offered in:{' '}
          <a href="#" className="hover:underline" style={{ color: '#1a73e8' }}>සිංහල</a>
          {' '}
          <a href="#" className="hover:underline" style={{ color: '#1a73e8' }}>தமிழ்</a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer 
        className="flex flex-col sm:flex-row justify-between items-center px-6 text-sm py-0"
        style={{ 
          backgroundColor: themeStyles.footer,
          minHeight: '49px',
          color: themeStyles.footerText
        }}
      >
        <div className="mb-2 sm:mb-0">Sri Lanka</div>
        <div className="text-center sm:text-right">© 2024 Kidhurshan. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default HomePage;