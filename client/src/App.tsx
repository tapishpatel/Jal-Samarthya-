import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import MapAnalysisOptimized from "./pages/MapAnalysisOptimized";
import DataInsights from "./pages/DataInsights";
import ReportIssue from "./pages/ReportIssue";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/map" component={MapAnalysisOptimized} />
          <Route path="/insights" component={DataInsights} />
          <Route path="/about" component={About} />
          <Route path="/report" component={ReportIssue} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/admin" component={AdminPanel} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
