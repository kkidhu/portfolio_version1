import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation';
import useSlowLoading from '../hooks/useSlowLoading';
import { User, Code, Award, Mail, Github, Linkedin, X, Search, Mic, Camera } from 'lucide-react';

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { showLoading } = useSlowLoading(700); // Show loading after 700ms for layout pages

  const tabs = [
    { name: 'About', path: 'about', icon: User },
    { name: 'Projects', path: 'projects', icon: Code },
    { name: 'Skills', path: 'skills', icon: Award },
    { name: 'Contact', path: 'contact', icon: Mail },
  ];

  const suggestions = [
    { text: 'about', icon: User, path: 'about' },
    { text: 'projects', icon: Code, path: 'projects' },
    { text: 'skills', icon: Award, path: 'skills' },
    { text: 'contact', icon: Mail, path: 'contact' },
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTab = location.pathname.split('/').pop() || '';
  const currentTabName = tabs.find(tab => tab.path === currentTab)?.name || '';

  // Update search query when route changes via navigation
  useEffect(() => {
    if (currentTabName && !searchQuery) {
      setSearchQuery(currentTabName.toLowerCase());
    }
  }, [currentTabName]);

  // Handle clicks outside dropdown and overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
      
      // Handle overlay click outside
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation for suggestions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions) {
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
        } else if (e.key === 'Escape') {
          setIsSearchExpanded(false);
          setShowSuggestions(false);
        }
      }
    };

    if (showSuggestions) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showSuggestions, focusedSuggestion, filteredSuggestions.length]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (focusedSuggestion >= 0 && filteredSuggestions[focusedSuggestion]) {
      navigate(`/search/${filteredSuggestions[focusedSuggestion].path}`);
    } else if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchedSuggestion = suggestions.find(s => 
        s.text.toLowerCase().includes(query) || query.includes(s.text.toLowerCase())
      );
      
      if (matchedSuggestion) {
        navigate(`/search/${matchedSuggestion.path}`);
      } else {
        navigate(`/search/404?q=${encodeURIComponent(searchQuery)}`);
      }
    }
    setIsSearchExpanded(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (path: string) => {
    navigate(`/search/${path}`);
    setIsSearchExpanded(false);
    setShowSuggestions(false);
  };

  const handleTabClick = (path: string, name: string) => {
    setSearchQuery(name.toLowerCase());
    navigate(`/search/${path}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getPlaceholder = () => {
    return currentTabName ? `${currentTabName}` : 'Search...';
  };

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setShowSuggestions(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#ffffff',
    headerBorder: '#3c4043',
    searchBar: '#4d5156',
    searchBarHover: '#5f6368',
    searchBorder: '#5f6368',
    iconColor: '#e0e0e0',
    tabActive: '#ffffff',
    tabInactive: '#80868b',
    tabHover: '#e8eaed',
    dropdownBg: '#282a2c',
    suggestionBg: '#303134'
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: themeStyles.background, color: themeStyles.text }}>
      <LoadingAnimation isVisible={showLoading} />
      
      {/* Search Overlay for Mobile - Full Screen with Click Outside */}
      {isSearchExpanded && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div 
            ref={overlayRef}
            className="bg-gray-900 h-full w-full"
            style={{ backgroundColor: themeStyles.background }}
          >
            <div className="p-4 h-full">
              <form onSubmit={handleSearch} className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleSearchClose}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <X className="h-5 w-5" style={{ color: themeStyles.iconColor }} />
                </button>
                <div className="flex-1 relative">
                  <div 
                    className="flex items-center rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: '#4d5156',
                      height: '44px',
                      border: `1px solid #5f6368`
                    }}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      placeholder={getPlaceholder()}
                      className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-white text-sm"
                    />
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="p-2 hover:bg-gray-600 rounded transition-colors mr-2"
                      >
                        <X className="h-4 w-4" style={{ color: '#9aa0a6' }} />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Search Suggestions - Mobile */}
              {showSuggestions && (
                <div
                  className="rounded-lg shadow-2xl overflow-hidden"
                  style={{ 
                    backgroundColor: themeStyles.suggestionBg,
                    border: `1px solid #5f6368`,
                    boxShadow: '0 4px 6px rgba(32,33,36,.28)'
                  }}
                >
                  <div className="p-4">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.path}
                        onClick={() => handleSuggestionClick(suggestion.path)}
                        className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors rounded
                                  ${index === focusedSuggestion ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
                      >
                        <Search className="h-4 w-4" style={{ color: '#9aa0a6' }} />
                        <span style={{ color: '#c58af3' }} className="text-sm">{suggestion.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ paddingTop: '18px' }}>
        {/* Top Row - Logo, Search Bar, and Account Icons */}
        <div className="flex items-center justify-between px-4 sm:px-6" style={{ paddingBottom: '15px' }}>
          {/* Left Side - Logo and Search Bar */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Logo - Mobile Optimized */}
            <div 
              className="text-lg font-normal mr-4 cursor-pointer flex-shrink-0"
              onClick={() => navigate('/')}
              style={{ fontSize: 'clamp(16px, 4vw, 24px)' }}
            >
              Kidhurshan
            </div>

            {/* Search Bar - Desktop and Tablet */}
            <form onSubmit={handleSearch} className="flex-1 max-w-4xl hidden md:block">
              <div className="relative">
                <div 
                  className="flex items-center rounded-full transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: searchQuery ? themeStyles.searchBarHover : themeStyles.searchBar,
                    width: '100%',
                    maxWidth: 'min(600px, 50vw)',
                    height: 'clamp(44px, 10vw, 51px)',
                    border: `1px solid ${themeStyles.searchBorder}`
                  }}
                >
                  {/* Search Icon */}
                  <div className="pl-4 flex items-center">
                    <Search className="h-5 w-5" style={{ color: '#9aa0a6' }} />
                  </div>
                  
                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder={getPlaceholder()}
                    className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-base"
                    style={{ 
                      color: '#e8eaed'
                    }}
                    aria-label={`Search ${currentTabName || 'Kidhurshan\'s profile'}`}
                    aria-describedby="search-help"
                  />
                  
                  {/* Clear Button */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-2 hover:bg-gray-600 rounded transition-colors mr-2"
                      aria-label="Clear search"
                    >
                      <X className="h-5 w-5" style={{ color: '#9aa0a6' }} />
                    </button>
                  )}

                  {/* Right Icons - Only on larger screens */}
                  <div className="pr-4 flex items-center gap-3 hidden lg:flex">
                    <button type="button" className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <Mic className="h-5 w-5" style={{ color: '#9aa0a6' }} />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <Camera className="h-5 w-5" style={{ color: '#9aa0a6' }} />
                    </button>
                  </div>
                </div>

                {/* Desktop Search Suggestions */}
                {showSuggestions && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-2xl overflow-hidden z-50"
                    style={{ 
                      backgroundColor: themeStyles.suggestionBg,
                      border: `1px solid ${themeStyles.searchBorder}`,
                      boxShadow: '0 4px 6px rgba(32,33,36,.28)'
                    }}
                  >
                    <div className="p-4">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={suggestion.path}
                          onClick={() => handleSuggestionClick(suggestion.path)}
                          className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors rounded
                                    ${index === focusedSuggestion ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
                        >
                          <Search className="h-4 w-4" style={{ color: '#9aa0a6' }} />
                          <span style={{ color: '#c58af3' }} className="text-sm">{suggestion.text}</span>
                          <span className="text-xs ml-auto" style={{ color: '#9aa0a6' }}>- Google Search</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div id="search-help" className="sr-only">
                Type to search {currentTabName || 'Kidhurshan\'s profile'}. Use navigation links or search terms like about, projects, skills, or contact.
              </div>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={handleSearchClick}
              className="md:hidden flex-1 max-w-xs mx-4 flex items-center gap-3 px-4 py-2 rounded-full transition-colors hover:bg-opacity-80"
              style={{ backgroundColor: '#4d5156' }}
            >
              <Search className="h-4 w-4" style={{ color: '#9aa0a6' }} />
              <span className="text-sm text-gray-400 truncate">{getPlaceholder()}</span>
            </button>
          </div>

          {/* Right Side - Social Links and Account */}
          <div className="flex items-center gap-4 ml-4 flex-shrink-0">
            {/* Desktop Social Links - Hidden on smaller screens */}
            <div className="hidden lg:flex gap-4">
              <a 
                href="https://github.com/kidhurshan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Visit GitHub profile"
              >
                <Github className="h-5 w-5" style={{ color: themeStyles.iconColor }} />
              </a>
              <a 
                href="https://linkedin.com/in/kidhurshan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" style={{ color: themeStyles.iconColor }} />
              </a>
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium hover:shadow-lg transition-shadow text-base"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                aria-label="Account menu"
                aria-expanded={showAccountDropdown}
                aria-haspopup="true"
              >
                K
              </button>
              
              {/* Account Dropdown */}
              {showAccountDropdown && (
                <div
                  className="absolute right-0 mt-2 w-80 rounded-lg shadow-2xl z-50 overflow-hidden"
                  style={{ backgroundColor: themeStyles.dropdownBg }}
                  role="menu"
                  aria-label="Account options"
                >
                  {/* Header */}
                  <div className="p-6 text-center border-b" style={{ borderColor: '#5f6368' }}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm" style={{ color: '#e8eaed' }}>kidhurshan@gmail.com</span>
                      <button 
                        onClick={() => setShowAccountDropdown(false)}
                        className="hover:opacity-75 transition-opacity text-xl"
                        style={{ color: '#9aa0a6' }}
                        aria-label="Close account menu"
                      >
                        ×
                      </button>
                    </div>
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-medium relative">
                      K
                    </div>
                    <h3 className="text-xl font-normal mb-4" style={{ color: '#e8eaed' }}>Hi, Kidhurshan!</h3>
                    <button 
                      className="px-6 py-2 border rounded-full text-sm transition-colors"
                      style={{ 
                        borderColor: '#5f6368',
                        color: '#e8eaed',
                        backgroundColor: 'transparent'
                      }}
                      role="menuitem"
                    >
                      Connect via Gmail
                    </button>
                  </div>

                  {/* Social Links for smaller screens */}
                  <div className="p-4 border-b lg:hidden" style={{ borderColor: '#5f6368' }}>
                    <h4 className="text-sm font-medium mb-3" style={{ color: '#e8eaed' }}>Connect</h4>
                    <div className="space-y-3">
                      <a
                        href="https://github.com/kidhurshan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                        style={{ color: '#e8eaed' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3c4043';
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
                        style={{ color: '#e8eaed' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3c4043';
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
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors text-left hover:bg-opacity-10"
                        style={{ 
                          color: '#e8eaed'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3c4043';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        role="menuitem"
                      >
                        <span className="text-lg">+</span>
                        <span className="text-sm">Add account</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors text-left hover:bg-opacity-10"
                        style={{ 
                          color: '#e8eaed'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3c4043';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        role="menuitem"
                      >
                        <span className="text-lg">↗</span>
                        <span className="text-sm">Sign out</span>
                      </button>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-center text-xs space-x-4" style={{ color: '#9aa0a6' }}>
                      <a href="#" className="hover:underline">Privacy Policy</a>
                      <span>•</span>
                      <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Responsive with proper alignment */}
        <div className="px-0 sm:px-6">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto px-4 sm:px-0" style={{ 
            marginLeft: window.innerWidth >= 768 ? '140px' : '0px' // Align with search bar on desktop
          }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.path;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.path, tab.name)}
                  className="flex items-center gap-1 sm:gap-2 py-3 border-b-2 transition-colors whitespace-nowrap"
                  style={{
                    borderColor: isActive ? themeStyles.tabActive : 'transparent',
                    color: isActive ? themeStyles.tabActive : themeStyles.tabInactive,
                    fontSize: 'clamp(12px, 3.5vw, 16px)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = themeStyles.tabHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = themeStyles.tabInactive;
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" style={{ fontSize: 'clamp(12px, 3vw, 16px)' }} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
          
          {/* Separation Line Below Navigation Links */}
          <div 
            className="h-px mt-0"
            style={{ 
              backgroundColor: themeStyles.headerBorder,
              marginLeft: '0px',
              marginRight: '0'
            }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;