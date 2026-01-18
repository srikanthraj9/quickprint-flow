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
      <div className="flex flex-col items-center gap-10 max-w-xl w-full">
        {/* Success Icon */}
        <div className="w-32 h-32 bg-success/10 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="w-20 h-20 text-success" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="kiosk-title text-foreground mb-2">
            Printing Completed 🎉
          </h1>
          <p className="kiosk-body text-muted-foreground">
            Please collect your documents below
          </p>
        </div>

        {/* Collect Papers Indicator */}
        <div className="kiosk-card w-full flex items-center justify-center gap-4 py-8">
          <Printer className="w-12 h-12 text-primary" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">Paper Tray</span>
            <span className="text-lg text-muted-foreground">↓ Collect below</span>
          </div>
        </div>

        {/* Print Another Button */}
        <button
          onClick={handlePrintAnother}
          className="kiosk-btn-primary w-full"
        >
          <Printer className="w-7 h-7" />
          Print Another Document
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Auto Return Timer */}
        <p className="text-lg text-muted-foreground text-center">
          Returning to home in: <span className="font-bold text-foreground">{countdown} seconds</span>
        </p>
      </div>
    </KioskLayout>
  );
};

export default DoneScreen;
