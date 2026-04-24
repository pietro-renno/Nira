import React from 'react';
import TabRelatorios from '../../components/admin/TabRelatorios';
import { LineChart } from 'lucide-react';

export default function AdminRelatorios() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <LineChart size={28} className="text-brand-primary" />
            Relatórios Inteligentes
          </h2>
          <p className="text-text-muted mt-2 text-sm">
            NIRA Admin · Análise de métricas de impacto social com inteligência artificial
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <TabRelatorios />
      </div>
    </div>
  );
}
