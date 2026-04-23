import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { NiraContext } from '../context/NiraContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addSOSAlert } = useContext(NiraContext);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Como funciona', path: '/como-funciona' },
    { name: 'Conteúdos', path: '/conteudos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-main font-sans selection:bg-brand-primary/30 selection:text-white">
      {/* Navbar with Glassmorphism */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}