
import React, { useState } from 'react';
import { searchUKCompany } from '../../services/geminiService';

interface HeroProps {
  onDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDemo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchUKCompany(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            {/* Integrated Search Bar at the top of Hero section */}
            <div className="mb-12 animate-in slide-in-from-top duration-700">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">UK Company Intelligence</p>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row shadow-2xl rounded-2xl overflow-hidden border border-gray-100 max-w-xl">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search UK Companies House..."
                  className="flex-grow p-4 outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 font-bold transition-all disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : 'Explore'}
                </button>
              </form>
              
              {searchResults && (
                <div className="mt-4 p-6 bg-emerald-50 rounded-2xl text-left shadow-lg border border-emerald-100 max-w-xl animate-in fade-in zoom-in duration-300">
                  <h4 className="text-emerald-900 font-bold text-sm mb-2">Search Result</h4>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{searchResults.text}</p>
                  {searchResults.sources && searchResults.sources.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {searchResults.sources.map((chunk: any, i: number) => (
                        chunk.web && (
                          <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white text-emerald-700 px-3 py-1 rounded-full whitespace-nowrap border border-emerald-100 hover:bg-emerald-100 transition-colors">
                            {chunk.web.title || 'Source'}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">AI-powered Carbon</span>{' '}
                <span className="block text-emerald-600 xl:inline">Intelligence Platform</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Drive operational efficiency and meet net-zero goals. Starting with care environments and expanding to SMEs, restaurants, and enterprise.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onDemo}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
                  >
                    Request Early Access
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={onDemo}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10"
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Clean Energy"
        />
      </div>
    </div>
  );
};

export default Hero;
