import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/ui/toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { LandingPage } from './pages/LandingPage';
import { ServicePage } from './pages/ServicePage';
import { ServicesOverview } from './pages/ServicesOverview';
import { SetReminderPage } from './pages/SetReminderPage';
import { ProviderRegisterPage } from './pages/ProviderRegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <OfflineIndicator />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/service/:serviceType" element={<ServicePage />} />
                <Route path="/set-reminder" element={<SetReminderPage />} />
                <Route path="/provider-register" element={<ProviderRegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
