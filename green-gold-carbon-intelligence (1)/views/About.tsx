import React from 'react';
import PublicNavbar from '../components/Public/PublicNavbar';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Decarbonizing the world, one organization at a time.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-12">
            Green Gold Carbon Intelligence was founded with a singular vision: to make sustainability accessible, measurable, and profitable for every enterprise. We started in the healthcare and care sector, identifying high-impact waste and transforming it into green efficiency.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Why "Green Gold"?</h3>
              <p className="text-slate-500 leading-relaxed">
                We believe that carbon reduction isn't just a regulatory burden—it's "Gold". By optimizing resources, organizations can save millions while protecting the planet. Our AI turns your green initiatives into financial and environmental assets.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">AI-First Intelligence</h3>
              <p className="text-slate-500 leading-relaxed">
                Utilizing the latest Gemini Pro models, we analyze complex supply chains and energy data in real-time, providing actionable roadmaps that go beyond simple spreadsheets.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl mb-4">💎</div>
                  <h4 className="font-bold mb-2">Integrity</h4>
                  <p className="text-xs text-slate-400">Verified data only. No greenwashing.</p>
                </div>
                <div>
                  <div className="text-3xl mb-4">🚀</div>
                  <h4 className="font-bold mb-2">Innovation</h4>
                  <p className="text-xs text-slate-400">Leading with cutting-edge AI.</p>
                </div>
                <div>
                  <div className="text-3xl mb-4">🤝</div>
                  <h4 className="font-bold mb-2">Impact</h4>
                  <p className="text-xs text-slate-400">Measurable results for the real world.</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 text-[20rem] opacity-5 pointer-events-none select-none italic font-black">GGCI</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;