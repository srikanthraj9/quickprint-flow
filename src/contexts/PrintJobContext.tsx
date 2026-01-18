import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PrintJob {
  fileName: string;
  totalPages: number;
  jobCode: string;
  printType: 'bw' | 'color';
  pages: 'all' | string;
  copies: number;
  sides: 'single' | 'double';
  totalAmount: number;
}

interface PrintJobContextType {
  printJob: PrintJob;
  updatePrintJob: (updates: Partial<PrintJob>) => void;
  resetPrintJob: () => void;
  calculatePrice: () => number;
}

const defaultPrintJob: PrintJob = {
  fileName: '',
  totalPages: 0,
  jobCode: '',
  printType: 'bw',
  pages: 'all',
  copies: 1,
  sides: 'single',
  totalAmount: 0,
};

const PrintJobContext = createContext<PrintJobContextType | undefined>(undefined);

export const PrintJobProvider = ({ children }: { children: ReactNode }) => {
  const [printJob, setPrintJob] = useState<PrintJob>(defaultPrintJob);

  const updatePrintJob = (updates: Partial<PrintJob>) => {
    setPrintJob(prev => ({ ...prev, ...updates }));
  };

  const resetPrintJob = () => {
    setPrintJob(defaultPrintJob);
  };

  const calculatePrice = () => {
    const pricePerPageBW = 2;
    const pricePerPageColor = 5;
    const basePrice = printJob.printType === 'bw' ? pricePerPageBW : pricePerPageColor;
    
    let pageCount = printJob.totalPages;
    if (printJob.pages !== 'all' && printJob.pages) {
      // Parse custom pages like "1-2,5,7"
      const ranges = printJob.pages.split(',');
      pageCount = ranges.reduce((count, range) => {
        const parts = range.trim().split('-');
        if (parts.length === 2) {
          return count + (parseInt(parts[1]) - parseInt(parts[0]) + 1);
        }
        return count + 1;
      }, 0);
    }

    const totalPrice = basePrice * pageCount * printJob.copies;
    return totalPrice;
  };

  return (
    <PrintJobContext.Provider value={{ printJob, updatePrintJob, resetPrintJob, calculatePrice }}>
      {children}
    </PrintJobContext.Provider>
  );
};

export const usePrintJob = () => {
  const context = useContext(PrintJobContext);
  if (!context) {
    throw new Error('usePrintJob must be used within a PrintJobProvider');
  }
  return context;
};
