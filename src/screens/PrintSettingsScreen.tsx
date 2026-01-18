import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Calculator } from 'lucide-react';
import KioskLayout from '@/components/layout/KioskLayout';
import { usePrintJob } from '@/contexts/PrintJobContext';

const PrintSettingsScreen = () => {
  const navigate = useNavigate();
  const { printJob, updatePrintJob, calculatePrice } = usePrintJob();
  
  const [printType, setPrintType] = useState<'bw' | 'color'>(printJob.printType);
  const [pagesOption, setPagesOption] = useState<'all' | 'custom'>('all');
  const [customPages, setCustomPages] = useState('');
  const [copies, setCopies] = useState(printJob.copies);
  const [sides, setSides] = useState<'single' | 'double'>(printJob.sides);

  const handleCalculatePrice = () => {
    updatePrintJob({
      printType,
      pages: pagesOption === 'all' ? 'all' : customPages,
      copies,
      sides,
      totalAmount: calculatePrice(),
    });
    navigate('/summary');
  };

  return (
    <KioskLayout currentStep={3}>
      <div className="flex flex-col gap-6 max-w-xl w-full">
        <h1 className="kiosk-title text-foreground text-center">
          Print Settings
        </h1>

        {/* Print Type */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-4">Print Type</p>
          <div className="flex gap-4">
            <button
              onClick={() => setPrintType('bw')}
              className={`touch-option flex-1 ${printType === 'bw' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                printType === 'bw' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {printType === 'bw' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">Black & White</span>
            </button>
            <button
              onClick={() => setPrintType('color')}
              className={`touch-option flex-1 ${printType === 'color' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                printType === 'color' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {printType === 'color' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">Color</span>
            </button>
          </div>
        </div>

        {/* Pages Selection */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-4">Pages</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setPagesOption('all')}
              className={`touch-option ${pagesOption === 'all' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                pagesOption === 'all' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {pagesOption === 'all' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">All Pages</span>
            </button>
            <button
              onClick={() => setPagesOption('custom')}
              className={`touch-option ${pagesOption === 'custom' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                pagesOption === 'custom' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {pagesOption === 'custom' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">Custom</span>
            </button>
            {pagesOption === 'custom' && (
              <input
                type="text"
                value={customPages}
                onChange={(e) => setCustomPages(e.target.value)}
                placeholder="e.g. 1-2, 5, 7"
                className="px-5 py-4 text-xl bg-card border-2 border-border rounded-xl 
                           focus:border-primary outline-none mt-2"
              />
            )}
          </div>
        </div>

        {/* Copies */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-4">Copies</p>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCopies(Math.max(1, copies - 1))}
              className="stepper-btn"
            >
              <Minus className="w-8 h-8" />
            </button>
            <div className="stepper-value">{copies}</div>
            <button
              onClick={() => setCopies(copies + 1)}
              className="stepper-btn"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Sides */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-4">Sides</p>
          <div className="flex gap-4">
            <button
              onClick={() => setSides('single')}
              className={`touch-option flex-1 ${sides === 'single' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                sides === 'single' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {sides === 'single' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">Single Side</span>
            </button>
            <button
              onClick={() => setSides('double')}
              className={`touch-option flex-1 ${sides === 'double' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                sides === 'double' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {sides === 'double' && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className="kiosk-body">Both Sides</span>
            </button>
          </div>
        </div>

        {/* Calculate Price Button */}
        <button
          onClick={handleCalculatePrice}
          className="kiosk-btn-primary w-full mt-4"
        >
          <Calculator className="w-7 h-7" />
          Calculate Price
        </button>
      </div>
    </KioskLayout>
  );
};

export default PrintSettingsScreen;
