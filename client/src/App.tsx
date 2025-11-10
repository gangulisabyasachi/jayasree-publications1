import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import PublicationsPage from "@/pages/PublicationsPage";
import BookDetailPage from "@/pages/BookDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AddBookPage from "@/pages/AddBookPage";
import EditBookPage from "@/pages/EditBookPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/publications" component={PublicationsPage} />
      <Route path="/publications/:id" component={BookDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/add-book" component={AddBookPage} />
      <Route path="/admin/edit-book/:id" component={EditBookPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
