import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, Navigation, Bell, AlertCircle, 
  ArrowLeft, Radio, UserCheck, Power, Activity,
  Users, AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { NiraContext } from '../../context/NiraContext';

/* ─────────────────────────────────────────────────────────────
   ESTILOS GLOBAIS (Premium Dark Tactical)
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Share+Tech+Mono&family=Inter:wght@400;700;900&display=swap');

:root {
  --brand: #8B6FFF;
  --brand-lo: rgba(139, 111, 255, 0.12);
  --brand-glow: rgba(139, 111, 255, 0.4);
  --emer: #FF3B6B;
  --emer-lo: rgba(255, 59, 107, 0.12);
  --ok: #00E5A0;
  --ok-lo: rgba(0, 229, 160, 0.12);
  --warn: #FFB340;
  --warn-lo: rgba(255, 179, 64, 0.12);
  --bg: #04040F;
  --panel: rgba(8, 8, 24, 0.85);
  --border: rgba(139, 111, 255, 0.18);
  --border-lo: rgba(255, 255, 255, 0.05);
  --text: #E8E6FF;
  --text-dim: rgba(232, 230, 255, 0.5);
  --font: 'Exo 2', 'Inter', sans-serif;
  --mono: 'Share Tech Mono', monospace;
}

.nira-map-root { width: 100%; height: 100vh; font-family: var(--font); color: var(--text); position: relative; overflow: hidden; background: var(--bg); }
#nira-map-engine { position: absolute; inset: 0; z-index: 0; }
.leaflet-container { background: #030310 !important; filter: contrast(1.1) brightness(0.6) saturate(1.2) hue-rotate(210deg); }
.leaflet-vignette { position: absolute; inset: 0; pointer-events: none; z-index: 10; background: radial-gradient(circle at center, transparent 30%, rgba(4, 4, 15, 0.8) 100%); box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9); }
.leaflet-grid-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 11; opacity: 0.03; background-image: linear-gradient(rgba(139, 111, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 111, 255, 0.5) 1px, transparent 1px); background-size: 50px 50px; }
.leaflet-control-zoom { border: none !important; margin: 30px !important; }
.leaflet-control-zoom a { width: 44px !important; height: 44px !important; line-height: 44px !important; border-radius: 14px !important; background: var(--panel) !important; border: 1px solid var(--border) !important; color: var(--text) !important; backdrop-filter: blur(10px); margin-bottom: 8px !important; display: flex !important; align-items: center; justify-content: center; transition: all 0.3s ease; }
.leaflet-popup-content-wrapper { background: var(--panel) !important; backdrop-filter: blur(20px); border: 1px solid var(--border) !important; border-radius: 18px !important; color: var(--text) !important; padding: 0 !important; overflow: hidden; }
.glass { background: var(--panel); backdrop-filter: blur(25px) saturate(180%); border: 1px solid var(--border); }
.glass-hover:hover { border-color: var(--brand); background: rgba(139, 111, 255, 0.05); }
.sidebar-scroll::-webkit-scrollbar { width: 3px; }
.sidebar-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

@keyframes pulse-ring { 0% { transform: scale(0.33); opacity: 0.8; } 80%, 100% { opacity: 0; transform: scale(1.5); } }
.pulse-primary::before { content: ''; position: absolute; inset: -8px; border-radius: 50%; background: var(--brand); animation: pulse-ring 2s infinite; }
.scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--brand), transparent); animation: scan-y 10s linear infinite; pointer-events: none; opacity: 0.1; }
@keyframes scan-y { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
.slide-up { animation: slide-in-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slide-in-bottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.tab-active { background: var(--brand) !important; color: #fff !important; }
.allocation-crosshair { cursor: crosshair !important; }

.tactical-tooltip {
  background: #080818 !important;
  border: 1px solid var(--brand) !important;
  color: #fff !important;
  border-radius: 6px !important;
  font-family: var(--font) !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  padding: 4px 8px !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
}
.leaflet-tooltip-top:before { border-top-color: var(--brand) !important; }
`;

const INITIAL_SOS = [
  { id: 101, ticketCode: 'NIRA-101', urgency: 'alta',    lat: -23.1750, lng: -45.8650, time: '12:45', desc: 'Sinal de pânico recebido' },
  { id: 103, ticketCode: 'NIRA-103', urgency: 'critica', lat: -23.1850, lng: -45.8800, time: '13:05', desc: 'Protocolo de emergência nível 4' },
  { id: 104, ticketCode: 'NIRA-104', urgency: 'media',   lat: -23.1900, lng: -45.8700, time: '14:20', desc: 'Solicitação de apoio preventivo' },
];

export default function FullMapa({ onBack }) {
  const navigate = useNavigate();
  const { user, usuarios, alocarFuncionario, marcarNotifLida } = useAuth();
  const { alerts, updateChatStatus } = useContext(NiraContext);
  
  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const [viewMode, setViewMode] = useState('agent'); // Default para seguro
  const [mapReady, setMapReady] = useState(false);
  
  // Sincroniza o modo de visão com o papel do usuário logado
  useEffect(() => {
    if (user?.role === 'adm' || user?.role === 'admin') {
      setViewMode('admin');
    } else {
      setViewMode('agent');
    }
  }, [user]);
  const [sosAlerts, setSosAlerts] = useState([]);

  useEffect(() => {
    // Filtra apenas alertas ativos que possuam coordenadas
    const activeAlerts = alerts.filter(a => a.status === 'ativo' && a.lat && a.lng);
    setSosAlerts(activeAlerts);
  }, [alerts]);

  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allocationMode, setAllocationMode] = useState(false);
  const [filters, setFilters] = useState({ agents: true, alerts: true });
  
  const initialSimId = user?.role === 'funcionario' ? user.id : (usuarios.find(u => u.role === 'funcionario')?.id || 5);
  const [simulateAgentId, setSimulateAgentId] = useState(initialSimId);

  const mapRef = useRef(null);
  const markersGroupRef = useRef(null);
  const zonesGroupRef = useRef(null);
  const routeRef = useRef(null);

  // Expõe a função de concluir alerta para o escopo global (usado pelos popups do Leaflet)
  useEffect(() => {
    window.concluirAlerta = (id) => {
      if (window.confirm(`Deseja marcar o chamado ${id} como CONCLUÍDO e remover do mapa?`)) {
        updateChatStatus(id, 'concluido');
        pushNotification('Alerta Concluído', `O chamado ${id} foi resolvido com sucesso.`);
      }
    };
    return () => { delete window.concluirAlerta; };
  }, [updateChatStatus, pushNotification]);

  const agents = usuarios.filter(u => u.role === 'funcionario');
  const currentAgent = agents.find(a => a.id === simulateAgentId) || agents[0];

  const pushNotification = useCallback((title, msg, id = Date.now(), type = 'info') => {
    setNotifications(prev => [{ id, title, msg, time: 'Agora', new: true, type }, ...prev.slice(0, 4)]);
  }, []);

  useEffect(() => {
    if (viewMode === 'agent' && currentAgent?.notificacoes) {
      const naoLidas = currentAgent.notificacoes.filter(n => !n.lida);
      naoLidas.forEach(n => {
        setNotifications(prev => {
          if (prev.find(p => p.id === n.id)) return prev;
          return [{ id: n.id, title: n.titulo, msg: n.texto, time: n.data, new: true, type: 'alert', posOrigem: n.posOrigem, posDestino: n.posDestino }, ...prev];
        });
      });
    }
  }, [currentAgent, viewMode]);

  const handleMapClick = useCallback((e) => {
    if (!allocationMode || !selectedAgentId) return;
    
    const { lat, lng } = e.latlng;
    const targetAgent = agents.find(a => a.id === selectedAgentId);
    if (!targetAgent) return;
    
    const L = window.L;
    L.popup()
      .setLatLng([lat, lng])
      .setContent(`
        <div style="padding:15px; color:#fff; font-family:'Exo 2', sans-serif; background:#080818; border-radius:12px; border:1px solid #8B6FFF;">
          <h4 style="margin:0 0 5px; font-size:14px; color:#8B6FFF; font-weight:900;">ALOCAR UNIDADE</h4>
          <p style="margin:0 0 15px; font-size:11px; opacity:0.7;">Confirmar movimentação estratégica de ${targetAgent.nome}?</p>
          <button id="confirm-alloc-btn" style="width:100%; padding:10px; background:#8B6FFF; border:none; border-radius:8px; color:#fff; font-weight:900; cursor:pointer; font-size:10px; letter-spacing:1px; box-shadow:0 0 15px rgba(139,111,255,0.4);">CONFIRMAR MISSÃO</button>
        </div>
      `).openOn(mapRef.current);

    setTimeout(() => {
      const btn = document.getElementById('confirm-alloc-btn');
      if (btn) {
        btn.onclick = () => {
          alocarFuncionario(selectedAgentId, 'ZONA DE EXTRAÇÃO', lat, lng);
          setAllocationMode(false);
          mapRef.current.closePopup();
          pushNotification('Comando Executado', `Agente ${targetAgent.nome} movido para novas coordenadas.`);
        };
      }
    }, 150);
  }, [allocationMode, selectedAgentId, agents, alocarFuncionario, pushNotification]);

  const startAgentGPS = (origem, destino) => {
    if (!mapRef.current || !window.L || !origem || !destino) return;
    if (routeRef.current) mapRef.current.removeLayer(routeRef.current);
    
    const L = window.L;
    const line = L.polyline([[origem.lat, origem.lng], [destino.lat, destino.lng]], {
      color: '#8B6FFF', weight: 6, opacity: 0.9, dashArray: '15, 20'
    }).addTo(mapRef.current);
    
    // Adicionar pin de destino específico
    const destIcon = L.divIcon({
      className: 'dest-marker',
      html: `<div style="width:20px; height:20px; background:#00E5A0; border:3px solid #fff; border-radius:50%; box-shadow:0 0 20px #00E5A0;"></div>`,
      iconSize: [20, 20], iconAnchor: [10, 10]
    });
    L.marker([destino.lat, destino.lng], { icon: destIcon }).addTo(mapRef.current);

    routeRef.current = line;
    mapRef.current.fitBounds(line.getBounds(), { padding: [100, 100], maxZoom: 16 });
    pushNotification('Navegação Ativada', 'Traçando rota entre posições...');
  };

  useEffect(() => {
    if (window.L) { setMapReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      setMapReady(true);
    };
    document.head.appendChild(script);
  }, []);

  const renderMapContent = useCallback(() => {
    if (!mapRef.current || !window.L) return;
    const L = window.L;
    markersGroupRef.current.clearLayers();
    zonesGroupRef.current.clearLayers();

    if (filters.agents) {
      agents.forEach(a => {
        if (!a.lat || !a.lng) return;
        const isActive = a.id === simulateAgentId;
        const color = isActive ? '#00E5A0' : '#8B6FFF';
        
        L.circle([a.lat, a.lng], { radius: 800, color, fillOpacity: 0.05, weight: 1, dashArray: '8, 8' }).addTo(zonesGroupRef.current);
        
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
              <div style="position:absolute; inset:0; background:${color}; opacity:0.15; border-radius:14px; blur:10px;"></div>
              <div style="position:relative; width:34px; height:34px; border-radius:10px; background:${color}30; border:2px solid ${color}; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); color:#fff; box-shadow: 0 0 15px ${color}50;">
                <span style="font-size:16px;">${isActive ? '👤' : a.nome.charAt(0)}</span>
              </div>
            </div>`,
          iconSize: [44, 44], iconAnchor: [22, 22]
        });
        
        L.marker([a.lat, a.lng], { icon })
          .addTo(markersGroupRef.current)
          .bindTooltip(`<b>${a.nome}</b>`, { permanent: false, direction: 'top', className: 'tactical-tooltip' });
      });
    }

    if (filters.alerts) {
      sosAlerts.forEach(s => {
        const icon = L.divIcon({
          className: 'sos-marker',
          html: `<div style="width:50px; height:50px; background:#FF3B6B; border-radius:50%; opacity:0.2; animation:pulse-ring 2s infinite; position:absolute; inset:0;"></div><div style="width:20px; height:20px; background:#FF3B6B; border:2px solid #fff; border-radius:50%; position:absolute; top:15px; left:15px;"></div>`,
          iconSize: [50, 50], iconAnchor: [25, 25]
        });
        L.marker([s.lat, s.lng], { icon })
          .addTo(markersGroupRef.current)
          .bindTooltip(`<b style="color:#FF3B6B">CHAMADO: ${s.ticketCode}</b>`, { direction: 'top' })
          .bindPopup(`
            <div style="min-width:160px; padding:8px; text-align:center; font-family:'Exo 2', sans-serif;">
              <div style="background:#FF3B6B20; color:#FF3B6B; padding:4px; border-radius:6px; font-weight:900; font-size:10px; letter-spacing:1px; margin-bottom:8px;">ALERTA CRÍTICO</div>
              <b style="color:#fff; display:block; margin-bottom:4px; font-size:14px;">${s.ticketCode}</b>
              <p style="font-size:11px; color:rgba(255,255,255,0.6); margin:0 0 12px 0;">Localização rastreada e ativa.</p>
              <button 
                onclick="window.concluirAlerta('${s.id}')"
                style="background:#00E5A0; color:#030310; border:none; padding:8px 12px; border-radius:8px; font-weight:800; cursor:pointer; width:100%; font-size:11px; text-transform:uppercase; transition:all 0.2s; box-shadow: 0 4px 12px rgba(0, 229, 160, 0.2);"
              >
                Concluir Chamado
              </button>
            </div>
          `);
      });
    }
  }, [agents, sosAlerts, simulateAgentId, filters]);

  useEffect(() => {
    if (!mapReady || mapRef.current) return;
    const map = window.L.map('nira-map-engine', { center: [-23.1788, -45.8852], zoom: 14, zoomControl: false, attributionControl: false });
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    markersGroupRef.current = window.L.layerGroup().addTo(map);
    zonesGroupRef.current = window.L.layerGroup().addTo(map);
    mapRef.current = map;
  }, [mapReady]);

  // Re-vincula o evento de clique sempre que o modo de alocação ou o agente selecionado mudar
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.off('click');
    mapRef.current.on('click', handleMapClick);
  }, [handleMapClick]);

  useEffect(() => { renderMapContent(); }, [usuarios, renderMapContent, filters]);

  return (
    <div className={`nira-map-root ${allocationMode ? 'allocation-crosshair' : ''}`}>
      <style>{CSS}</style>
      <div id="nira-map-engine" />
      <div className="leaflet-vignette" />
      <div className="scan-line" />

      <div style={{ position: 'absolute', inset: 0, zIndex: 150, pointerEvents: 'none', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', gap: '16px', alignItems: 'center', pointerEvents: 'auto', zIndex: 200, position: 'relative' }}>
          <button onClick={handleBack} className="glass glass-hover" style={{ width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div className="glass" style={{ height: '52px', borderRadius: '16px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="pulse-primary" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B6FFF' }} />
            <div>
              <h1 style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '2px', margin: 0 }}>NIRA TACTICAL</h1>
              <p style={{ fontSize: '9px', opacity: 0.5, margin: 0 }}>SISTEMA DE MONITORAMENTO EM TEMPO REAL</p>
            </div>
          </div>
          <div className="glass" style={{ marginLeft: '12px', borderRadius: '16px', padding: '4px', display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => setFilters(f => ({ ...f, agents: !f.agents }))} 
              className={filters.agents ? 'tab-active' : ''} 
              style={{ height: '44px', padding: '0 15px', borderRadius: '12px', background: 'transparent', color: '#fff', fontSize: '10px', fontWeight: '800', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Users size={14} /> AGENTES {filters.agents ? 'ON' : 'OFF'}
            </button>
            <button 
              onClick={() => setFilters(f => ({ ...f, alerts: !f.alerts }))} 
              className={filters.alerts ? 'tab-active' : ''} 
              style={{ height: '44px', padding: '0 15px', borderRadius: '12px', background: 'transparent', color: '#fff', fontSize: '10px', fontWeight: '800', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <AlertTriangle size={14} /> ALERTAS {filters.alerts ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="glass" style={{ marginLeft: 'auto', borderRadius: '16px', padding: '4px', display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => setViewMode('admin')} 
              className={viewMode === 'admin' ? 'tab-active' : ''} 
              style={{ 
                height: '44px', 
                padding: '0 20px', 
                borderRadius: '12px', 
                background: 'transparent', 
                color: (user?.role === 'adm' || user?.role === 'admin' || !user) ? '#fff' : 'rgba(255,255,255,0.2)', 
                fontSize: '10px', 
                fontWeight: '800', 
                cursor: (user?.role === 'adm' || user?.role === 'admin' || !user) ? 'pointer' : 'not-allowed', 
                border: 'none',
                opacity: (user?.role === 'adm' || user?.role === 'admin' || !user) ? 1 : 0.5
              }}
              disabled={user?.role !== 'adm' && user?.role !== 'admin' && !!user}
            >
              CENTRAL
            </button>
            <button 
              onClick={() => setViewMode('agent')} 
              className={viewMode === 'agent' ? 'tab-active' : ''} 
              style={{ height: '44px', padding: '0 20px', borderRadius: '12px', background: 'transparent', color: '#fff', fontSize: '10px', fontWeight: '800', cursor: 'pointer', border: 'none' }}
            >
              AGENTE
            </button>
          </div>
        </header>

        <div style={{ flex: 1, display: 'flex', gap: '20px', marginTop: '20px', minHeight: 0 }}>
          <aside style={{ width: '380px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column' }}>
            {viewMode === 'admin' ? (
              <div className="glass" style={{ borderRadius: '24px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '10px', color: '#8B6FFF', fontWeight: '900', letterSpacing: '1px', marginBottom: 20, textTransform: 'uppercase' }}>Unidades de Campo</h3>
                <div className="sidebar-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {agents.map(a => (
                    <div key={a.id} onClick={() => setSelectedAgentId(a.id)} className="glass-hover" style={{ padding: '15px', borderRadius: '16px', cursor: 'pointer', background: selectedAgentId === a.id ? 'rgba(139,111,255,0.1)' : 'transparent', border: `1px solid ${selectedAgentId === a.id ? '#8B6FFF' : 'rgba(255,255,255,0.05)'}`, transition: '0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <Shield size={14} color="#8B6FFF" />
                           <span style={{ fontWeight: '800', fontSize: '13px' }}>{a.nome}</span>
                        </div>
                        {selectedAgentId === a.id && <button onClick={(e) => { e.stopPropagation(); setAllocationMode(true); }} style={{ padding: '6px 12px', background: '#8B6FFF', borderRadius: '8px', fontSize: '10px', fontWeight: '900', color: '#fff', border: 'none', cursor: 'pointer' }}>ALOCAR</button>}
                      </div>
                      <p style={{ margin: '8px 0 0 26px', fontSize: '10px', opacity: 0.5 }}>{a.area || 'ESTAÇÃO BASE'}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass" style={{ borderRadius: '24px', padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(139,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={24} color="#8B6FFF" />
                   </div>
                   <div>
                      <h3 style={{ fontSize: '10px', color: '#8B6FFF', fontWeight: '900', margin: 0 }}>PERFIL AGENTE</h3>
                      <p style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>OPERACIONAL ATIVO</p>
                   </div>
                </div>
                <select value={simulateAgentId} onChange={(e) => setSimulateAgentId(parseInt(e.target.value))} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(139,111,255,0.2)', padding: '14px', borderRadius: '16px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                  {agents.map(a => <option key={a.id} value={a.id} style={{ background: '#04040F' }}>{a.nome}</option>)}
                </select>
                <div style={{ padding: '24px', background: 'rgba(0,229,160,0.06)', borderRadius: '20px', border: '1px solid rgba(0,229,160,0.2)', marginTop: 'auto' }}>
                  <span style={{ fontSize: '10px', color: '#00E5A0', fontWeight: '900' }}>DESTINO ATUAL:</span>
                  <p style={{ fontSize: '24px', fontWeight: '900', margin: '10px 0' }}>{currentAgent?.area || 'EM PATRULHA'}</p>
                </div>
              </div>
            )}
          </aside>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div key={n.id} className="glass slide-up" style={{ width: '360px', padding: '20px', borderRadius: '24px', borderLeft: `6px solid ${n.type === 'alert' ? '#FF3B6B' : '#8B6FFF'}`, pointerEvents: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                   <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: n.type === 'alert' ? 'rgba(255,59,107,0.1)' : 'rgba(139,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {n.type === 'alert' ? <AlertCircle size={20} color="#FF3B6B" /> : <Bell size={20} color="#8B6FFF" />}
                   </div>
                   <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '900' }}>{n.title}</h4>
                      <p style={{ margin: '8px 0 15px', fontSize: '12px', opacity: 0.6 }}>{n.msg}</p>
                      {n.type === 'alert' && (
                        <button 
                          onClick={() => {
                            if (n.posOrigem && n.posDestino) {
                              startAgentGPS(n.posOrigem, n.posDestino);
                              marcarNotifLida(n.id);
                              setNotifications(prev => prev.filter(x => x.id !== n.id));
                            }
                          }} 
                          className="glass-hover"
                          style={{ width: '100%', padding: '12px', background: '#8B6FFF', borderRadius: '12px', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 110 }}
                        > 
                          <Navigation size={14} className="fill-white" />
                          VER NOVO LOCAL • ABRIR GPS 
                        </button>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'auto', zIndex: 105, position: 'relative' }}>
          <div className="glass" style={{ padding: '12px 24px', borderRadius: '16px', fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={14} color="#00E5A0" /> SISTEMA OPERACIONAL • CONEXÃO ESTÁVEL
          </div>
          <button onClick={handleBack} style={{ padding: '0 24px', height: '44px', background: 'rgba(255, 59, 107, 0.1)', border: '1px solid #FF3B6B', borderRadius: '16px', color: '#FF3B6B', fontWeight: '900', fontSize: '11px', cursor: 'pointer', zIndex: 110 }}>ENCERRAR TERMINAL</button>
        </footer>
      </div>
    </div>
  );
}
