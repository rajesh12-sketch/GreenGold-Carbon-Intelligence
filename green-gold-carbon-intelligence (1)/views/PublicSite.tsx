import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Public/Hero';
import Features from '../components/Public/Features';
import Footer from '../components/Footer';
import PublicNavbar from '../components/Public/PublicNavbar';

const PublicSite: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow pt-16">
        <Hero onDemo={() => navigate('/login/user')} />
        
        <section id="features" className="py-20 bg-white">
          <Features />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PublicSite;