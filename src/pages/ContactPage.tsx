import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, ExternalLink, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Always use dark theme
  const themeStyles = {
    background: '#1f1f1f',
    text: '#dadce0',
    cardBg: '#28292a',
    cardBorder: 'transparent',
    linkColor: '#99c3ff',
    mutedText: '#9e9e9e',
    urlColor: '#34a853',
    inputBg: '#5f6368',
    inputBorder: '#5f6368',
    inputFocus: '#8ab4f8',
    headingColor: '#e8e8e8'
  };

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_734f09k';
  const EMAILJS_TEMPLATE_ID = 'template_1nwi4dc';
  const EMAILJS_PUBLIC_KEY = '600nWhWzRkSPRLiFR';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Kidhurshan',
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I\'ll get back to you within 24-48 hours.');
        
        // Reset form after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setStatusMessage('Sorry, there was an error sending your message. Please try again or contact me directly at d.kidhu@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'd.kidhu@gmail.com',
      href: 'mailto:d.kidhu@gmail.com',
      description: 'Best for detailed inquiries and collaboration'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Jaffna, Sri Lanka',
      href: '#',
      description: 'Open to remote opportunities worldwide'
    },
    {
      icon: MessageCircle,
      label: 'Response Time',
      value: '24-48 hours',
      href: '#',
      description: 'I typically respond within 1-2 business days'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/kidhurshan',
      color: themeStyles.linkColor,
      description: 'Professional network and career updates'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/kidhurshan',
      color: themeStyles.mutedText,
      description: 'Open source projects and code repositories'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Results Header */}
      <div className="mb-6">
        <p className="text-sm mb-2" style={{ color: themeStyles.mutedText }}>About 512 results (0.41 seconds)</p>
      </div>

      {/* Contact Info Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-lg sm:text-xl hover:underline cursor-pointer mb-2" style={{ color: themeStyles.linkColor }}>
          Contact Kidhurshan - Get In Touch
        </h1>
        <p className="text-sm mb-3" style={{ color: themeStyles.urlColor }}>d.kidhu@gmail.com</p>
        <p className="leading-relaxed text-sm sm:text-base mb-4" style={{ color: themeStyles.text }}>
          If you're interested in connecting professionally, reviewing my work, or exploring collaborations, feel free to reach out! 
          Whether you have a project in mind, want to discuss AI/ML opportunities, or just want to say hello, I'd love to hear from you.
        </p>
        <p className="leading-relaxed text-sm sm:text-base" style={{ color: themeStyles.text }}>
          I'm particularly interested in AI engineering roles, innovative AR/VR projects, and opportunities to work on 
          cutting-edge technology that makes a real impact. Let's connect and explore how we can work together!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="rounded-lg p-4 sm:p-6 border sticky top-8" style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
            {/* Profile Section */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl sm:text-2xl font-bold">
                K
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: themeStyles.headingColor }}>Kidhurshan</h2>
              <p className="text-sm mb-1" style={{ color: themeStyles.linkColor }}>Computer Engineering Student</p>
              <p className="text-xs" style={{ color: themeStyles.mutedText }}>AI/ML Enthusiast & Developer</p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4 mb-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.label} className="group">
                    <a
                      href={method.href}
                      className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-opacity-10"
                      style={{ 
                        color: themeStyles.text
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#5f6368';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" style={{ color: themeStyles.mutedText }} />
                      <div className="min-w-0 flex-1">
                        <div className="transition-colors text-sm sm:text-base" style={{ color: themeStyles.text }}>
                          {method.value}
                        </div>
                        <div className="text-xs" style={{ color: themeStyles.mutedText }}>{method.description}</div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="border-t pt-6" style={{ borderColor: themeStyles.cardBorder }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: themeStyles.mutedText }}>Connect Online</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-opacity-10"
                      style={{ 
                        color: link.color
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#5f6368';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-sm sm:text-base block" style={{ color: themeStyles.text }}>{link.label}</span>
                        <span className="text-xs" style={{ color: themeStyles.mutedText }}>{link.description}</span>
                      </div>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: themeStyles.cardBorder }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium" style={{ color: themeStyles.headingColor }}>Available for opportunities</span>
              </div>
              <p className="text-xs" style={{ color: themeStyles.mutedText }}>
                Open to AI/ML roles, internships, and collaborative projects
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="rounded-lg p-4 sm:p-6 border" style={{ backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
            <h3 className="text-base sm:text-lg font-semibold mb-6" style={{ color: themeStyles.headingColor }}>Send a Message</h3>
            
            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus === 'success' ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-red-500/30'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                  {statusMessage}
                </p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: themeStyles.headingColor }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#4d5156',
                      borderColor: '#5f6368',
                      color: themeStyles.text
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#5f6368';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = '#4d5156';
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: themeStyles.headingColor }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#4d5156',
                      borderColor: '#5f6368',
                      color: themeStyles.text
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#5f6368';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = '#4d5156';
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: themeStyles.headingColor }}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#4d5156',
                    borderColor: '#5f6368',
                    color: themeStyles.text
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = '#5f6368';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#4d5156';
                  }}
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: themeStyles.headingColor }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all duration-200 resize-vertical text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#4d5156',
                    borderColor: '#5f6368',
                    color: themeStyles.text
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = '#5f6368';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#4d5156';
                  }}
                  placeholder="Tell me about your project, collaboration idea, job opportunity, or just say hello!"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg 
                           transition-colors duration-200 flex items-center justify-center gap-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs mt-2" style={{ color: themeStyles.mutedText }}>
                  Your message will be sent directly to my email inbox
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;