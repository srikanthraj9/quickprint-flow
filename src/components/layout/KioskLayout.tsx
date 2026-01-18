import { ReactNode } from 'react';
import KioskHeader from './KioskHeader';
import KioskFooter from './KioskFooter';

interface KioskLayoutProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showSteps?: boolean;
  showBack?: boolean;
  showHome?: boolean;
  showFooter?: boolean;
}

const KioskLayout = ({
  children,
  currentStep,
  totalSteps = 5,
  showSteps = true,
  showBack = true,
  showHome = true,
  showFooter = true,
}: KioskLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <KioskHeader currentStep={currentStep} totalSteps={totalSteps} showSteps={showSteps} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
        {children}
      </main>

      {showFooter && <KioskFooter showBack={showBack} showHome={showHome} />}
    </div>
  );
};

export default KioskLayout;
