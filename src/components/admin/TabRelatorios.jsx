import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend 
} from 'recharts';
import { BrainCircuit, Loader2, Sparkles, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- MOCK DATA ---
const casesByHour = [
  { hour: '00:00', casos: 12 }, { hour: '04:00', casos: 5 }, { hour: '08:00', casos: 28 },
  { hour: '12:00', casos: 45 }, { hour: '16:00', casos: 38 }, { hour: '20:00', casos: 56 },
  { hour: '23:59', casos: 30 }
];

const casesByRegion = [
  { region: 'Centro', incidentes: 120 }, { region: 'Zona Sul', incidentes: 85 },
  { region: 'Zona Leste', incidentes: 150 }, { region: 'Zona Norte', incidentes: 60 },
  { region: 'Zona Oeste', incidentes: 95 }
];

export default function TabRelatorios() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleDeepAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'sua_chave_de_api_aqui') {
        throw new Error('Chave de API do Gemini não configurada. Por favor, adicione a VITE_GEMINI_API_KEY no arquivo .env.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const prompt = `
        Atue como um analista de segurança pública e inteligência de dados do sistema NIRA. 
        Nós temos os seguintes dados recentes de incidentes relatados no sistema:
        
        Distribuição por horário:
        ${casesByHour.map(d => `- ${d.hour}: ${d.casos} casos`).join('\n')}
        
        Distribuição por região:
        ${casesByRegion.map(d => `- ${d.region}: ${d.incidentes} incidentes`).join('\n')}
        
        Por favor, analise esses dados profundamente e forneça:
        1. A gravidade atual do problema baseada na concentração de casos em horários/regiões.
        2. Sugestões de melhoria para o problema ou alocação de equipes.
        3. Expectativas para o futuro com base nessa tendência.
        4. Uma avaliação sobre nossa efetividade (se estamos lidando bem com os focos).

        Responda em formato profissional, direto, utilizando formatação clara e markdown sem utilizar emojis. Use marcadores e negrito quando necessário.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setAiResponse(responseText);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro ao conectar com a IA.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Custom Tooltip para manter o visual dark
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(22,20,44,0.95)', border: '1px solid rgba(155,143,255,0.2)', padding: '12px', borderRadius: '8px', color: '#F4F6F8' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: 0, fontSize: '0.8rem', color: entry.color }}>
              {entry.name}: <strong style={{color: '#fff'}}>{entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      
      {/* Indicadores Principais */}
      <div className="adm-stats-row">
        <div className="adm-stat-card adm-stat-card--danger">
          <p className="adm-stat-lbl">Pico de Casos (Horário)</p>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <p className="adm-stat-num">20:00</p>
            <TrendingUp size={24} className="text-brand-emergency" />
          </div>
          <p className="adm-stat-delta" style={{color: '#FF4757'}}>Horário Crítico</p>
        </div>
        <div className="adm-stat-card">
          <p className="adm-stat-lbl">Região mais afetada</p>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <p className="adm-stat-num">Z. Leste</p>
            <AlertTriangle size={24} className="text-brand-primary" />
          </div>
          <p className="adm-stat-delta">150 incidentes</p>
        </div>
        <div className="adm-stat-card">
          <p className="adm-stat-lbl">Média Diária</p>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <p className="adm-stat-num">214</p>
            <TrendingDown size={24} className="text-green-500" />
          </div>
          <p className="adm-stat-delta" style={{color: '#2ED573'}}>-5% vs Mês Anterior</p>
        </div>
        <div className="adm-stat-card">
          <p className="adm-stat-lbl">Status do Sistema</p>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <p className="adm-stat-num">Estável</p>
            <CheckCircle size={24} className="text-brand-primary" />
          </div>
          <p className="adm-stat-delta" style={{color: '#9B8FFF'}}>Todas ONGs conectadas</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Gráfico 1: Casos por Horário */}
        <div style={{ background: 'rgb(22,20,44)', border: '1px solid rgba(107,104,152,0.16)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ color: '#F4F6F8', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LineChart size={18} className="text-brand-primary" /> 
            Volume de Casos por Horário
          </h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={casesByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,104,152,0.1)" />
                <XAxis dataKey="hour" stroke="rgba(239,238,234,0.4)" fontSize={12} tickMargin={10} />
                <YAxis stroke="rgba(239,238,234,0.4)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="casos" name="Casos" stroke="#9B8FFF" strokeWidth={3} dot={{ r: 4, fill: '#9B8FFF', strokeWidth: 2, stroke: '#16142C' }} activeDot={{ r: 6, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Casos por Região */}
        <div style={{ background: 'rgb(22,20,44)', border: '1px solid rgba(107,104,152,0.16)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ color: '#F4F6F8', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Map size={18} className="text-brand-primary" /> 
            Incidentes por Região
          </h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={casesByRegion} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,104,152,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="rgba(239,238,234,0.4)" fontSize={12} />
                <YAxis dataKey="region" type="category" stroke="rgba(239,238,234,0.6)" fontSize={12} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="incidentes" name="Incidentes" fill="#FF4757" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção AI Gemini */}
      <div style={{ background: 'rgba(155,143,255,0.04)', border: '1px solid rgba(155,143,255,0.2)', borderRadius: '16px', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ color: '#F4F6F8', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit className="text-brand-primary" size={28} />
              Inteligência Artificial NIRA
            </h2>
            <p style={{ color: 'rgba(239,238,234,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Envie os dados atuais de incidentes para o Google Gemini. A IA analisará os padrões de horários e regiões para sugerir melhorias de eficiência e prever cenários de risco.
            </p>
          </div>
          
          <button 
            onClick={handleDeepAnalysis} 
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.95rem' }}
          >
            {isAnalyzing ? (
              <><Loader2 size={18} className="animate-spin" /> Analisando Dados...</>
            ) : (
              <><Sparkles size={18} /> Análise Profunda com IA</>
            )}
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', color: '#FF4757', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} />
            {error}
          </div>
        )}

        {aiResponse && (
          <div style={{ 
            marginTop: '24px', 
            background: 'rgb(16,14,34)', 
            border: '1px solid rgba(107,104,152,0.3)', 
            borderRadius: '12px', 
            padding: '24px',
            color: '#F4F6F8',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            animation: 'fadeInUp 0.5s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#9B8FFF', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Sparkles size={16} /> Relatório Gerado
            </div>
            {/* Renderizar resposta formatada (Basic Markdown to HTML convert) */}
            <div 
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}
            />
          </div>
        )}
      </div>

    </div>
  );
}
