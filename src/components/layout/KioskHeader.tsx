import { Printer } from 'lucide-react';

interface KioskHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  showSteps?: boolean;
}

const KioskHeader = ({ currentStep = 0, totalSteps = 5, showSteps = true }: KioskHeaderProps) => {
  return (
    <header className="kiosk-header">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Printer className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-white">QuickPrint</span>
        </div>

        {/* Tagline */}
        <div className="hidden md:flex items-center gap-2 text-white/80 text-base font-medium">
          <span>Upload</span>
          <span className="text-white">•</span>
          <span>Pay</span>
          <span className="text-white">•</span>
          <span>Print</span>
        </div>

        {/* Step Indicator */}
        {showSteps && currentStep > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-white/90 font-semibold text-sm md:text-base">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="step-indicator">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`step-dot ${
                    i < currentStep - 1
                      ? 'step-dot-completed'
                      : i === currentStep - 1
                      ? 'step-dot-active'
                      : 'step-dot-inactive'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default KioskHeader;
