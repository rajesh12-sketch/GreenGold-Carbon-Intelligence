
import React, { useState } from 'react';

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  features: string[];
  cta: string;
  recommended: boolean;
  color: string;
}

const Subscription: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'checkout' | 'sales' | 'success'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  
  // Sales form state
  const [salesForm, setSalesForm] = useState({
    companyName: '',
    industry: 'Healthcare',
    teamSize: '100-500',
    interest: 'Enterprise Reporting',
    message: ''
  });

  const plans: Plan[] = [
    {
      name: 'Starter',
      description: 'Ideal for small SMEs just starting their net-zero journey.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ['Basic Carbon Tracking', 'Single User Access', 'Standard Reports', 'Email Support'],
      cta: 'Current Plan',
      recommended: false,
      color: 'bg-gray-50 text-gray-600 border-gray-100'
    },
    {
      name: 'Professional',
      description: 'Advanced AI insights and unlimited resource tracking.',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: ['All Starter Features', 'AI Studio Access', 'Unlimited Bills & Logs', 'Multi-user Management', 'Custom Dashboards'],
      cta: 'Upgrade to Pro',
      recommended: true,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      name: 'Enterprise',
      description: 'Full suite for multi-site organizations with deep compliance.',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      features: ['All Pro Features', 'SSO & Advanced Security', 'API Access', 'Dedicated Sustainability Manager', '24/7 Priority Support'],
      cta: 'Contact Sales',
      recommended: false,
      color: 'bg-purple-50 text-purple-900 border-purple-200'
    }
  ];

  const handleSelectPlan = (plan: Plan) => {
    if (plan.name === 'Starter') return;
    if (plan.name === 'Enterprise') {
      setPaymentStep('sales');
      return;
    }
    setSelectedPlan(plan);
    setPaymentStep('checkout');
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
    }, 2500);
  };

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
    }, 2000);
  };

  const currentPrice = selectedPlan 
    ? (billingCycle === 'monthly' ? (selectedPlan.monthlyPrice as number) : (selectedPlan.yearlyPrice as number)) 
    : 0;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Scale Your Impact</h2>
        <p className="text-gray-500 text-lg">Choose the intelligence tier that fits your organization's sustainability goals.</p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center pt-4">
          <div className="bg-white border border-gray-200 p-1 rounded-2xl flex items-center shadow-sm">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Yearly
              <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Save 2 months</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative rounded-3xl p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${plan.color} ${plan.recommended ? 'shadow-xl scale-105 z-10' : 'bg-white'}`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm opacity-60 h-10">{plan.description}</p>
            </div>
            
            <div className="mb-8">
              <span className="text-4xl font-extrabold">
                {typeof plan.monthlyPrice === 'number' ? `£${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}` : plan.monthlyPrice}
              </span>
              {typeof plan.monthlyPrice === 'number' && <span className="text-sm opacity-60">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>}
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="opacity-80">{f}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSelectPlan(plan)}
              className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${
                plan.recommended 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' 
                : (plan.name === 'Enterprise' ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-slate-100')
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Subscription/Sales Modal */}
      {paymentStep !== 'selection' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in duration-300">
            
            {paymentStep === 'checkout' && (
              <div className="flex flex-col md:flex-row">
                {/* Left Side: Order Summary */}
                <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-gray-100">
                  <button 
                    onClick={() => setPaymentStep('selection')}
                    className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-bold mb-8"
                  >
                    <span>←</span> Back to Plans
                  </button>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{selectedPlan?.name} Plan ({billingCycle})</span>
                      <span className="font-bold">£{currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">VAT (20%)</span>
                      <span className="font-bold">£{(currentPrice * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total Due</span>
                      <span className="text-2xl font-extrabold text-emerald-600">£{(currentPrice * 1.2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="w-full md:w-2/3 p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h3>
                  <p className="text-gray-500 mb-8">Choose your preferred payment method.</p>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}><span className="text-2xl">💳</span><span className="text-[10px] font-bold">Card</span></button>
                    <button onClick={() => setPaymentMethod('paypal')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'paypal' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}><span className="text-2xl">🅿️</span><span className="text-[10px] font-bold">PayPal</span></button>
                    <button onClick={() => setPaymentMethod('apple')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'apple' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}><span className="text-2xl">🍎</span><span className="text-[10px] font-bold">Apple Pay</span></button>
                  </div>

                  {paymentMethod === 'card' && (
                    <form onSubmit={handlePurchase} className="space-y-4">
                      <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" placeholder="Cardholder Name" />
                      <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-mono" placeholder="•••• •••• •••• ••••" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" required className="p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-mono" placeholder="MM / YY" />
                        <input type="text" required className="p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-mono" placeholder="CVC" />
                      </div>
                      <button type="submit" disabled={isProcessing} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold mt-6 hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                        {isProcessing ? 'Processing...' : 'Pay Securely'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {paymentStep === 'sales' && (
              <div className="flex flex-col md:flex-row">
                 {/* Left Side: Enterprise Banner */}
                 <div className="w-full md:w-1/3 bg-purple-900 p-10 text-white flex flex-col justify-between">
                    <div>
                      <button onClick={() => setPaymentStep('selection')} className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold mb-8"><span>←</span> Back</button>
                      <h3 className="text-3xl font-bold mb-4">Enterprise Sustainability</h3>
                      <p className="text-purple-200 text-sm leading-relaxed mb-6">Unlock tailored analytics, full compliance mapping, and dedicated account management for your global organization.</p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-2"><span>✨</span> Custom API Access</li>
                        <li className="flex gap-2"><span>🛡️</span> Advanced Security (SSO)</li>
                        <li className="flex gap-2"><span>🌍</span> Multi-site Reporting</li>
                      </ul>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs">
                      <p className="font-bold mb-1">Trusted by Leaders</p>
                      <p className="opacity-60">Powering ESG strategies for the world's most innovative companies.</p>
                    </div>
                 </div>

                 {/* Right Side: Inquiry Form */}
                 <div className="w-full md:w-2/3 p-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Our Sales Team</h3>
                    <p className="text-gray-500 mb-8">Submit your details and a representative will reach out to build your custom roadmap.</p>
                    
                    <form onSubmit={handleSalesSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Name</label>
                          <input 
                            type="text" required 
                            value={salesForm.companyName}
                            onChange={e => setSalesForm({...salesForm, companyName: e.target.value})}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20" 
                            placeholder="Enterprise Ltd" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Industry</label>
                          <select 
                            value={salesForm.industry}
                            onChange={e => setSalesForm({...salesForm, industry: e.target.value})}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                          >
                            <option>Healthcare</option><option>Manufacturing</option><option>Technology</option><option>Retail</option><option>Finance</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Team Size</label>
                          <select 
                            value={salesForm.teamSize}
                            onChange={e => setSalesForm({...salesForm, teamSize: e.target.value})}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                          >
                            <option>10-50</option><option>51-250</option><option>251-1000</option><option>1000+</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Interest</label>
                          <select 
                            value={salesForm.interest}
                            onChange={e => setSalesForm({...salesForm, interest: e.target.value})}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                          >
                            <option>Enterprise Reporting</option><option>Carbon Credits</option><option>API Integration</option><option>Compliance Audit</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Message (Optional)</label>
                        <textarea 
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none h-24" 
                          placeholder="Tell us about your specific sustainability needs..."
                          value={salesForm.message}
                          onChange={e => setSalesForm({...salesForm, message: e.target.value})}
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full py-5 bg-purple-600 text-white rounded-2xl font-bold mt-4 hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95 disabled:opacity-50"
                      >
                        {isProcessing ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                      </button>
                    </form>
                 </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="w-full p-16 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-5xl">✨</div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-extrabold text-gray-900">{selectedPlan ? 'Welcome Aboard!' : 'Inquiry Received'}</h3>
                  <p className="text-lg text-gray-500">
                    {selectedPlan 
                      ? `Your organizational dashboard has been upgraded to ${selectedPlan.name}.` 
                      : 'Our enterprise team has received your request and will contact you within 24 hours.'}
                  </p>
                </div>
                <button 
                  onClick={() => setPaymentStep('selection')}
                  className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-bold mb-4">Enterprise Custom</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Require advanced integrations, multi-entity reporting, or custom audit trails? Our enterprise team can build a tailored roadmap for your global sustainability strategy.
          </p>
          <button 
            onClick={() => setPaymentStep('sales')}
            className="bg-emerald-500 hover:bg-emerald-400 px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-emerald-900/40"
          >
            Talk to Enterprise Team
          </button>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent hidden lg:block"></div>
        <div className="absolute -right-20 -bottom-20 text-[20rem] opacity-5 select-none pointer-events-none">🏢</div>
      </div>
    </div>
  );
};

export default Subscription;
