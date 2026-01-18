import { useNavigate } from 'react-router-dom';
import { FileText, RefreshCw, ArrowRight } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PreviewScreen = () => {
  const navigate = useNavigate();
  const { printJob } = usePrintJob();

  return (
    <KioskLayout currentStep={2}>
      <div className="flex flex-col items-center gap-5 max-w-lg w-full px-4">
        <h1 className="kiosk-subtitle text-foreground text-center">
          Confirm Document
        </h1>

        {/* File Info */}
        <div className="kiosk-card-elevated w-full">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-xl font-bold text-foreground truncate">
                {printJob.fileName || 'Document.pdf'}
              </p>
              <p className="text-base text-muted-foreground">
                {printJob.totalPages || 12} pages
              </p>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="kiosk-card w-full">
          <div className="aspect-[4/5] bg-white rounded-xl shadow-inner flex flex-col items-center justify-center p-6 border border-border">
            <FileText className="w-16 h-16 text-muted-foreground/40 mb-3" />
            <p className="text-base text-muted-foreground mb-4">Page 1 Preview</p>
            <div className="w-3/4 space-y-2">
              <div className="h-3 bg-muted rounded-full w-full" />
              <div className="h-3 bg-muted rounded-full w-5/6" />
              <div className="h-3 bg-muted rounded-full w-4/6" />
              <div className="h-3 bg-muted rounded-full w-full" />
              <div className="h-3 bg-muted rounded-full w-3/4" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={() => navigate('/upload')}
            className="kiosk-btn-secondary flex-1"
          >
            <RefreshCw className="w-5 h-5" />
            Change
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="kiosk-btn-primary flex-[2]"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default PreviewScreen;
