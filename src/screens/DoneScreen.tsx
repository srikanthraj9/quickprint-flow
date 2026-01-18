import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Printer, ArrowRight } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const DoneScreen = () => {
  const navigate = useNavigate();
  const { resetPrintJob } = usePrintJob();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetPrintJob();
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, resetPrintJob]);

  const handlePrintAnother = () => {
    resetPrintJob();
    navigate('/upload');
  };

  return (
    <KioskLayout showSteps={false} showBack={false}>
      <div className="flex flex-col items-center gap-8 max-w-lg w-full px-4">
        {/* Success Icon */}
        <div className="w-28 h-28 bg-success/10 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="w-16 h-16 text-success" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="kiosk-title text-foreground mb-2">
            Done! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            Collect your documents below
          </p>
        </div>

        {/* Collect Papers Indicator */}
        <div className="kiosk-card-elevated w-full flex items-center justify-center gap-4 py-6">
          <Printer className="w-10 h-10 text-primary" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">Paper Tray</span>
            <span className="text-base text-muted-foreground">↓ Collect below</span>
          </div>
        </div>

        {/* Print Another Button */}
        <button
          onClick={handlePrintAnother}
          className="kiosk-btn-3d w-full"
        >
          <Printer className="w-7 h-7" />
          Print Another
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Auto Return Timer */}
        <p className="text-base text-muted-foreground text-center">
          Returning to home in <span className="font-bold text-foreground">{countdown}s</span>
        </p>
      </div>
    </KioskLayout>
  );
};

export default DoneScreen;
