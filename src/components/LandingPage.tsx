import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Trophy, Clock, ArrowRight, Play, CheckCircle, Menu, X } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroImages = [
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Study Materials',
      description: 'Access thousands of practice questions organized by schools and departments'
    },
    {
      icon: Users,
      title: 'Expert-Curated Content',
      description: 'Questions and explanations prepared by university professors and experts'
    },
    {
      icon: Trophy,
      title: 'Track Your Progress',
      description: 'Monitor your performance and identify areas for improvement'
    },
    {
      icon: Clock,
      title: 'Flexible Study Modes',
      description: 'Choose between full test mode or guided practice with instant feedback'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Practice Questions' },
    { number: '50+', label: 'Universities' },
    { number: '25,000+', label: 'Students Helped' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-1.5 sm:p-2 rounded-lg">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Ethiopian Exit Exam</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">University Study Platform</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Login
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <nav className="px-4 py-4 space-y-3">
                <a 
                  href="#home" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a 
                  href="#features" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#contact" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Image Slideshow */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-orange-600/70" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Master Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Exit Exam
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
            Prepare for your Ethiopian University Exit Exam with comprehensive study materials, 
            expert-curated questions, and personalized learning paths designed for success.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 flex items-center space-x-3 w-full sm:w-auto justify-center"
            >
              <span>EXIT EXAM</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center">
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-400 w-4 sm:w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              About Our Platform
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              We are dedicated to helping Ethiopian university students excel in their exit examinations 
              through innovative technology and comprehensive study resources.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Empowering Student Success
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Our platform was created by educators and technology experts who understand the challenges 
                faced by Ethiopian university students. We provide a comprehensive solution that combines 
                traditional learning methods with modern technology.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Expertly curated questions from all major universities',
                  'Detailed explanations for every answer',
                  'Progress tracking and performance analytics',
                  'Mobile-friendly design for study anywhere'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Students studying"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-orange-500 text-white p-4 sm:p-6 rounded-2xl shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold">25K+</div>
                <div className="text-orange-100 text-sm sm:text-base">Students Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover the features that make our platform the best choice for your exit exam preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-orange-500 p-3 sm:p-4 rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Ace Your Exit Exam?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully prepared for their exit exams using our platform.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-2xl w-full sm:w-auto"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">Ethiopian Exit Exam</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">University Study Platform</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
                Empowering Ethiopian university students to excel in their exit examinations 
                through comprehensive study materials and innovative learning technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><button onClick={onGetStarted} className="hover:text-white transition-colors">Get Started</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Contact Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>info@ethiopianexitexam.com</li>
                <li>+251 11 123 4567</li>
                <li>Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 Ethiopian Exit Exam Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};