import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';


// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/Home';
import ComoFunciona from '../pages/ComoFunciona';
import Conteudos from '../pages/Conteudos';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Sobre from '../pages/Sobre';
import EsqueciSenha from '../pages/EsqueciSenha';
import ArtigoExemplo from '../pages/ArtigoExemplo';

import AdminHome from '../pages/admin/AdminHome';
import AdminPage from '../pages/admin/AdminPage';
import Dashboard from '../pages/admin/Dashboard';
import Alertas from '../pages/admin/Alertas';
import AdminConteudos from '../pages/admin/AdminConteudos';
import Usuarios from '../pages/admin/Usuarios';
import Mapa from '../pages/admin/Mapa';
import AtendimentosChat from '../pages/admin/AtendimentosChat';
import FullMapa from '../pages/admin/FullMapa';
import FullAtendimentos from '../pages/admin/FullAtendimentos';
import AdminRelatorios from '../pages/admin/AdminRelatorios';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/conteudos" element={<Conteudos />} />
          <Route path="/conteudos/artigo-exemplo" element={<ArtigoExemplo />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>

        {/* Full Screen Admin Apps (Priority) */}
        <Route path="/admin/atendimentos-completo" element={<FullAtendimentos />} />
        <Route path="/admin/mapa-completo" element={<FullMapa />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alertas" element={<Alertas />} />
          <Route path="conteudos" element={<AdminConteudos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="atendimentos-chat" element={<AtendimentosChat />} />
          <Route path="relatorios" element={<AdminRelatorios />} />
        </Route>

        <Route path="/admin-unified" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
