import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';

const css = `
.footer {
  background: var(--bg-deep);
  border-top: 1px solid rgba(107,104,152,.18);
  padding: 52px 0 28px;
}
.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer__brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.footer__brand-owl { font-size: 1.4rem; padding-top: 5px; }
.footer__brand-name { font-weight: 700; font-size: 1.2rem; letter-spacing: .14em; color: #F4F6F8; }
.footer__brand-desc { font-size: .85rem; color: rgba(239,238,234,.45); line-height: 1.7; max-width: 270px; margin-bottom: 14px; }
.footer__eye-tag { font-size: .68rem; color: rgba(239,238,234,.28); letter-spacing: .06em; }
.footer__col-title { font-weight: 700; font-size: .75rem; color: #F4F6F8; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 14px; }
.footer__links { display: flex; flex-direction: column; gap: 9px; }
.footer__link { font-size: .85rem; color: rgba(239,238,234,.65); text-decoration: none; transition: color .2s; }
.footer__link:hover { color: #9B8FFF; }

.footer__bottom {
  border-top: 1px solid rgba(107,104,152,.15);
  padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer__copy { font-size: .75rem; color: rgba(239,238,234,.4); }
.footer__socials { display: flex; gap: 16px; }
.footer__social { font-size: 1.1rem; color: rgba(239,238,234,.5); text-decoration: none; transition: all .2s; }
.footer__social:hover { color: #F4F6F8; transform: translateY(-2px); }

@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer__brand-col { column-span: all; grid-column: 1 / -1; }
}
@media (max-width: 500px) {
  .footer__inner { grid-template-columns: 1fr; }
  .footer__bottom { flex-direction: column; gap: 16px; text-align: center; }
}
`;

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="footer">
        <div className="container max-w-7xl mx-auto px-8 border-t border-white/5 pt-16">
          <div className="footer__inner">
            <div className="footer__brand-col">
              <div className="footer__brand-row">
                <span className="footer__brand-owl"><Shield size={24} strokeWidth={1.5} /></span>
                <span className="footer__brand-name">NIRA</span>
              </div>
              <p className="footer__brand-desc">
                Núcleo de Identificação e Resposta ao Abuso. Um porto seguro digital para ouvir, acolher e proteger quem mais precisa.
              </p>
              <p className="footer__eye-tag">E.Y.E — Ethical Youth Engineers · SESI-SENAI · 2026</p>
            </div>
            <div>
              <p className="footer__col-title">Plataforma</p>
              <div className="footer__links">
                <Link to="/" className="footer__link">Início</Link>
                <Link to="/como-funciona" className="footer__link">Como Funciona</Link>
                <Link to="/conteudos" className="footer__link">Conteúdos</Link>
                <Link to="/chat" className="footer__link">Triagem S.O.S.</Link>
              </div>
            </div>
            <div>
              <p className="footer__col-title">Projeto</p>
              <div className="footer__links">
                <Link to="/como-funciona" className="footer__link">Demonstração</Link>
                <Link to="/login" className="footer__link">Área Restrita</Link>
              </div>
            </div>
            <div>
              <p className="footer__col-title">Emergência</p>
              <div className="footer__links">
                <a href="tel:190" className="footer__link">190 — Polícia</a>
                <a href="tel:180" className="footer__link">180 — Central da Mulher</a>
                <a href="tel:192" className="footer__link">192 — SAMU</a>
                <a href="tel:100" className="footer__link">100 — Direitos Humanos</a>
                <Link to="/chat" className="footer__link flex items-center gap-1.5" style={{ color:'#FF4757' }}><AlertCircle size={14} /> S.O.S. NIRA</Link>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">© 2026 <span>NIRA</span> · Desenvolvido pela equipe <span>E.Y.E</span></p>
            <p className="footer__disclaimer">A NIRA é uma ferramenta de apoio e não substitui serviços de emergência. Em situação de perigo imediato, ligue 190 ou 180.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
