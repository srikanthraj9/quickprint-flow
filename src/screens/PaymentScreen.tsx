import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Clock, Loader2, X } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { calculatePrice } = usePrintJob();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
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

    // Simulate payment success after 5 seconds for demo
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
      <div className="flex flex-col items-center gap-8 max-w-xl w-full">
        <h1 className="kiosk-title text-foreground text-center">
          Pay to Print
        </h1>

        {/* Amount & Timer */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="kiosk-label">Amount</p>
            <p className="text-4xl font-bold text-primary">₹{totalAmount}</p>
          </div>
          <div className="w-px h-16 bg-border" />
          <div className="text-center">
            <p className="kiosk-label flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Left
            </p>
            <p className={`text-4xl font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-foreground'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="qr-container w-full flex flex-col items-center gap-4">
          <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center relative">
            <QrCode className="w-56 h-56 text-foreground" />
            {status === 'processing' && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="absolute inset-0 bg-success/90 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <div className="text-6xl mb-2">✓</div>
                  <p className="text-xl font-bold">Payment Received</p>
                </div>
              </div>
            )}
          </div>
          <p className="kiosk-body text-center text-muted-foreground">
            Scan & Pay using any UPI app
          </p>
        </div>

        {/* Status */}
        <div className="kiosk-card w-full">
          <div className="flex items-center justify-center gap-3">
            {status === 'waiting' && (
              <>
                <Loader2 className="w-6 h-6 text-warning animate-spin" />
                <span className="text-xl font-medium text-muted-foreground">
                  Waiting for payment...
                </span>
              </>
            )}
            {status === 'processing' && (
              <>
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="text-xl font-medium text-primary">
                  Processing payment...
                </span>
              </>
            )}
            {status === 'success' && (
              <span className="text-xl font-medium text-success">
                Payment successful! Starting print...
              </span>
            )}
          </div>
        </div>

        {/* Tip */}
        <p className="text-lg text-muted-foreground text-center">
          💡 Tip: Keep your phone close to QR for faster scanning
        </p>

        {/* Cancel Button */}
        <button
          onClick={() => navigate('/')}
          className="kiosk-btn-destructive w-full"
        >
          <X className="w-6 h-6" />
          Cancel
        </button>
      </div>
    </KioskLayout>
  );
};

export default PaymentScreen;
