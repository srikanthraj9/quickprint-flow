import { ArrowLeft, Home } from 'lucide-react';
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
    <footer className="w-full bg-card border-t border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Back Button */}
        {showBack && !isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="kiosk-btn-outline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-24" />
        )}

        {/* Home Button */}
        {showHome && !isHome ? (
          <button
            onClick={() => navigate('/')}
            className="kiosk-btn-outline"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </footer>
  );
};

export default KioskFooter;
