import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, useParams, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SolarIncentives } from './pages/SolarIncentives';
import { HowSolarWorks } from './pages/HowSolarWorks';
import { Financing } from './pages/Financing';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { ServiceTemplate } from './components/ServiceTemplate';
import { CityTemplate } from './components/CityTemplate';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorGlow } from './components/CursorGlow';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { siteData } from './data/siteData';
import { motion } from 'motion/react';
import { AddersPage } from './pages/AddersPage';
import { ServiceRequestPage } from './pages/ServiceRequestPage';
import { CreditApplicationPage } from './pages/CreditApplicationPage';
import { CreditRepairPage } from './pages/CreditRepairPage';
import { DealSubmissionPage } from './pages/DealSubmissionPage';
import { HIAPage } from './pages/HIAPage';
import { LoginsPage } from './pages/LoginsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SiteSurveyPage } from './pages/SiteSurveyPage';
import { ThankYouPage } from './pages/ThankYouPage';



import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';


// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Dynamic Service Page Wrapper
const DynamicServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = siteData.services.find(s => s.slug === slug);
  
  if (!service) return <Navigate to="/services/installation" replace />;
  
  return <ServiceTemplate service={service} />;
};

// Dynamic Location Page Wrapper
const DynamicLocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = siteData.locations.find(l => l.slug === slug);
  
  if (!location) return <Navigate to="/" replace />;
  
  return <CityTemplate location={location} />;
};

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <CursorGlow />
      <div className="flex flex-col min-h-screen selection:bg-brand-gold selection:text-brand-dark">
        <Navbar />
        <StickyMobileCTA />

        <motion.div 
          initial={{ opacity: 0, filter: 'brightness(2) saturate(0)' }}
          animate={isLoaded ? { 
            opacity: 1, 
            filter: 'brightness(1) saturate(1)',
          } : { opacity: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow flex flex-col relative z-0"
        >
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Dynamic Service Routes */}
              <Route path="/services/:slug" element={<DynamicServicePage />} />
              
              {/* Legacy/Static Service Pages if needed, otherwise redirected by dynamic handler */}
              <Route path="/services/incentives" element={<SolarIncentives />} />
              <Route path="/services/how-it-works" element={<HowSolarWorks />} />
              
              {/* Dynamic Location Routes */}
              <Route path="/locations/:slug" element={<DynamicLocationPage />} />
              
              <Route path="/financing" element={<Financing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Internal Utility Pages (Hidden) */}
              <Route path="/adders" element={<AddersPage />} />
              <Route path="/service" element={<ServiceRequestPage />} />
              <Route path="/credit" element={<CreditApplicationPage />} />
              <Route path="/creditrepair" element={<CreditRepairPage />} />
              <Route path="/dealsubmission" element={<DealSubmissionPage />} />
              <Route path="/hia" element={<HIAPage />} />
              <Route path="/logins" element={<LoginsPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/sitesurvey" element={<SiteSurveyPage />} />
              <Route path="/thankyou" element={<ThankYouPage />} />


            </Routes>
          </div>
          <Footer />
        </motion.div>
      </div>
    </Router>
  );
}
