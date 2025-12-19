import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicSite from './views/PublicSite';
import DashboardApp from './views/DashboardApp';
import UserLogin from './views/UserLogin';
import AdminLogin from './views/AdminLogin';
import About from './views/About';
import Careers from './views/Careers';
import Contact from './views/Contact';
import Blog from './views/Blog';
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    role: UserRole | null;
    user: User | null;
    companyId?: string;
  }>({
    isLoggedIn: false,
    role: null,
    user: null
  });

  const handleLogin = (user: User, companyId?: string) => {
    setAuthState({
      isLoggedIn: true,
      role: user.role,
      user,
      companyId
    });
  };

  const handleLogout = () => {
    setAuthState({ isLoggedIn: false, role: null, user: null });
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login/user" element={<UserLogin onLogin={handleLogin} />} />
        <Route path="/login/admin" element={<AdminLogin onLogin={handleLogin} />} />
        <Route 
          path="/dashboard/*" 
          element={authState.isLoggedIn ? (
            <DashboardApp 
              role={authState.role!} 
              user={authState.user!} 
              companyId={authState.companyId}
              onLogout={handleLogout} 
            />
          ) : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;