import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Consulting } from './pages/Consulting';
import { Construction } from './pages/Construction';
import { Services } from './pages/Services';
import { Detail } from './pages/Detail';
import { Ventures } from './pages/Ventures';
import { Insights } from './pages/Insights';

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
              <Route path="about" element={<About />} />
              <Route path="consulting" element={<Consulting />} />
              <Route path="consulting/capabilities" element={<Detail page="consulting-capabilities" />} />
              <Route path="consulting/industries" element={<Detail page="consulting-industries" />} />
              <Route path="consulting/how-we-work" element={<Detail page="consulting-how-we-work" />} />
              <Route path="construction" element={<Construction />} />
              <Route path="construction/architecture" element={<Detail page="construction-architecture" />} />
              <Route path="construction/engineering" element={<Detail page="construction-engineering" />} />
              <Route path="construction/build" element={<Detail page="construction-build" />} />
              <Route path="services" element={<Services />} />
              <Route path="services/accounting-finance" element={<Detail page="services-accounting" />} />
              <Route path="services/marketing-media" element={<Detail page="services-marketing" />} />
              <Route path="services/admin-legal" element={<Detail page="services-admin" />} />
              <Route path="ventures" element={<Ventures />} />
              <Route path="insights" element={<Insights />} />
              <Route path="*" element={<RedirectHome />} />
            </Route>
          </Routes>
        </ModalProvider>
      </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
