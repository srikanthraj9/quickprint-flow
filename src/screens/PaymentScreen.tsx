import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Clock, Loader2, X, Smartphone } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { calculatePrice } = usePrintJob();
  const [timeLeft, setTimeLeft] = useState(180);
  const [status, setStatus] = useState<'waiting' | 'processing' | 'success'>('waiting');

  const totalAmount = calculatePrice();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const paymentTimer = setTimeout(() => {
      setStatus('processing');
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => navigate('/printing'), 1000);
      }, 2000);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(paymentTimer);
    };
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <KioskLayout currentStep={5} showBack={false}>
      <div className="flex flex-col items-center gap-5 max-w-lg w-full px-4">
        <h1 className="kiosk-subtitle text-foreground text-center">
          Pay to Print
        </h1>

        {/* Amount & Timer */}
        <div className="kiosk-card w-full">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-3xl font-bold text-primary">₹{totalAmount}</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
                <Clock className="w-4 h-4" />
                Time Left
              </p>
              <p className={`text-3xl font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="kiosk-card-elevated w-full flex flex-col items-center gap-4 py-6">
          <div className="qr-container relative">
            <div className="w-48 h-48 flex items-center justify-center">
              <QrCode className="w-44 h-44 text-foreground" />
            </div>
            {status === 'processing' && (
              <div className="absolute inset-0 bg-white/95 flex items-center justify-center rounded-xl">
                <Loader2 className="w-14 h-14 text-primary animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="absolute inset-0 bg-success flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <div className="text-5xl mb-1">✓</div>
                  <p className="text-lg font-bold">Paid!</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Smartphone className="w-5 h-5" />
            <span className="text-base font-medium">Scan & Pay with any UPI app</span>
          </div>
        </div>

        {/* Status */}
        <div className="kiosk-card w-full">
          <div className="flex items-center justify-center gap-2">
            {status === 'waiting' && (
              <>
                <Loader2 className="w-5 h-5 text-warning animate-spin" />
                <span className="text-base font-medium text-muted-foreground">
                  Waiting for payment...
                </span>
              </>
            )}
            {status === 'processing' && (
              <>
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-base font-medium text-primary">
                  Processing payment...
                </span>
              </>
            )}
            {status === 'success' && (
              <span className="text-base font-medium text-success">
                ✓ Payment successful! Starting print...
              </span>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => navigate('/')}
          className="kiosk-btn-destructive w-full"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </KioskLayout>
  );
};

export default PaymentScreen;
