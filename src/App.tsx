import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<GuideDetailPage />} />
          <Route 
            path="/guides/:slug" 
            element={<GuideRedirect />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Redirect component that preserves the slug parameter
function GuideRedirect() {
  const slug = window.location.pathname.split('/guides/')[1];
  return <Navigate to={`/${slug}`} replace />;
}

export default App;
