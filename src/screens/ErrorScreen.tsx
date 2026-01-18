import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, Phone } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';

interface ErrorScreenProps {
  errorMessage?: string;
}

const ErrorScreen = ({ errorMessage = 'Printer out of paper' }: ErrorScreenProps) => {
  const navigate = useNavigate();

  return (
    <KioskLayout showSteps={false} showBack={false}>
      <div className="flex flex-col items-center gap-8 max-w-lg w-full px-4">
        {/* Error Icon */}
        <div className="w-28 h-28 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-16 h-16 text-destructive" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="kiosk-title text-destructive mb-2">
            Error
          </h1>
          <p className="text-lg text-foreground">
            {errorMessage}
          </p>
        </div>

        {/* Support Info */}
        <div className="kiosk-card-elevated w-full text-center py-6">
          <p className="text-base text-muted-foreground mb-4">
            Please contact support
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Phone className="w-6 h-6" />
            <span className="text-2xl font-bold">+91-9876543210</span>
          </div>
        </div>

        {/* Go Home Button */}
        <button
          onClick={() => navigate('/')}
          className="kiosk-btn-primary w-full"
        >
          <Home className="w-6 h-6" />
          Go Home
        </button>
      </div>
    </KioskLayout>
  );
};

export default ErrorScreen;
