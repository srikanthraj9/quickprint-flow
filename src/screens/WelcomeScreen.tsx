import { useNavigate } from 'react-router-dom';
import { Printer, CircleDollarSign, HelpCircle, Globe } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { useState } from 'react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  return (
    <KioskLayout showSteps={false} showBack={false} showHome={false}>
      <div className="flex flex-col items-center gap-10 max-w-xl w-full">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 bg-primary rounded-3xl flex items-center justify-center shadow-xl">
            <Printer className="w-16 h-16 text-primary-foreground" />
          </div>
          <h1 className="kiosk-title text-foreground">QuickPrint</h1>
        </div>

        {/* Tagline */}
        <p className="kiosk-body text-muted-foreground text-center">
          Print PDF in seconds
        </p>

        {/* Main CTA */}
        <button
          onClick={() => navigate('/upload')}
          className="kiosk-btn-primary w-full text-3xl py-8 animate-bounce-gentle"
        >
          <Printer className="w-10 h-10" />
          START PRINTING
        </button>

        {/* Secondary Actions */}
        <div className="flex gap-4 w-full">
          <button className="kiosk-btn-secondary flex-1">
            <CircleDollarSign className="w-6 h-6" />
            Pricing
          </button>
          <button className="kiosk-btn-secondary flex-1">
            <HelpCircle className="w-6 h-6" />
            Help
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-secondary text-secondary-foreground px-4 py-3 rounded-xl text-lg font-medium border-2 border-border cursor-pointer"
          >
            <option>English</option>
            <option>हिंदी</option>
            <option>தமிழ்</option>
            <option>తెలుగు</option>
            <option>ಕನ್ನಡ</option>
          </select>
        </div>
      </div>
    </KioskLayout>
  );
};

export default WelcomeScreen;
