import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrintJobProvider } from "@/contexts/PrintJobContext";
import WelcomeScreen from "@/screens/WelcomeScreen";
import UploadScreen from "@/screens/UploadScreen";
import PreviewScreen from "@/screens/PreviewScreen";
import PrintSettingsScreen from "@/screens/PrintSettingsScreen";
import SummaryScreen from "@/screens/SummaryScreen";
import PaymentScreen from "@/screens/PaymentScreen";
import PrintingScreen from "@/screens/PrintingScreen";
import DoneScreen from "@/screens/DoneScreen";
import ErrorScreen from "@/screens/ErrorScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PrintJobProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/preview" element={<PreviewScreen />} />
            <Route path="/settings" element={<PrintSettingsScreen />} />
            <Route path="/summary" element={<SummaryScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/printing" element={<PrintingScreen />} />
            <Route path="/done" element={<DoneScreen />} />
            <Route path="/error" element={<ErrorScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PrintJobProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
