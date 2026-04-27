import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Users, Shield, Navigation, Search,
  Activity, AlertTriangle, ChevronRight, Crosshair,
  Maximize2, Scan, ArrowLeft, Filter
} from 'lucide-react';

/* ─────────────────────────────────────────
   MOCK DATA  (substitua pelos hooks reais)
───────────────────────────────────────── */
const MOCK_FUNCIONARIOS = [
  { id: 1, nome: 'André Ferreira', especialidade: 'assistente', area: 'Norte', ativo: true,  lat: -23.1620, lng: -45.8750 },
  { id: 2, nome: 'Pedro Almeida',  especialidade: 'psicologo',  area: 'Sul',   ativo: true,  lat: -23.1950, lng: -45.8900 },
  { id: 3, nome: 'Carla Souza',    especialidade: 'assistente', area: 'Leste', ativo: false, lat: -23.1788, lng: -45.8200 },
  { id: 4, nome: 'Lucas Mendes',   especialidade: 'psicologo',  area: null,    ativo: true,  lat: null,     lng: null      },
];

const MOCK_ONGS = [
  { id: 10, nome: 'ONG Vida Nova',      area: 'Norte', lat: -23.1500, lng: -45.8800 },
  { id: 11, nome: 'Instituto Renascer', area: 'Sul',   lat: -23.2000, lng: -45.8700 },
];

const MOCK_ALERTS = [
  { id: 101, user: 'Vítima Anônima', location: 'R. das Flores, 52', lat: -23.1700, lng: -45.8600, urgency: 'high' },
  { id: 102, user: 'Maria S.',       location: 'Av. Brasil, 310',   lat: -23.1900, lng: -45.9000, urgency: 'medium' },
  { id: 103, user: 'Ocorrência #082', location: 'Pça. da Matriz, 15', lat: -23.1850, lng: -45.8800, urgency: 'high' },
  { id: 104, user: 'Usuária #441',   location: 'R. Sete de Setembro', lat: -23.1600, lng: -45.8900, urgency: 'low' },
  { id: 105, user: 'Alerta SOS',     location: 'Proximidades do Parque', lat: -23.2000, lng: -45.8500, urgency: 'high' },
  { id: 106, user: 'Chamado Ativo',  location: 'Setor Sul - Quadra 4', lat: -23.2200, lng: -45.8950, urgency: 'medium' },
];

const ZONAS = [
  { label: 'Norte',  color: '#9B8FFF', lat: -23.1100, lng: -45.8950 },
  { label: 'Sul',    color: '#2ED573', lat: -23.2100, lng: -45.8750 },
  { label: 'Leste',  color: '#FFC800', lat: -23.1700, lng: -45.8100 },
  { label: 'Oeste',  color: '#FF8C42', lat: -23.1700, lng: -45.9600 },
  { label: 'Centro', color: '#8B88B8', lat: -23.1788, lng: -45.8852 },
];

const ESPEC_LABEL = { assistente: 'Assistente Social', psicologo: 'Psicólogo(a)' };

