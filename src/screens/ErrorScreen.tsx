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
      <div className="flex flex-col items-center gap-10 max-w-xl w-full">
        {/* Error Icon */}
        <div className="w-32 h-32 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-20 h-20 text-destructive" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="kiosk-title text-destructive mb-2">
            Error
          </h1>
          <p className="kiosk-body text-foreground">
            Reason: {errorMessage}
          </p>
        </div>

        {/* Support Info */}
        <div className="kiosk-card w-full text-center">
          <p className="kiosk-body text-muted-foreground mb-4">
            Please contact support for assistance
          </p>
          <div className="flex items-center justify-center gap-3 text-primary">
            <Phone className="w-6 h-6" />
            <span className="text-2xl font-bold">+91-9876543210</span>
          </div>
        </div>

        {/* Go Home Button */}
        <button
          onClick={() => navigate('/')}
          className="kiosk-btn-primary w-full"
        >
          <Home className="w-7 h-7" />
          Go Home
        </button>
      </div>
    </KioskLayout>
  );
};

export default ErrorScreen;
