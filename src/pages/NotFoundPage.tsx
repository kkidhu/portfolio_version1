import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, User, Code, Award, Mail } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#dadce0',
    cardBg: '#28292a',
    cardBorder: 'transparent',
    linkColor: '#8ab4f8',
    mutedText: '#9aa0a6',
    headingColor: '#e8eaed'
  };

  const suggestions = [
    { text: 'about', icon: User, path: 'about', description: 'Learn more about Kidhurshan' },
    { text: 'projects', icon: Code, path: 'projects', description: 'See featured work and development portfolio' },
    { text: 'skills', icon: Award, path: 'skills', description: 'Explore technical expertise and certifications' },
    { text: 'contact', icon: Mail, path: 'contact', description: 'Find ways to get in touch' },
  ];

  const handleSuggestionClick = (path: string) => {
    navigate(`/search/${path}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Content - Aligned with About navlink */}
      <div style={{ marginLeft: window.innerWidth >= 768 ? '140px' : '0px' }}>
        {/* Search Result Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: themeStyles.text }}>
            Your search - <span className="font-medium" style={{ color: themeStyles.linkColor }}>{query}</span> - did not match any documents.
          </p>
        </motion.div>

        {/* Suggestions - Plain text format like Google */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-sm sm:text-base font-normal mb-4" style={{ color: themeStyles.text }}>
            Suggestions:
          </h3>
          <ul className="space-y-2 ml-4">
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={suggestion.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-start"
                style={{ color: themeStyles.text }}
              >
                <span className="mr-2">•</span>
                <div>
                  <span>Try searching for </span>
                  <button
                    onClick={() => handleSuggestionClick(suggestion.path)}
                    className="hover:underline"
                    style={{ color: themeStyles.linkColor }}
                  >
                    "{suggestion.text}"
                  </button>
                  <span> to {suggestion.description}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* GIF and Buttons Container */}
        <div className="flex flex-col items-center lg:items-start">
          {/* Google Blue GIF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <img 
                src="/Google_blue.gif" 
                alt="Google character fishing"
                className="w-full h-auto"
                style={{
                  maxHeight: window.innerWidth < 1024 ? '200px' : '300px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </motion.div>

          {/* Action Buttons - Below GIF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-3 sm:gap-4 flex-col sm:flex-row"
          >
            <button
              onClick={() => navigate('/')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center gap-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base
                       min-w-[140px] sm:min-w-[160px]"
            >
              <Home className="h-4 w-4" />
              Go to Homepage
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 text-sm sm:text-base
                       min-w-[140px] sm:min-w-[160px]"
              style={{ 
                backgroundColor: themeStyles.cardBg,
                color: themeStyles.text,
                border: `1px solid ${themeStyles.cardBorder}`
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;