/* ─────────────────────────────────────────
   CSS INJETADO
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&family=JetBrains+Mono:wght@500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #050508; overflow: hidden; }

  .nira-root {
    position: fixed; inset: 0;
    font-family: 'Space Grotesk', sans-serif;
    background: #050508;
    color: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── glassmorphism ── */
  .glass {
    background: rgba(11, 11, 22, 0.82);
    backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(139, 126, 250, 0.13);
    box-shadow: 0 16px 48px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04);
  }
  .glass-lo {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
  }

  /* ── map engine ── */
  #nira-map-engine {
    position: absolute; inset: 0; z-index: 0;
  }
  .leaflet-container {
    background: #f0f2f5 !important;
  }
  .leaflet-control-zoom {
    border: none !important;
    margin: 40px !important;
  }
  .leaflet-control-zoom a {
    background: rgba(11,11,22,0.92) !important;
    color: #fff !important;
    border: 1px solid rgba(139,126,250,0.35) !important;
    backdrop-filter: blur(10px);
    width: 44px !important; height: 44px !important;
    line-height: 44px !important;
    border-radius: 14px !important;
    margin-bottom: 10px !important;
    display: flex !important;
    align-items: center; justify-content: center;
    font-weight: 700;
    transition: all 0.3s;
  }
  .leaflet-control-zoom a:hover {
    background: #8B7EFA !important;
    transform: scale(1.1);
  }
  .leaflet-popup-content-wrapper {
    background: rgba(10,10,20,0.97) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(139,126,250,0.5) !important;
    border-radius: 20px !important;
    color: #fff !important;
    padding: 0; overflow: hidden;
    box-shadow: 0 0 40px rgba(139,126,250,0.25) !important;
  }
  .leaflet-popup-tip { background: rgba(139,126,250,0.5) !important; }
  .leaflet-popup-close-button { color: rgba(255,255,255,0.3) !important; right: 12px !important; top: 12px !important; }
  .leaflet-routing-container { display: none !important; }
  .leaflet-attribution-flag { display: none !important; }
  .leaflet-control-attribution { display: none !important; }

  /* ── neon route ── */
  .neon-route {
    filter: drop-shadow(0 0 8px #8B7EFA);
    stroke-dasharray: 12 10;
    animation: dash-move 20s linear infinite;
  }
  @keyframes dash-move { to { stroke-dashoffset: -1000; } }

  /* ── scan line overlay ── */
  .scan-line {
    display: none;
  }

  /* ── vignette ── */
  .vignette {
    display: none;
  }

  /* ── grid dots ── */
  .map-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 11; opacity: 0.07;
    background-image: radial-gradient(circle, #8B7EFA 1px, transparent 1px);
    background-size: 44px 44px;
  }

  /* ── interface overlay ── */
  .overlay {
    position: absolute; inset: 0; z-index: 30;
    padding: 24px;
    display: flex; flex-direction: column;
    pointer-events: none;
  }
  .overlay > * { pointer-events: auto; }

  /* ── marker glow ── */
  .marker-glow { filter: drop-shadow(0 0 12px #8B7EFA) drop-shadow(0 0 4px #fff); }
  .marker-ong  { filter: drop-shadow(0 0 12px #34D399); }

  /* ── Custom SOS Marker ── */
  .sos-marker-container {
    position: relative;
    width: 40px;
    height: 40px;
  }
  .sos-marker-dot {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 14px; height: 14px;
    background: #FF3D6B;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 15px #FF3D6B;
  }
  .sos-marker-pulse {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 14px; height: 14px;
    background: #FF3D6B;
    border-radius: 50%;
    animation: sos-pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
  }
  @keyframes sos-pulse-ring {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
  }

  /* ── scrollbar ── */
  .custom-scroll::-webkit-scrollbar { width: 3px; }
  .custom-scroll::-webkit-scrollbar-track { background: transparent; }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(139,126,250,0.35); border-radius: 10px; }

  /* ── pulse ── */
  @keyframes ping {
    0%    { transform: scale(1); opacity: 0.6; }
    100%  { transform: scale(2.8); opacity: 0; }
  }
  .sos-ping { animation: ping 1.6s ease-out infinite; }
  .sos-ping2 { animation: ping 1.6s ease-out 0.5s infinite; }

  /* ── toast ── */
  @keyframes slide-in {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  .toast-anim { animation: slide-in 0.5s cubic-bezier(.16,1,.3,1) forwards; }

  /* ── status dot ── */
  .dot-online  { background: #10b981; box-shadow: 0 0 10px #10b981; }
  .dot-busy    { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
  .dot-offline { background: rgba(255,255,255,0.15); }

  /* ── brand colors ── */
  :root {
    --brand:    #8B7EFA;
    --emer:     #FF3D6B;
    --success:  #34D399;
    --warn:     #f59e0b;
    --bg-main:  #050508;
    --bg-panel: #0B0B16;
    --mono: 'JetBrains Mono', monospace;
  }

  input::placeholder { color: rgba(255,255,255,0.2); }
  input:focus { outline: none; }
`;

/* ─────────────────────────────────────────
   POPUP HTML
───────────────────────────────────────── */
const agentPopup = (f) => `
  <div style="padding:16px 18px; background:#fff; min-width:220px; font-family:'Space Grotesk',sans-serif; color: #111; border-radius: 12px">
    <p style="margin:0 0 2px; font-size:10px; font-weight:900; color:#8B7EFA; text-transform:uppercase; letter-spacing:2px">Unidade de Campo</p>
    <p style="margin:0; font-size:16px; font-weight:800; color:#111">${f.nome}</p>
    <div style="margin-top:12px; padding-top:12px; border-top:1px solid rgba(0,0,0,0.06); display:flex; align-items:center; gap:8px">
      <div style="width:8px; height:8px; background:#34D399; border-radius:50%; flex-shrink:0"></div>
      <p style="margin:0; font-size:10px; color:#666; font-weight:700; text-transform:uppercase">${f.area || 'DISPONÍVEL'}</p>
    </div>
    <button onclick="window.allocateAgent(${f.id})" style="width:100%; margin-top:12px; padding:10px; background:#8B7EFA; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:12px">Revezar / Alocar</button>
  </div>`;

const ongPopup = (o) => `
  <div style="padding:16px 18px; background:#0B0B16; min-width:190px; font-family:'Space Grotesk',sans-serif">
    <p style="margin:0 0 2px; font-size:9px; font-weight:900; color:#34D399; text-transform:uppercase; letter-spacing:2.5px">ONG Parceira</p>
    <p style="margin:0; font-size:15px; font-weight:800; color:#fff">${o.nome}</p>
    <div style="margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; gap:8px">
      <div style="width:7px; height:7px; background:#34D399; border-radius:50%; box-shadow: 0 0 8px #34D399"></div>
      <p style="margin:0; font-size:9px; color:rgba(255,255,255,0.4); font-weight:700; text-transform:uppercase; letter-spacing:1.5px">Disponível — ${o.area}</p>
    </div>
  </div>`;

const sosPopup = (a) => `
  <div style="padding:16px 18px; background:#fff; min-width:220px; font-family:'Space Grotesk',sans-serif; color: #111; border-radius: 12px">
    <p style="margin:0 0 2px; font-size:10px; font-weight:900; color:#FF3D6B; text-transform:uppercase; letter-spacing:2px">⚠ ALERTA S.O.S</p>
    <p style="margin:0; font-size:16px; font-weight:800; color:#111">${a.user}</p>
    <div style="margin-top:8px">
      <p style="margin:0; font-size:11px; color:#666">${a.location}</p>
    </div>
    <div style="margin-top:12px; padding-top:12px; border-top:1px solid rgba(0,0,0,0.06)">
       <button onclick="window.dispatchHelp(${a.id})" style="width:100%; padding:10px; background:#FF3D6B; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:12px">Despachar Ajuda Imediata</button>
    </div>
  </div>`;

/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
export default function FullMapa({ onBack }) {
  const [activeLayer, setActiveLayer] = useState('todos');
  const [activeTab,   setActiveTab]   = useState('agentes');
  const [search,      setSearch]      = useState('');
  const [toast,       setToast]       = useState(null);
  const [leafletReady, setLeafletReady] = useState(false);

  const lMap       = useRef(null);
  const markersRef = useRef({});
  const routeRef   = useRef(null);

  const [funcionarios, setFuncionarios] = useState(MOCK_FUNCIONARIOS);

  const filtered = funcionarios.filter(f =>
    f.nome.toLowerCase().includes(search.toLowerCase())
  );

  /* ── visibilidade por layer ── */
  const layerVisible = (type) => {
    if (activeLayer === 'todos') return true;
    return activeLayer === type;
  };

  /* ── 1. Carregar Leaflet ── */
  useEffect(() => {
    if (window.L && window.L.Routing) { setLeafletReady(true); return; }

    const addLink = (id, href) => {
      if (!document.getElementById(id)) {
        const el = document.createElement('link');
        el.id = id; el.rel = 'stylesheet'; el.href = href;
        document.head.appendChild(el);
      }
    };
    addLink('lf-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
    addLink('lf-rm-css', 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css');

    const s1 = document.createElement('script');
    s1.src   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src   = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
      s2.onload = () => setLeafletReady(true);
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }, []);

  /* ── 2. Inicializar Mapa ── */
  useEffect(() => {
    if (!leafletReady || lMap.current) return;
    const L = window.L;

    const map = L.map('nira-map-engine', {
      center: [-23.1788, -45.8852],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // Globals for buttons
    window.allocateAgent = (id) => showToast(`Alocando agente #${id} para zona de patrulha...`);
    window.dispatchHelp = (id) => showToast(`UNIDADE EM DESLOCAMENTO para ocorrência #${id}!`);

    lMap.current = map;
    updateMarkers(map);
  }, [leafletReady]);

  /* ── 3. Atualizar marcadores ── */
  useEffect(() => {
    if (lMap.current) updateMarkers(lMap.current);
  }, [funcionarios, activeLayer]);

  const makeCircleIcon = (color, cls) => {
    if (!window.L) return null;
    const L = window.L;
    return L.divIcon({
      className: '',
      html: `
        <div style="position:relative;width:36px;height:36px">
          <div style="position:absolute;inset:0;background:${color};border-radius:50%;opacity:0.25;animation:ping 1.8s ease-out infinite"></div>
          <div style="position:absolute;inset:4px;background:${color};border:2.5px solid rgba(255,255,255,0.25);border-radius:50%;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 0 10px ${color})"></div>
        </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  const updateMarkers = (map) => {
    if (!map || !window.L) return;
    const L = window.L;

    /* limpar marcadores removidos */
    Object.keys(markersRef.current).forEach(key => {
      map.removeLayer(markersRef.current[key]);
      delete markersRef.current[key];
    });

    /* agentes */
    if (layerVisible('agentes')) {
      funcionarios.forEach(f => {
        if (!f.lat || !f.lng) return;
        const m = L.circleMarker([f.lat, f.lng], {
          radius: 11, fillColor: '#8B7EFA', color: '#fff',
          weight: 2.5, fillOpacity: 1, className: 'marker-glow',
        }).addTo(map).bindPopup(agentPopup(f), { closeButton: false, offset: [0, -14] });
        markersRef.current[`ag-${f.id}`] = m;
      });
    }

    /* ongs */
    if (layerVisible('ongs')) {
      MOCK_ONGS.forEach(o => {
        const m = L.circleMarker([o.lat, o.lng], {
          radius: 11, fillColor: '#34D399', color: '#fff',
          weight: 2.5, fillOpacity: 1, className: 'marker-ong',
        }).addTo(map).bindPopup(ongPopup(o), { closeButton: false, offset: [0, -14] });
        markersRef.current[`ong-${o.id}`] = m;
      });
    }

    /* SOS */
    if (layerVisible('sos')) {
      MOCK_ALERTS.forEach(a => {
        const sosIcon = L.divIcon({
          className: 'sos-marker-container',
          html: `<div class="sos-marker-pulse"></div><div class="sos-marker-pulse" style="animation-delay:0.5s"></div><div class="sos-marker-dot"></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        const m = L.marker([a.lat, a.lng], {
          icon: sosIcon,
          className: 'marker-sos'
        }).addTo(map)
          .bindPopup(sosPopup(a), { closeButton: false, offset: [0, -5] })
          .bindTooltip(a.user, { permanent: true, direction: 'top', className: 'sos-tooltip' });
        markersRef.current[`sos-${a.id}`] = m;
      });
    }
  };

  /* ── GPS routing ── */
  const startGPS = (f) => {
    if (!lMap.current || !window.L?.Routing) return;
    const L = window.L;
    const dest = ZONAS[Math.floor(Math.random() * ZONAS.length)];
    const start = f.lat ? [f.lat, f.lng] : [-23.1788, -45.8852];

    if (routeRef.current) lMap.current.removeControl(routeRef.current);

    routeRef.current = L.Routing.control({
      waypoints: [L.latLng(...start), L.latLng(dest.lat, dest.lng)],
      lineOptions: {
        styles: [
          { color: '#8B7EFA', opacity: 0.25, weight: 14 },
          { color: '#fff',    opacity: 1,    weight: 2.5, className: 'neon-route' },
        ],
      },
      addWaypoints: false, draggableWaypoints: false,
      fitSelectedRoutes: true, createMarker: () => null,
    }).addTo(lMap.current);

    setFuncionarios(prev =>
      prev.map(x => x.id === f.id ? { ...x, area: dest.label, lat: dest.lat, lng: dest.lng } : x)
    );
    showToast(`GPS ATIVO // Rota: ${f.nome} → ${dest.label}`);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  };

  const sosCount = MOCK_ALERTS.length;
  const onlineCount = funcionarios.filter(f => f.ativo).length;

  /* ─────────── RENDER ─────────── */
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div className="nira-root">
        {/* MAP ENGINE */}
        <div id="nira-map-engine" />

        {/* OVERLAYS */}
        <div className="vignette" />
        <div className="map-grid" />
        <div className="scan-line" />

        {/* INTERFACE */}
        <div className="overlay">

          {/* ════ TOP BAR ════ */}
          <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>

            {/* Back + Brand */}
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <button
                onClick={() => onBack?.()}
                className="glass"
                style={{
                  width:52, height:52, borderRadius:16,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', border:'1px solid rgba(139,126,250,0.2)',
                  transition:'all 0.3s', flexShrink:0,
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(139,126,250,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background=''}
              >
                <ArrowLeft size={22} color="#fff" />
              </button>

              <div className="glass" style={{
                borderRadius:24, padding:'12px 22px',
                borderLeft:'5px solid var(--brand)',
                display:'flex', alignItems:'center', gap:14,
              }}>
                <div style={{
                  width:40, height:40, borderRadius:12,
                  background:'rgba(139,126,250,0.15)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Navigation size={20} color="var(--brand)" style={{ transform:'rotate(45deg)' }} />
                </div>
                <div>
                  <h1 style={{ fontSize:11, fontWeight:900, color:'#fff', textTransform:'uppercase', letterSpacing:'0.35em', lineHeight:1 }}>
                    GeoMonitor v3.0
                  </h1>
                  <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'0.18em', marginTop:5, display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 8px #10b981', display:'inline-block', animation:'none' }} />
                    Sistema Online · Link Estável
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="glass" style={{ flex:1, maxWidth:380, borderRadius:20, padding:'10px 18px', display:'flex', alignItems:'center', gap:12 }}>
              <Search size={16} color="var(--brand)" style={{ flexShrink:0 }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="IDENTIFICAR UNIDADE..."
                style={{
                  background:'transparent', border:'none', color:'#fff',
                  fontSize:10, fontWeight:700, fontFamily:'Space Grotesk',
                  letterSpacing:'0.15em', textTransform:'uppercase', width:'100%',
                }}
              />
            </div>

            {/* Layer Filters - Simplified to 2 */}
            <div className="glass" style={{ borderRadius:20, padding:6, display:'flex', gap:6 }}>
              {['todos', 'sos'].map(l => (
                <button
                  key={l}
                  onClick={() => setActiveLayer(l)}
                  style={{
                    padding:'8px 24px', borderRadius:14, border:'none', cursor:'pointer',
                    fontSize:10, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.18em',
                    fontFamily:'Space Grotesk',
                    background: activeLayer === l ? 'var(--brand)' : 'rgba(255,255,255,0.05)',
                    color:      activeLayer === l ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition:'all 0.25s',
                  }}
                >
                  {l === 'todos' ? 'Vista Geral' : 'Emergências'}
                </button>
              ))}
            </div>

            {/* Live counter */}
            <div className="glass" style={{ borderRadius:20, padding:'12px 22px', display:'flex', alignItems:'center', gap:18, flexShrink:0 }}>
              <div>
                <p style={{ fontSize:8, fontWeight:900, color:'var(--brand)', textTransform:'uppercase', letterSpacing:'0.2em' }}>Online</p>
                <p style={{ fontSize:28, fontWeight:900, color:'#fff', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                  {String(onlineCount).padStart(2,'0')}
                </p>
              </div>
              <div style={{ width:1, height:36, background:'rgba(255,255,255,0.08)' }} />
              <div>
                <p style={{ fontSize:8, fontWeight:900, color:'var(--emer)', textTransform:'uppercase', letterSpacing:'0.2em' }}>S.O.S</p>
                <p style={{ fontSize:28, fontWeight:900, color:'var(--emer)', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                  {String(sosCount).padStart(2,'0')}
                </p>
              </div>
              <Activity size={24} color="var(--brand)" style={{ opacity:0.7 }} />
            </div>
          </header>

          {/* ════ BODY ════ */}
          <div style={{ flex:1, display:'flex', gap:20, marginTop:20, minHeight:0 }}>

            {/* ─── SIDEBAR ─── */}
            <aside style={{ width:360, display:'flex', flexDirection:'column', gap:14, overflow:'hidden' }}>

              {/* Stats rápidos */}
              <div className="glass" style={{ borderRadius:24, padding:'18px 22px' }}>
                <p style={{ fontSize:9, fontWeight:900, color:'var(--brand)', textTransform:'uppercase', letterSpacing:'0.22em', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                  <Activity size={13} color="var(--brand)" /> Status em Tempo Real
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[
                    { label:'Equipes Campo', value:'08', color:'#fff' },
                    { label:'S.O.S Ativos',  value:String(sosCount), color:'var(--emer)' },
                    { label:'ONGs Ativas',   value:String(MOCK_ONGS.length), color:'var(--success)' },
                    { label:'Zonas Cobertas',value:'05', color:'var(--warn)' },
                  ].map(s => (
                    <div key={s.label} className="glass-lo" style={{ borderRadius:16, padding:'12px 14px' }}>
                      <p style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:4 }}>{s.label}</p>
                      <p style={{ fontSize:26, fontWeight:900, color:s.color, lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="glass" style={{ borderRadius:18, padding:5, display:'flex', gap:4 }}>
                {[
                  { id:'agentes', label:'Unidades', icon:<Shield size={14}/> },
                  { id:'zonas',   label:'Perímetros', icon:<Scan size={14}/> },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex:1, padding:'12px 8px', borderRadius:14, border:'none', cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                      fontSize:9, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.18em',
                      fontFamily:'Space Grotesk',
                      background: activeTab === t.id ? 'var(--brand)' : 'transparent',
                      color:      activeTab === t.id ? '#fff' : 'rgba(255,255,255,0.28)',
                      transition:'all 0.35s',
                      boxShadow:  activeTab === t.id ? '0 0 20px rgba(139,126,250,0.35)' : 'none',
                    }}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Lista */}
              <div
                className="glass custom-scroll"
                style={{ flex:1, borderRadius:28, padding:'20px 16px', overflowY:'auto', display:'flex', flexDirection:'column', gap:10 }}
              >
                {activeTab === 'agentes' ? filtered.map(f => {
                  const isOnline = f.ativo;
                  const dotClass = isOnline ? (f.area ? 'dot-online' : 'dot-busy') : 'dot-offline';
                  return (
                    <div
                      key={f.id}
                      className="glass-lo"
                      style={{
                        borderRadius:20, padding:'16px 18px', cursor:'pointer',
                        transition:'all 0.3s', position:'relative', overflow:'hidden',
                        border:'1px solid rgba(255,255,255,0.05)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(139,126,250,0.4)';
                        e.currentTarget.style.background = 'rgba(139,126,250,0.07)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    >
                      {/* BG deco */}
                      <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:'50%', background:'rgba(139,126,250,0.05)', pointerEvents:'none' }} />

                      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                        {/* Avatar */}
                        <div style={{
                          width:40, height:40, borderRadius:12,
                          background:'rgba(139,126,250,0.12)',
                          border:'1px solid rgba(139,126,250,0.22)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:16, fontWeight:900, color:'var(--brand)', flexShrink:0,
                        }}>
                          {f.nome.charAt(0)}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontSize:13, fontWeight:900, color:'#fff', textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                            {f.nome}
                          </p>
                          <p style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:2, display:'flex', alignItems:'center', gap:4 }}>
                            <Shield size={10} color="var(--brand)" />
                            {ESPEC_LABEL[f.especialidade] || f.especialidade}
                          </p>
                        </div>
                        <div className={dotClass} style={{ width:10, height:10, borderRadius:'50%', flexShrink:0 }} />
                      </div>

                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{
                          display:'flex', alignItems:'center', gap:6,
                          background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)',
                          borderRadius:10, padding:'6px 10px', flex:1,
                        }}>
                          <MapPin size={12} color={f.lat ? 'var(--brand)' : 'rgba(255,255,255,0.2)'} />
                          <span style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.15em' }}>
                            {f.area || 'STANDBY'}
                          </span>
                        </div>
                        <button
                          onClick={() => startGPS(f)}
                          style={{
                            padding:'8px 14px', borderRadius:12, cursor:'pointer',
                            background:'rgba(139,126,250,0.15)', border:'1px solid rgba(139,126,250,0.35)',
                            color:'var(--brand)', fontSize:9, fontWeight:900, fontFamily:'Space Grotesk',
                            textTransform:'uppercase', letterSpacing:'0.15em',
                            display:'flex', alignItems:'center', gap:6,
                            transition:'all 0.25s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background='var(--brand)'; e.currentTarget.style.color='#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background='rgba(139,126,250,0.15)'; e.currentTarget.style.color='var(--brand)'; }}
                        >
                          GPS <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  );
                }) : ZONAS.map(z => (
                  <div
                    key={z.label}
                    className="glass-lo"
                    style={{
                      borderRadius:20, padding:'16px 20px',
                      border:'1px solid rgba(255,255,255,0.05)',
                      display:'flex', flexDirection:'column', gap:12,
                      transition:'all 0.3s', cursor:'default',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='rgba(139,126,250,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'}
                  >
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                        <div style={{ width:4, height:36, borderRadius:4, background:z.color, boxShadow:`0 0 14px ${z.color}55`, flexShrink:0 }} />
                        <div>
                          <p style={{ fontSize:13, fontWeight:900, color:'#fff', textTransform:'uppercase', letterSpacing:'0.1em' }}>{z.label}</p>
                          <p style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,0.2)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Zona de Cobertura</p>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <p style={{ fontSize:24, fontWeight:900, color:'#fff', lineHeight:1 }}>
                          {String(funcionarios.filter(f=>f.area===z.label).length).padStart(2,'0')}
                        </p>
                        <p style={{ fontSize:8, fontWeight:900, color:'var(--brand)', textTransform:'uppercase' }}>AGS</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => showToast(`Alocando reforço para a Zona ${z.label}...`)}
                      style={{
                        width:'100%', padding:'10px', borderRadius:12, cursor:'pointer',
                        background:'rgba(139,126,250,0.1)', border:'1px solid rgba(139,126,250,0.2)',
                        color:'var(--brand)', fontSize:9, fontWeight:900, fontFamily:'Space Grotesk',
                        textTransform:'uppercase', letterSpacing:'0.15em', transition:'all 0.25s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--brand)'}
                      onMouseLeave={e => e.currentTarget.style.background='rgba(139,126,250,0.1)'}
                    >
                      Alocar Agente Aqui
                    </button>
                  </div>
                ))}
              </div>
            </aside>

            {/* ─── TOAST ─── */}
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-start', gap:12 }}>
              {toast && (
                <div
                  className="glass toast-anim"
                  style={{
                    borderRadius:24, padding:'20px 28px',
                    borderLeft:'7px solid var(--brand)',
                    display:'flex', alignItems:'center', gap:18,
                    maxWidth:480, boxShadow:'0 0 40px rgba(139,126,250,0.2)',
                  }}
                >
                  <div style={{
                    width:56, height:56, borderRadius:18,
                    background:'rgba(139,126,250,0.15)', border:'1px solid rgba(139,126,250,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  }}>
                    <Navigation size={28} color="var(--brand)" />
                  </div>
                  <div>
                    <p style={{ fontSize:9, fontWeight:900, color:'var(--brand)', textTransform:'uppercase', letterSpacing:'0.25em', marginBottom:6 }}>Comando NIRA</p>
                    <p style={{ fontSize:13, fontWeight:900, color:'#fff', letterSpacing:'0.1em', textTransform:'uppercase' }}>{toast}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ════ FOOTER ════ */}
          <footer style={{ marginTop:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div className="glass" style={{ borderRadius:20, padding:'12px 24px', display:'flex', alignItems:'center', gap:24 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--brand)', boxShadow:'0 0 10px var(--brand)' }} />
                <span style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.18em' }}>Agentes em Campo</span>
              </div>
              <div style={{ width:1, height:20, background:'rgba(255,255,255,0.08)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--emer)', boxShadow:'0 0 10px var(--emer)' }} />
                <span style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.18em' }}>Emergências Ativas</span>
              </div>
              <div style={{ width:1, height:20, background:'rgba(255,255,255,0.08)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Shield size={11} color="var(--success)" />
                <span style={{ fontFamily:'var(--mono)', fontSize:9, fontWeight:700, color:'var(--success)', textTransform:'uppercase', letterSpacing:'0.15em' }}>AES-256 ACTIVE</span>
              </div>
            </div>

            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <span style={{ fontFamily:'var(--mono)', fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.2)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                23°10'43"S  45°53'6"W
              </span>
              {[Maximize2, Crosshair].map((Icon, i) => (
                <button
                  key={i}
                  className="glass"
                  style={{
                    width:48, height:48, borderRadius:14, border:'1px solid rgba(255,255,255,0.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', color:'rgba(255,255,255,0.35)', transition:'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(139,126,250,0.45)'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.35)'; }}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}