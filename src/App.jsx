import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { PokemonDetails } from "./pages/PokemonDetails";
import { CustomThemeProvider } from "./stylesAndContexts/ThemeContext";
import { GlobalStyles } from "./stylesAndContexts/GlobalStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CustomThemeProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </CustomThemeProvider>
    </>
  );
}

export default App;
