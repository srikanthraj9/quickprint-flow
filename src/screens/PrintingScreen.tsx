import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PrintingScreen = () => {
  const navigate = useNavigate();
  const { printJob } = usePrintJob();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = printJob.totalPages || 12;

  useEffect(() => {
    const printInterval = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev >= totalPages) {
          clearInterval(printInterval);
          setTimeout(() => navigate('/done'), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(printInterval);
  }, [totalPages, navigate]);

  const progress = (currentPage / totalPages) * 100;

  return (
    <KioskLayout showSteps={false} showBack={false} showHome={false} showFooter={false}>
      <div className="flex flex-col items-center gap-8 max-w-lg w-full px-4">
        <h1 className="kiosk-title text-foreground text-center">
          Printing...
        </h1>

        {/* Printer Animation */}
        <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
          <Printer className="w-20 h-20 text-primary animate-printer-animate" />
        </div>

        {/* Progress */}
        <div className="w-full kiosk-card">
          <div className="flex justify-between mb-3">
            <span className="text-lg text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <span className="text-lg font-bold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Message */}
        <div className="kiosk-card w-full text-center">
          <p className="text-lg text-muted-foreground">
            ⏳ Please wait. Do not leave.
          </p>
        </div>

        <p className="text-base text-muted-foreground">
          {printJob.fileName || 'Document.pdf'}
        </p>
      </div>
    </KioskLayout>
  );
};

export default PrintingScreen;
