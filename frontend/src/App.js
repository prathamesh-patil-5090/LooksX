import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Barber from "./components/Barber";
import MobileBarber from "./components/MobileBarber";
import Quote from "./components/Quote";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterShop from "./components/RegisterShop";
import CustomerDashboard from './components/CustomerDashboard';
import BarberDashboard from './components/BarberDashboard';
import Profile from './components/Profile';
import { UserProvider } from './context/UserContext';
import Map from './components/Map/Map';
import useIsMobile from './hooks/useIsMobile';
import MobileServices from "./components/MobileServices";
import MobileIntro from "./components/MobileIntro";
import MobilePricing from "./components/MobilePricing";
import MobileHeroSection from "./components/MobileHeroSection";
import MobileBlog from "./components/MobileBlog";

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
