import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';

function RedirectHome() {
  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
      <ThemeProvider>
        <ModalProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<RedirectHome />} />
              <Route path="consulting" element={<RedirectHome />} />
              <Route path="construction" element={<RedirectHome />} />
              <Route path="services" element={<RedirectHome />} />
              <Route path="services/accounting-finance" element={<RedirectHome />} />
              <Route path="services/marketing-media" element={<RedirectHome />} />
              <Route path="accelerator" element={<RedirectHome />} />
              <Route path="*" element={<RedirectHome />} />
            </Route>
          </Routes>
        </ModalProvider>
      </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
