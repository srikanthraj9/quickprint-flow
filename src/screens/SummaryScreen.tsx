import { useNavigate } from 'react-router-dom';
import { FileText, CreditCard } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const SummaryScreen = () => {
  const navigate = useNavigate();
  const { printJob, calculatePrice } = usePrintJob();
  
  const totalAmount = calculatePrice();

  return (
    <KioskLayout currentStep={4}>
      <div className="flex flex-col items-center gap-8 max-w-xl w-full">
        <h1 className="kiosk-title text-foreground text-center">
          Order Summary
        </h1>

        {/* Document Info */}
        <div className="kiosk-card w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <p className="kiosk-body font-bold text-foreground">
              {printJob.fileName || 'Document.pdf'}
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-xl text-muted-foreground">Print Type</span>
              <span className="text-xl font-semibold text-foreground">
                {printJob.printType === 'bw' ? 'Black & White' : 'Color'}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-xl text-muted-foreground">Pages</span>
              <span className="text-xl font-semibold text-foreground">
                {printJob.pages === 'all' ? printJob.totalPages : printJob.pages}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-xl text-muted-foreground">Copies</span>
              <span className="text-xl font-semibold text-foreground">{printJob.copies}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-xl text-muted-foreground">Sides</span>
              <span className="text-xl font-semibold text-foreground">
                {printJob.sides === 'single' ? 'Single Side' : 'Both Sides'}
              </span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="kiosk-card w-full bg-primary/5 border-primary/20">
          <div className="text-center">
            <p className="kiosk-label mb-2">Total Amount</p>
            <p className="text-6xl font-extrabold text-primary">
              ₹{totalAmount}
            </p>
          </div>
        </div>

        {/* Proceed to Payment */}
        <button
          onClick={() => navigate('/payment')}
          className="kiosk-btn-success w-full"
        >
          <CreditCard className="w-7 h-7" />
          Proceed to Payment
        </button>
      </div>
    </KioskLayout>
  );
};

export default SummaryScreen;
