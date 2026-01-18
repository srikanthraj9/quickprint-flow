import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Usb, Keyboard } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const UploadScreen = () => {
  const navigate = useNavigate();
  const { updatePrintJob } = usePrintJob();
  const [jobCode, setJobCode] = useState('');

  const handleContinue = () => {
    // Simulate file upload with job code
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
    // Simulate QR upload
    updatePrintJob({
      fileName: 'Resume_2026.pdf',
      totalPages: 8,
      jobCode: 'QR12345',
    });
    navigate('/preview');
  };

  return (
    <KioskLayout currentStep={1}>
      <div className="flex flex-col items-center gap-8 max-w-xl w-full">
        <h1 className="kiosk-title text-foreground text-center">
          Upload Your PDF
        </h1>

        {/* QR Code Section */}
        <div 
          onClick={handleQRUpload}
          className="qr-container w-full flex flex-col items-center gap-4 cursor-pointer hover:border-primary transition-colors"
        >
          <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center">
            <QrCode className="w-40 h-40 text-foreground" />
          </div>
          <p className="kiosk-body text-center text-muted-foreground">
            Scan to upload PDF from phone
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xl font-semibold text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Job Code Input */}
        <div className="w-full">
          <label className="kiosk-label block mb-3">
            <Keyboard className="inline w-5 h-5 mr-2" />
            Enter Job Code
          </label>
          <input
            type="text"
            value={jobCode}
            onChange={(e) => setJobCode(e.target.value.toUpperCase())}
            placeholder="e.g. ABC123"
            className="w-full px-6 py-5 text-2xl font-medium bg-card border-2 border-border rounded-xl 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                       placeholder:text-muted-foreground/50 text-center tracking-widest"
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!jobCode.trim()}
          className={`kiosk-btn-primary w-full ${
            !jobCode.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
        </button>

        {/* USB Option */}
        <button className="kiosk-btn-outline w-full">
          <Usb className="w-6 h-6" />
          Use USB Drive
        </button>
      </div>
    </KioskLayout>
  );
};

export default UploadScreen;
