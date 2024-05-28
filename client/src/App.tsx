import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from './pages/Landing';
import { useGame } from "./hooks/useGame";
import Game from "./pages/Game";

const App = () => {
  const queryClient = new QueryClient();
  const { currentView} = useGame();

  return (
    <QueryClientProvider client={queryClient}>
      {currentView === 'landing' && <Landing/>}
      {currentView === 'game' && <Game/>}
    </QueryClientProvider>
  );
};

export default App;
