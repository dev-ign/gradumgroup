import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Consulting } from './pages/Consulting';
import { Construction } from './pages/Construction';
import { Services } from './pages/Services';
import { AccountingFinance } from './pages/services/AccountingFinance';
import { MarketingMedia } from './pages/services/MarketingMedia';
import { Accelerator } from './pages/Accelerator';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <span className="text-6xl font-black text-[#AEE37B] mb-4">404</span>
      <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)] mb-2">Page Not Found</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-xs font-bold tracking-widest uppercase text-[#AEE37B] hover:underline">
        Return Home →
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="consulting" element={<Consulting />} />
              <Route path="construction" element={<Construction />} />
              <Route path="services" element={<Services />} />
              <Route path="services/accounting-finance" element={<AccountingFinance />} />
              <Route path="services/marketing-media" element={<MarketingMedia />} />
              <Route path="accelerator" element={<Accelerator />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
