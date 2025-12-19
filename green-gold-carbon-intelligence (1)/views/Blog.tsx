import React from 'react';
import PublicNavbar from '../components/Public/PublicNavbar';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  const posts = [
    { title: 'The 2024 Care Sector Carbon Report', date: 'Nov 12, 2024', author: 'Dr. Emily Green', category: 'Compliance', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80' },
    { title: 'How AI is Slashing Energy Bills in SMEs', date: 'Nov 08, 2024', author: 'Markus Chen', category: 'Technology', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80' },
    { title: 'The Future of Renewable Subsidies in the UK', date: 'Oct 28, 2024', author: 'Sarah Watson', category: 'Market News', img: 'https://images.unsplash.com/photo-1466611653911-954ff21b6748?auto=format&fit=crop&w=400&q=80' },
    { title: 'Understanding Scope 3 Emissions', date: 'Oct 15, 2024', author: 'James Miller', category: 'Education', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">Carbon Intelligence.</h1>
              <p className="text-slate-500 text-lg mt-4">Insights, research, and analysis from the frontlines of sustainability.</p>
            </div>
            <div className="hidden md:block">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm">Subscribe to AI Daily</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-6 shadow-sm">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{post.date} • {post.author}</p>
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;