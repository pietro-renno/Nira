import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NiraProvider } from './context/NiraContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NiraProvider>
        <App />
      </NiraProvider>
    </AuthProvider>
  </StrictMode>,
)
