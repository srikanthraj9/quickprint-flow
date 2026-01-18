import { useNavigate } from 'react-router-dom';
import { Printer, CircleDollarSign, HelpCircle, Globe, Phone } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { useState } from 'react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  return (
    <KioskLayout showSteps={false} showBack={false} showHome={false} showFooter={false}>
      <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
        {/* Hero Section */}
        <div className="kiosk-card-elevated w-full text-center py-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg animate-glow">
              <Printer className="w-11 h-11 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                QuickPrint
              </h1>
              <p className="text-muted-foreground font-medium mt-1">
                Self-Service Printing
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="bg-muted/50 rounded-xl py-3 px-6 inline-block mb-8">
            <p className="kiosk-body text-foreground">
              Print PDF in seconds
            </p>
          </div>

          {/* Main CTA - 3D Button */}
          <button
            onClick={() => navigate('/upload')}
            className="kiosk-btn-3d w-full mb-6"
          >
            <Printer className="w-8 h-8" />
            Start Printing
          </button>

          {/* Secondary Actions */}
          <div className="flex gap-3 w-full">
            <button className="kiosk-btn-secondary flex-1">
              <CircleDollarSign className="w-5 h-5" />
              Pricing
            </button>
            <button className="kiosk-btn-secondary flex-1">
              <HelpCircle className="w-5 h-5" />
              Help
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full space-y-3">
          {/* Language Selector */}
          <div className="kiosk-card flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-5 h-5" />
              <span className="font-medium">Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-base font-medium border border-border cursor-pointer"
            >
              <option>English</option>
              <option>हिंदी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
              <option>ಕನ್ನಡ</option>
            </select>
          </div>

          {/* Support */}
          <div className="support-bar">
            <Phone className="w-4 h-4" />
            <span>Support: +91-9876543210</span>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
};

export default WelcomeScreen;
