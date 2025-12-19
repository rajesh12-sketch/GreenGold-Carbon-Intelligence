import React, { useState } from 'react';
import PublicNavbar from '../components/Public/PublicNavbar';
import Footer from '../components/Footer';
import { GoogleGenAI } from "@google/genai";

const Contact: React.FC = () => {
  const [addressQuery, setAddressQuery] = useState('');
  const [hubs, setHubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const findLocalHubs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressQuery) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find the nearest solar energy installers or sustainability consultancy offices near ${addressQuery}.`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });
      setHubs(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending to the "Admin Panel" using LocalStorage
    const newInquiry = {
      id: `INQ-${Math.floor(Math.random() * 9000) + 1000}`,
      senderName: `${formData.firstName} ${formData.lastName}`,
      senderEmail: formData.email,
      subject: formData.subject,
      message: formData.message,
      urgency: 'Normal',
      status: 'New',
      timestamp: new Date().toLocaleString(),
      replies: []
    };

    // Get existing inquiries from storage or empty array
    const existingStr = localStorage.getItem('ggci_local_inquiries') || '[]';
    const existing = JSON.parse(existingStr);
    
    // Save new inquiry
    localStorage.setItem('ggci_local_inquiries', JSON.stringify([newInquiry, ...existing]));

    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Get in Touch.</h1>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Whether you're a care home looking to audit your bills or an enterprise seeking a global carbon roadmap, our team is ready.
            </p>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[3rem] text-center animate-in zoom-in">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Message Transmitted</h3>
                <p className="text-emerald-700 mb-6">Your inquiry has been sent to our Enterprise Relations team. We'll be in touch soon.</p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="First Name" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" 
                  />
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Last Name" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" 
                  />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Work Email" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" 
                />
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-500"
                >
                  <option>General Inquiry</option>
                  <option>Enterprise Consultation</option>
                  <option>API & Integration Support</option>
                  <option>Regulatory Compliance</option>
                </select>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help?" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none h-40 focus:ring-4 focus:ring-emerald-500/10 transition-all" 
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Transmitting...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-12">
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <span>📍</span> Find Local Partners
              </h3>
              <p className="text-sm text-emerald-700 mb-6">Enter your location to find verified sustainability hubs and installers near you powered by Gemini Grounding.</p>
              
              <form onSubmit={findLocalHubs} className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={addressQuery}
                  onChange={(e) => setAddressQuery(e.target.value)}
                  placeholder="Your City or Postcode..." 
                  className="flex-grow p-4 rounded-2xl bg-white border border-emerald-200 outline-none text-sm" 
                />
                <button 
                  disabled={loading}
                  className="bg-emerald-600 text-white px-6 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
                >
                  {loading ? '...' : 'Search'}
                </button>
              </form>

              <div className="space-y-3">
                {hubs.length > 0 ? hubs.map((hub, i) => (
                  hub.maps && (
                    <a key={i} href={hub.maps.uri} target="_blank" className="block p-4 bg-white rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                      <p className="font-bold text-xs text-emerald-900">{hub.maps.title}</p>
                      <p className="text-[10px] text-emerald-500 underline mt-1">View on Maps</p>
                    </a>
                  )
                )) : (
                  <div className="text-[10px] text-emerald-600 text-center opacity-50 py-4">No local results yet.</div>
                )}
              </div>
            </div>

            <div className="p-10">
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Direct Contact</h4>
              <p className="text-slate-500 text-sm mb-2">📞 +44 20 7946 0000</p>
              <p className="text-slate-500 text-sm mb-2">✉️ contact@greengoldcarbon.com</p>
              <p className="text-slate-500 text-sm">🏢 123 Green Lane, London, UK</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;