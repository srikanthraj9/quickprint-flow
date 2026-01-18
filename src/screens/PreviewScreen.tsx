import { useNavigate } from 'react-router-dom';
import { FileText, RefreshCw, ArrowRight } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PreviewScreen = () => {
  const navigate = useNavigate();
  const { printJob } = usePrintJob();

  return (
    <KioskLayout currentStep={2}>
      <div className="flex flex-col items-center gap-8 max-w-xl w-full">
        <h1 className="kiosk-title text-foreground text-center">
          Confirm Document
        </h1>

        {/* File Info */}
        <div className="kiosk-card w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="kiosk-body font-bold text-foreground">
                {printJob.fileName || 'Document.pdf'}
              </p>
              <p className="text-lg text-muted-foreground">
                {printJob.totalPages || 12} pages
              </p>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="kiosk-card w-full aspect-[3/4] flex flex-col items-center justify-center bg-muted/50">
          <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-col items-center justify-center p-8">
            <FileText className="w-24 h-24 text-muted-foreground/50 mb-4" />
            <p className="text-xl text-muted-foreground">Page 1 Preview</p>
            <div className="mt-6 w-3/4 space-y-3">
              <div className="h-4 bg-muted rounded-full w-full" />
              <div className="h-4 bg-muted rounded-full w-5/6" />
              <div className="h-4 bg-muted rounded-full w-4/6" />
              <div className="h-4 bg-muted rounded-full w-full" />
              <div className="h-4 bg-muted rounded-full w-3/4" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 w-full">
          <button
            onClick={() => navigate('/upload')}
            className="kiosk-btn-secondary flex-1"
          >
            <RefreshCw className="w-6 h-6" />
            Change File
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="kiosk-btn-primary flex-1"
          >
            Continue
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default PreviewScreen;
