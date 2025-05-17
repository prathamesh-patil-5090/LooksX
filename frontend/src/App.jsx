import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Intro from "./components/Intro.jsx";
import Services from "./components/Services.jsx";
import Barber from "./components/Barber.jsx";
import MobileBarber from "./components/MobileBarber.jsx";
import Quote from "./components/Quote.jsx";
import Pricing from "./components/Pricing.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import RegisterShop from "./components/RegisterShop.jsx";
import CustomerDashboard from './components/CustomerDashboard.jsx';
import BarberDashboard from './components/BarberDashboard.jsx';
import Profile from './components/Profile.jsx';
import { UserProvider } from './context/UserContext';
import Map from './components/Map/Map.jsx';
import useIsMobile from './hooks/useIsMobile.jsx';
import MobileServices from "./components/MobileServices.jsx";
import MobileIntro from "./components/MobileIntro.jsx";
import MobilePricing from "./components/MobilePricing.jsx";
import MobileHeroSection from "./components/MobileHeroSection.jsx";
import MobileBlog from "./components/MobileBlog.jsx";

const Home = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile ? <MobileHeroSection /> : <HeroSection />}
      {isMobile ? <MobileIntro /> : <Intro />}
      {isMobile ? <MobileServices /> : <Services />}
      {isMobile ? <MobileBarber /> : <Barber />}
      <Quote />
      {isMobile ? <MobilePricing /> : <Pricing />}
    </>
  );
};

const About = () => <Intro />;

function App() {
  const isMobile = useIsMobile();
  return (
    <UserProvider>
      <Router>
        <div className="relative w-full overflow-x-hidden">
          <Navbar />
          <main className="relative w-full overflow-x-hidden max-w-[100vw]">
            <div className="overflow-x-hidden w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={isMobile ? <MobileIntro /> : <Intro />} />
                <Route path="/services" element={isMobile ? <MobileServices /> : <Services />} />
                <Route path="/blog" element={isMobile ? <MobileBlog /> : <Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/appointment" element={<Map />} />
                {/* Auth routes moved to end */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-shop" element={<RegisterShop />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/barber-dashboard" element={<BarberDashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
