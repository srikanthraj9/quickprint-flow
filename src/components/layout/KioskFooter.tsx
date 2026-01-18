import { ArrowLeft, Home, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface KioskFooterProps {
  showBack?: boolean;
  showHome?: boolean;
}

const KioskFooter = ({ showBack = true, showHome = true }: KioskFooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="w-full bg-card border-t border-border px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        {showBack && !isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="kiosk-btn-outline"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-32" />
        )}

        {/* Support */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <Phone className="w-5 h-5" />
          <span className="text-lg font-medium">Support: +91-9876543210</span>
        </div>

        {/* Home Button */}
        {showHome && !isHome ? (
          <button
            onClick={() => navigate('/')}
            className="kiosk-btn-outline"
          >
            <Home className="w-6 h-6" />
            <span>Home</span>
          </button>
        ) : (
          <div className="w-32" />
        )}
      </div>
    </footer>
  );
};

export default KioskFooter;
