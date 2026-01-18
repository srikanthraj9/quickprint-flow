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
      <div className="flex flex-col gap-4 max-w-lg w-full px-4">
        <h1 className="kiosk-subtitle text-foreground text-center">
          Print Settings
        </h1>

        {/* Print Type */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-3">Print Type</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPrintType('bw')}
              className={`touch-option flex-1 ${printType === 'bw' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                printType === 'bw' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {printType === 'bw' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-base md:text-lg font-semibold">B/W</span>
            </button>
            <button
              onClick={() => setPrintType('color')}
              className={`touch-option flex-1 ${printType === 'color' ? 'touch-option-selected' : ''}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                printType === 'color' ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {printType === 'color' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-base md:text-lg font-semibold">Color</span>
            </button>
          </div>
        </div>

        {/* Pages Selection */}
        <div className="kiosk-card">
          <p className="kiosk-label mb-3">Pages</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <button
                onClick={() => setPagesOption('all')}
                className={`touch-option flex-1 ${pagesOption === 'all' ? 'touch-option-selected' : ''}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  pagesOption === 'all' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {pagesOption === 'all' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-base md:text-lg font-semibold">All</span>
              </button>
              <button
                onClick={() => setPagesOption('custom')}
                className={`touch-option flex-1 ${pagesOption === 'custom' ? 'touch-option-selected' : ''}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  pagesOption === 'custom' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {pagesOption === 'custom' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-base md:text-lg font-semibold">Custom</span>
              </button>
            </div>
            {pagesOption === 'custom' && (
              <input
                type="text"
                value={customPages}
                onChange={(e) => setCustomPages(e.target.value)}
                placeholder="e.g. 1-2, 5, 7"
                className="px-4 py-3 text-lg bg-background border-2 border-border rounded-xl 
                           focus:border-primary outline-none"
              />
            )}
          </div>
        </div>

        {/* Copies & Sides Row */}
        <div className="flex gap-3">
          {/* Copies */}
          <div className="kiosk-card flex-1">
            <p className="kiosk-label mb-3 text-center">Copies</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setCopies(Math.max(1, copies - 1))}
                className="stepper-btn"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="stepper-value">{copies}</div>
              <button
                onClick={() => setCopies(copies + 1)}
                className="stepper-btn"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Sides */}
          <div className="kiosk-card flex-1">
            <p className="kiosk-label mb-3 text-center">Sides</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSides('single')}
                className={`touch-option py-2 ${sides === 'single' ? 'touch-option-selected' : ''}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  sides === 'single' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {sides === 'single' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className="text-sm font-semibold">Single</span>
              </button>
              <button
                onClick={() => setSides('double')}
                className={`touch-option py-2 ${sides === 'double' ? 'touch-option-selected' : ''}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  sides === 'double' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {sides === 'double' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className="text-sm font-semibold">Both</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calculate Price Button */}
        <button
          onClick={handleCalculatePrice}
          className="kiosk-btn-3d w-full mt-2"
        >
          <Calculator className="w-7 h-7" />
          Calculate Price
        </button>
      </div>
    </KioskLayout>
  );
};

export default PrintSettingsScreen;
