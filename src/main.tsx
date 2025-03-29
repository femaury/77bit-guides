import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Handle redirect from 404.html
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  const cleanPath = redirectPath.replace(/\/+$/, ''); // Remove trailing slashes
  if (cleanPath !== window.location.pathname) {
    // Use history API to navigate to the correct route without reloading
    window.history.replaceState(null, '', cleanPath);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
