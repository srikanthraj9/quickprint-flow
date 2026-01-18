import { Printer } from 'lucide-react';

interface KioskHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  showSteps?: boolean;
}

const KioskHeader = ({ currentStep = 0, totalSteps = 5, showSteps = true }: KioskHeaderProps) => {
  return (
    <header className="w-full bg-card border-b border-border px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Printer className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">QuickPrint</span>
        </div>

        {/* Tagline */}
        <div className="hidden md:flex items-center gap-2 text-muted-foreground text-lg font-medium">
          <span>Upload</span>
          <span className="text-primary">•</span>
          <span>Pay</span>
          <span className="text-primary">•</span>
          <span>Print</span>
        </div>

        {/* Step Indicator */}
        {showSteps && currentStep > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`step-dot ${
                    i < currentStep
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
