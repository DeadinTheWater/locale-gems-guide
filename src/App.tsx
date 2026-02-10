import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import CityHub from "./pages/CityHub";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Wrapper to force remount when city slug changes
const CityHubKeyed = () => {
  const { citySlug } = useParams();
  return <CityHub key={citySlug} />;
};

const PostPageKeyed = () => {
  const { citySlug, postSlug } = useParams();
  return <PostPage key={`${citySlug}-${postSlug}`} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<About />} />
          <Route path="/disclosure" element={<About />} />
          <Route path="/:citySlug" element={<CityHubKeyed />} />
          <Route path="/:citySlug/:postSlug" element={<PostPageKeyed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
