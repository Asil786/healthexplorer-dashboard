
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import LiveHealth from "./pages/LiveHealth";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Models from "./pages/Models";
import Network from "./pages/Network";
import Institutions from "./pages/Institutions";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import Predictions from "./pages/Predictions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/livehealth" element={<LiveHealth />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/models" element={<Models />} />
            <Route path="/network" element={<Network />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
