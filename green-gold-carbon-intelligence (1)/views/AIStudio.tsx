
import React, { useState } from 'react';
import { generateSustainabilityImage, generateSustainabilityVideo } from '../services/geminiService';

// Fix: Removed declare global to avoid clashing with the component name 'AIStudio' 
// and potential 'identical modifiers' errors. Using a helper for type safety.
const getAiStudio = () => (window as any).aistudio;

const AIStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'creative' | 'live' | 'search'>('creative');
  const [prompt, setPrompt] = useState('');
  const [genImg, setGenImg] = useState<string | null>(null);
  const [genVid, setGenVid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<"1K" | "2K" | "4K">('1K');
  const [ratio, setRatio] = useState('16:9');
  
  // Fix: Use the type-safe helper to access the pre-configured aistudio object
  const ensureApiKeySelection = async () => {
    const aistudio = getAiStudio();
    if (aistudio && !(await aistudio.hasSelectedApiKey())) {
      await aistudio.openSelectKey();
    }
  };

  const handleGenerateImg = async () => {
    await ensureApiKeySelection();
    setLoading(true);
    try {
      const img = await generateSustainabilityImage(prompt, size, ratio);
      setGenImg(img);
    } catch (e: any) { 
      console.error(e);
      // Handle key issues by prompting for selection again as per guidelines
      if (e?.message?.includes("Requested entity was not found.")) {
         const aistudio = getAiStudio();
         if (aistudio) await aistudio.openSelectKey();
      }
    }
    finally { setLoading(false); }
  };

  const handleGenerateVid = async () => {
    await ensureApiKeySelection();
    setLoading(true);
    try {
      const vidUrl = await generateSustainabilityVideo(prompt, genImg || undefined);
      setGenVid(vidUrl);
    } catch (e: any) { 
      console.error(e); 
      // Handle key issues by prompting for selection again as per guidelines
      if (e?.message?.includes("Requested entity was not found.")) {
         const aistudio = getAiStudio();
         if (aistudio) await aistudio.openSelectKey();
      }
    }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI Intelligence Studio</h2>
          <p className="text-xs text-gray-500">
            Pro models require a <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-emerald-600 underline hover:text-emerald-700">paid API key</a>.
          </p>
        </div>
        <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded-xl overflow-x-auto max-w-full">
          {(['creative', 'live', 'search'] as const).map(tool => (
            <button 
              key={tool}
              onClick={() => setActiveTool(tool)} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTool === tool ? 'bg-slate-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {tool === 'creative' ? 'Creative Suite' : tool === 'live' ? 'Live Session' : 'Eco-Search'}
            </button>
          ))}
        </div>
      </div>

      {activeTool === 'creative' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 h-fit">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Asset Creation</h3>
              <button 
                onClick={() => getAiStudio()?.openSelectKey()}
                className="text-[10px] bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-bold transition-colors"
              >
                Switch Key
              </button>
            </div>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your sustainability vision..."
              className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Resolution</label>
                <select value={size} onChange={(e) => setSize(e.target.value as any)} className="w-full p-3 bg-gray-50 rounded-xl text-xs outline-none border border-transparent focus:border-gray-200">
                  <option value="1K">1K (Standard)</option>
                  <option value="2K">2K (High-Def)</option>
                  <option value="4K">4K (Ultra)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Ratio</label>
                <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl text-xs outline-none border border-transparent focus:border-gray-200">
                  <option>1:1</option><option>16:9</option><option>9:16</option><option>4:3</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleGenerateImg}
                disabled={loading || !prompt}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm"
              >
                {loading ? 'Processing...' : 'Generate 3.0 Pro Image'}
              </button>
              <button 
                onClick={handleGenerateVid}
                disabled={loading || !prompt}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl shadow-emerald-100 active:scale-95 text-sm"
              >
                {loading ? 'Processing...' : 'Animate with Veo 3'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-4 rounded-3xl border border-dashed border-gray-200 min-h-[400px] flex items-center justify-center relative overflow-hidden group shadow-inner">
              {loading && (
                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-20 animate-in fade-in backdrop-blur-sm">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-sm font-bold text-gray-900">AI is crafting your vision...</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Please stand by</p>
                </div>
              )}
              {genImg ? (
                <img src={genImg} className="max-w-full rounded-2xl shadow-2xl animate-in zoom-in duration-500" alt="AI Generated" />
              ) : (
                <div className="text-center text-gray-300">
                  <span className="text-7xl block mb-6 transition-transform group-hover:scale-110 duration-500">🎨</span>
                  <p className="font-bold text-sm uppercase tracking-widest">Workspace Ready</p>
                </div>
              )}
            </div>

            {genVid && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Veo 3 Production</h4>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">1080p AI Video</span>
                </div>
                <video controls className="w-full rounded-2xl shadow-lg" src={genVid} />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTool === 'live' && (
        <div className="max-w-3xl mx-auto bg-slate-900 rounded-[3rem] p-8 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500"></div>
          <div className="w-24 h-24 bg-emerald-600 rounded-full mx-auto flex items-center justify-center animate-pulse mb-8 border-4 border-emerald-400/20 shadow-2xl shadow-emerald-500/20">
            <span className="text-4xl">🎙️</span>
          </div>
          <h3 className="text-3xl font-extrabold mb-4 tracking-tight">Gemini Live Conversations</h3>
          <p className="text-slate-400 mb-10 leading-relaxed max-w-md mx-auto">
            Experience near-zero latency voice interaction. Consult our AI on supply chain ethics, regulatory shifts, or real-time emission strategy.
          </p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-extrabold hover:bg-emerald-50 transition-all shadow-xl active:scale-95 text-lg">
            Initialize Session
          </button>
          <p className="mt-10 text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            Native Audio Integration
          </p>
        </div>
      )}

      {activeTool === 'search' && (
        <div className="bg-white p-8 sm:p-12 rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl mx-auto text-center animate-in fade-in duration-700">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Grounding Engine 2.5</div>
          <h3 className="text-3xl font-extrabold mb-4 text-gray-900 tracking-tight">Real-Time Sustainability Search</h3>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Query the live web for renewable energy subsidies, local solar installers, or the latest carbon credit pricing.
          </p>
          <div className="relative max-w-xl mx-auto mb-16">
            <input type="text" placeholder="e.g. Current B Corp certification requirements 2024..." className="w-full p-5 pr-20 border-2 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 border-gray-100 focus:border-blue-500 transition-all" />
            <button className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white px-6 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95">Search</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 select-none grayscale">
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 font-bold text-xs uppercase tracking-widest">Market Context</div>
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 font-bold text-xs uppercase tracking-widest">Compliance News</div>
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 font-bold text-xs uppercase tracking-widest">Verified Sources</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStudio;
