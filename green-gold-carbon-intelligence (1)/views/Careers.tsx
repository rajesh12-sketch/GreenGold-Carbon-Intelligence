import React from 'react';
import PublicNavbar from '../components/Public/PublicNavbar';
import Footer from '../components/Footer';

const Careers: React.FC = () => {
  const jobs = [
    { title: 'Senior AI Engineer', location: 'Remote / London', type: 'Full-time', dept: 'Engineering' },
    { title: 'Sustainability Analyst', location: 'London', type: 'Full-time', dept: 'ESG Operations' },
    { title: 'Growth Manager', location: 'Manchester', type: 'Full-time', dept: 'Sales' },
    { title: 'Frontend Developer (React)', location: 'Remote', type: 'Contract', dept: 'Engineering' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Build the Future of Carbon Intelligence.</h1>
            <p className="text-lg text-slate-500">Join a team of visionaries combining artificial intelligence with climate science to save the planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-3 inline-block">
                      {job.dept}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{job.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                  <span>📍 {job.location}</span>
                  <span>💰 Competitive Salary</span>
                </div>
                <button className="w-full py-4 border-2 border-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                  Apply for Role
                </button>
              </div>
            ))}
          </div>

          <div className="bg-emerald-600 rounded-[3rem] p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Don't see the right fit?</h2>
            <p className="mb-8 opacity-80">We're always looking for talented individuals who care about the climate.</p>
            <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl">
              Send a Speculative Application
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;