import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Users, Shield, Navigation, Search,
  Activity, AlertTriangle, ChevronRight, Crosshair,
  Maximize2, Scan, ArrowLeft, Filter, Fullscreen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────
   MOCK DATA
   (Sincronizado com FullMapa para consistência)
───────────────────────────────────────── */
const MOCK_FUNCIONARIOS = [
  { id: 1, nome: 'André Ferreira', especialidade: 'assistente', area: 'Norte', ativo: true,  lat: -23.1620, lng: -45.8750 },
  { id: 2, nome: 'Pedro Almeida',  especialidade: 'psicologo',  area: 'Sul',   ativo: true,  lat: -23.1950, lng: -45.8900 },
  { id: 3, nome: 'Carla Souza',    especialidade: 'assistente', area: 'Leste', ativo: false, lat: -23.1788, lng: -45.8200 },
];

const MOCK_ONGS = [
  { id: 10, nome: 'ONG Vida Nova',      area: 'Norte', lat: -23.1500, lng: -45.8800 },
  { id: 11, nome: 'Instituto Renascer', area: 'Sul',   lat: -23.2000, lng: -45.8700 },
];

const MOCK_ALERTS = [
  { id: 101, user: 'Vítima Anônima', location: 'R. das Flores, 52', lat: -23.1700, lng: -45.8600, urgency: 'high' },
  { id: 102, user: 'Maria S.',       location: 'Av. Brasil, 310',   lat: -23.1900, lng: -45.9000, urgency: 'medium' },
  { id: 103, user: 'Ocorrência #082', location: 'Pça. da Matriz, 15', lat: -23.1850, lng: -45.8800, urgency: 'high' },
  { id: 105, user: 'Alerta SOS',     location: 'Proximidades do Parque', lat: -23.2000, lng: -45.8500, urgency: 'high' },
];

const ESPEC_LABEL = { assistente: 'Assistente Social', psicologo: 'Psicólogo(a)' };

const agentPopup = (f) => `
  <div style="padding:12px; background:#0B0B16; font-family:'Inter',sans-serif">
    <p style="margin:0; font-size:10px; font-weight:bold; color:#8B7EFA; text-transform:uppercase">Agente</p>
    <p style="margin:2px 0 0; font-size:14px; font-weight:800; color:#fff">${f.nome}</p>
    <p style="margin:8px 0 0; font-size:10px; color:rgba(255,255,255,0.4)">${f.area || 'Disponível'}</p>
  </div>`;

const sosPopup = (a) => `
  <div style="padding:12px; background:#0B0B16; font-family:'Inter',sans-serif">
    <p style="margin:0; font-size:10px; font-weight:bold; color:#FF3D6B; text-transform:uppercase">ALERTA SOS</p>
    <p style="margin:2px 0 0; font-size:14px; font-weight:800; color:#fff">${a.user}</p>
    <p style="margin:8px 0 0; font-size:10px; color:rgba(255,255,255,0.4)">${a.location}</p>
  </div>`;

export default function Mapa() {
  const navigate = useNavigate();
  const [leafletReady, setLeafletReady] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (window.L) { setLeafletReady(true); return; }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletReady || mapRef.current) return;
    const L = window.L;

    const map = L.map('map-container', {
      center: [-23.1788, -45.8852],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // Globals for buttons
    window.allocateAgent = (id) => alert(`Alocando agente #${id}...`);
    window.dispatchHelp = (id) => alert(`Enviando socorro para #${id}!`);

    mapRef.current = map;

    // Agentes
    MOCK_FUNCIONARIOS.forEach(f => {
      const m = L.circleMarker([f.lat, f.lng], {
        radius: 8, fillColor: '#8B7EFA', color: '#fff', weight: 2, fillOpacity: 1
      }).addTo(map).bindPopup(agentPopup(f));
      markersRef.current[`ag-${f.id}`] = m;
    });

    // SOS
    MOCK_ALERTS.forEach(a => {
      const sosIcon = L.divIcon({
        className: 'sos-marker-container',
        html: `<div class="sos-marker-pulse"></div><div class="sos-marker-dot"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      const m = L.marker([a.lat, a.lng], { icon: sosIcon })
        .addTo(map)
        .bindPopup(sosPopup(a))
        .bindTooltip(a.user, { permanent: true, direction: 'top' });
      markersRef.current[`sos-${a.id}`] = m;
    });

  }, [leafletReady]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Monitoramento Geográfico</h2>
          <p className="text-text-muted text-xs mt-1">Mapa interativo de ocorrências e unidades de campo.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/mapa-completo')}
          className="bg-brand-primary hover:bg-[#7a6cf0] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        >
          <Fullscreen size={16} /> Tela Cheia
        </button>
      </div>

      <div className="flex-1 glass border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl">
        <div id="map-container" className="absolute inset-0 z-0" />
        
        {/* Overlay do Mapa */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-3 pointer-events-none">
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10 pointer-events-auto flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Agentes: {MOCK_FUNCIONARIOS.length}</span>
             </div>
             <div className="w-[1px] h-3 bg-white/10"></div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-emergency animate-pulse"></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">SOS: {MOCK_ALERTS.length}</span>
             </div>
          </div>
        </div>

        {/* Mini Legenda */}
        <div className="absolute bottom-6 left-6 z-10 glass-panel px-4 py-3 rounded-2xl border border-white/10 pointer-events-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted">
              <div className="w-3 h-3 rounded-full bg-brand-primary border border-white/20"></div> AGENTE ATIVO
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted">
              <div className="w-3 h-3 rounded-full bg-brand-emergency border border-white/20"></div> CHAMADO S.O.S.
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted">
              <div className="w-3 h-3 rounded-full bg-[#34D399] border border-white/20"></div> ONG PARCEIRA
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-container { background: #f0f2f5 !important; border-radius: 24px; }
        .leaflet-popup-content-wrapper { background: #fff !important; color: #111 !important; border-radius: 12px !important; border: 1px solid rgba(139,126,250,0.2) !important; box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important; }
        .leaflet-popup-tip { background: #fff !important; }
        
        .sos-marker-container { position: relative; width: 30px; height: 30px; }
        .sos-marker-dot { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background: #FF3D6B; border: 2px solid #fff; border-radius: 50%; z-index: 2; box-shadow: 0 0 10px #FF3D6B; }
        .sos-marker-pulse { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background: #FF3D6B; border-radius: 50%; animation: sos-pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite; }
        @keyframes sos-pulse-ring { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
      `}</style>
    </div>
  );
}
