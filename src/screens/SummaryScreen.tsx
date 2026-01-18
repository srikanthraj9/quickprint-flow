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
      <div className="flex flex-col items-center gap-5 max-w-lg w-full px-4">
        <h1 className="kiosk-subtitle text-foreground text-center">
          Order Summary
        </h1>

        {/* Document Info */}
        <div className="kiosk-card w-full">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground truncate">
              {printJob.fileName || 'Document.pdf'}
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Print Type</span>
              <span className="text-base font-semibold text-foreground">
                {printJob.printType === 'bw' ? 'Black & White' : 'Color'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Pages</span>
              <span className="text-base font-semibold text-foreground">
                {printJob.pages === 'all' ? `All (${printJob.totalPages})` : printJob.pages}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Copies</span>
              <span className="text-base font-semibold text-foreground">{printJob.copies}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Sides</span>
              <span className="text-base font-semibold text-foreground">
                {printJob.sides === 'single' ? 'Single' : 'Both Sides'}
              </span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="kiosk-card-elevated w-full bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="text-center py-2">
            <p className="text-base text-muted-foreground mb-1">Total Amount</p>
            <p className="text-5xl md:text-6xl font-extrabold text-primary">
              ₹{totalAmount}
            </p>
          </div>
        </div>

        {/* Proceed to Payment */}
        <button
          onClick={() => navigate('/payment')}
          className="kiosk-btn-success w-full"
        >
          <CreditCard className="w-6 h-6" />
          Proceed to Payment
        </button>
      </div>
    </KioskLayout>
  );
};

export default SummaryScreen;
