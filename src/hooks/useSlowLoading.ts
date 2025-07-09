import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSlowLoading = (threshold: number = 800) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let loadingTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    // Start loading state
    setIsLoading(true);
    setShowLoading(false);

    // Only show loading animation if it takes longer than threshold
    loadingTimer = setTimeout(() => {
      if (isLoading) {
        setShowLoading(true);
      }
    }, threshold);

    // Simulate page load completion
    const handlePageLoad = () => {
      setIsLoading(false);
      setShowLoading(false);
      clearTimeout(loadingTimer);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    // Cleanup function
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('load', handlePageLoad);
      
      // Hide loading after a short delay to prevent flashing
      hideTimer = setTimeout(() => {
        setIsLoading(false);
        setShowLoading(false);
      }, 100);
    };
  }, [location.pathname, threshold, isLoading]);

  return { isLoading, showLoading };
};

export default useSlowLoading;