import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Usb, Keyboard, ArrowRight } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const UploadScreen = () => {
  const navigate = useNavigate();
  const { updatePrintJob } = usePrintJob();
  const [jobCode, setJobCode] = useState('');

  const handleContinue = () => {
    if (jobCode.trim()) {
      updatePrintJob({
        fileName: 'Document_' + jobCode + '.pdf',
        totalPages: 12,
        jobCode: jobCode,
      });
      navigate('/preview');
    }
  };

  const handleQRUpload = () => {
    updatePrintJob({
      fileName: 'Resume_2026.pdf',
      totalPages: 8,
      jobCode: 'QR12345',
    });
    navigate('/preview');
  };

  return (
    <KioskLayout currentStep={1}>
      <div className="flex flex-col items-center gap-5 max-w-lg w-full px-4">
        <h1 className="kiosk-subtitle text-foreground text-center">
          Upload Your PDF
        </h1>

        {/* QR Code Section */}
        <div 
          onClick={handleQRUpload}
          className="kiosk-card-elevated w-full flex flex-col items-center gap-4 cursor-pointer hover:border-primary transition-all"
        >
          <div className="qr-container">
            <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
              <QrCode className="w-32 h-32 md:w-40 md:h-40 text-foreground" />
            </div>
          </div>
          <p className="text-lg text-center text-muted-foreground font-medium">
            Scan to upload PDF from phone
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-border" />
          <span className="text-lg font-semibold text-muted-foreground px-2">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Job Code Input */}
        <div className="kiosk-card w-full">
          <label className="kiosk-label flex items-center gap-2 mb-3">
            <Keyboard className="w-5 h-5" />
            Enter Job Code
          </label>
          <input
            type="text"
            value={jobCode}
            onChange={(e) => setJobCode(e.target.value.toUpperCase())}
            placeholder="e.g. ABC123"
            className="w-full px-5 py-4 text-xl md:text-2xl font-semibold bg-background border-2 border-border rounded-xl 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                       placeholder:text-muted-foreground/40 text-center tracking-widest"
          />
          
          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!jobCode.trim()}
            className={`kiosk-btn-primary w-full mt-4 ${
              !jobCode.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* USB Option */}
        <button className="kiosk-btn-secondary w-full">
          <Usb className="w-5 h-5" />
          Use USB Drive
        </button>
      </div>
    </KioskLayout>
  );
};

export default UploadScreen;
