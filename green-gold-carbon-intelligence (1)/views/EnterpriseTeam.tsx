
import React, { useState } from 'react';

const EnterpriseTeam: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'Enterprise Consultation',
    message: '',
    urgency: 'Normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-5xl mb-8">
          📬
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Message Transmitted</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto">
          Your inquiry has been routed to our Enterprise Relations team. A specialist will review your request and contact you within 24 business hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left: Contact Info & Value Prop */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">Direct Access to Sustainability Experts</h2>
            <p className="text-gray-500 leading-relaxed">
              Connect with our dedicated Enterprise Team for tailored roadmap planning, regulatory compliance support, and advanced platform training.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl">🌍</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Global Compliance</p>
                <p className="text-xs text-gray-500">Expert guidance on SECR, ESOS & more.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl">⚡</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Priority Engineering</p>
                <p className="text-xs text-gray-500">Custom API & integration support.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl">📊</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Strategic Reviews</p>
                <p className="text-xs text-gray-500">Quarterly performance deep-dives.</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-purple-200 relative overflow-hidden">
            <h4 className="font-bold mb-2">Dedicated Account Manager</h4>
            <p className="text-xs text-purple-200 mb-6">Available for Enterprise and High-Growth Professional tiers.</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm"></div>
              <div>
                <p className="text-sm font-bold">Your Success Lead</p>
                <p className="text-[10px] uppercase tracking-widest text-purple-300">Awaiting Assignment</p>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 pointer-events-none">🏢</div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 lg:p-14 border border-gray-100 shadow-2xl relative">
          <div className="absolute top-8 right-10">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Live Help Desk</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Submit Enterprise Inquiry</h3>
          <p className="text-gray-500 mb-10">Use this form to reach our specialist teams directly for priority assistance.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inquiry Subject</label>
                <select 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-medium text-gray-700"
                >
                  <option>Enterprise Consultation</option>
                  <option>API & Integration Support</option>
                  <option>Regulatory Compliance Query</option>
                  <option>Custom Reporting Request</option>
                  <option>Billing & Subscription</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Tier</label>
                <select 
                  value={formData.urgency}
                  onChange={e => setFormData({...formData, urgency: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-medium text-gray-700"
                >
                  <option>Normal</option>
                  <option>Urgent (2-4hr response)</option>
                  <option>Critical (Production Issue)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Message Details</label>
              <textarea 
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[180px] text-gray-700 leading-relaxed" 
                placeholder="Describe your organization's needs, project scope, or specific technical challenge..."
              />
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-xs text-gray-500 border border-slate-100">
              <span className="text-xl">ℹ️</span>
              <p>By submitting this form, your organizational telemetry data (current footprint and efficiency score) will be attached to the inquiry to help our specialists provide immediate context-aware advice.</p>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Dispatching Inquiry...
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span> Send to Enterprise Team
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseTeam;
