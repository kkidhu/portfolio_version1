import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/LoadingAnimation';
import useSlowLoading from './hooks/useSlowLoading';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

function App() {
  const { showLoading } = useSlowLoading(800); // Show loading after 800ms delay

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Product_Sans',sans-serif]">
      <LoadingAnimation isVisible={showLoading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Layout />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;