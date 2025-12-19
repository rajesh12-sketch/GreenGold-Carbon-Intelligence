import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Brand/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="mb-4">
              <Logo light={true} />
            </div>
            <p className="max-w-xs mt-4">Helping organizations measure carbon emissions, reduce costs, and optimize operations for a sustainable future.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login/user" className="hover:text-emerald-500 transition-colors">Dashboard</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-500 transition-colors">Carbon Intel</Link></li>
              <li><Link to="/login/user" className="hover:text-emerald-500 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-500 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-[10px] font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Green Gold Carbon Intelligence Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;