const fs = require('fs');
const path = require('path');

const components = [
  { path: 'src/layouts/PublicLayout.jsx', name: 'PublicLayout', content: `import { Outlet } from 'react-router-dom';\n\nexport default function PublicLayout() {\n  return (\n    <div className="flex flex-col min-h-screen">\n      <nav className="p-4 bg-bg-main border-b border-border-subtle text-white">Navbar Public Placeholder</nav>\n      <main className="flex-grow">\n        <Outlet />\n      </main>\n      <footer className="p-4 bg-bg-main-alt text-white">Footer Placeholder</footer>\n    </div>\n  );\n}` },
  { path: 'src/layouts/AdminLayout.jsx', name: 'AdminLayout', content: `import { Outlet } from 'react-router-dom';\n\nexport default function AdminLayout() {\n  return (\n    <div className="flex min-h-screen bg-bg-main">\n      <aside className="w-64 bg-bg-main border-r border-border-subtle text-white p-4">Admin Sidebar</aside>\n      <div className="flex flex-col flex-grow text-white">\n        <header className="p-4 border-b border-border-subtle bg-bg-main">Admin Header</header>\n        <main className="p-6">\n          <Outlet />\n        </main>\n      </div>\n    </div>\n  );\n}` },
  { path: 'src/pages/Home.jsx', name: 'Home' },
  { path: 'src/pages/ComoFunciona.jsx', name: 'ComoFunciona' },
  { path: 'src/pages/Conteudos.jsx', name: 'Conteudos' },
  { path: 'src/pages/Chat.jsx', name: 'Chat' },
  { path: 'src/pages/Login.jsx', name: 'Login' },
  { path: 'src/pages/admin/Dashboard.jsx', name: 'Dashboard' },
  { path: 'src/pages/admin/Alertas.jsx', name: 'Alertas' },
  { path: 'src/pages/admin/AdminConteudos.jsx', name: 'AdminConteudos' },
  { path: 'src/pages/admin/Usuarios.jsx', name: 'Usuarios' },
  { path: 'src/pages/admin/Mapa.jsx', name: 'Mapa' },
  { path: 'src/pages/admin/AtendimentosChat.jsx', name: 'AtendimentosChat' },
];

components.forEach(comp => {
  const fullPath = path.join(__dirname, '..', comp.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const content = comp.content || `export default function ${comp.name}() {\n  return <div className="text-white p-4">${comp.name} Page</div>;\n}`;
  
  fs.writeFileSync(fullPath, content);
});

console.log('Scaffolded all files');
