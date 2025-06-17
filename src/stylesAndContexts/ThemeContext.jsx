import { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../stylesAndContexts/themes";

// cria um contexto de tema para a aplicação
const ThemeToggleContext = createContext();

// desabilita o ESLint para o Custom Hook useTheme()
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeToggleContext);
// o useTheme serve para acessar o valor passado pelo provider!

export const CustomThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const currentTheme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    // passa o estado de tema e a função para os outros componentes
    <ThemeToggleContext.Provider value={{ toggleTheme, themeMode }}>

      {/* passa para o styles-components as cariáveis do tema */}
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>

    </ThemeToggleContext.Provider>
  );
};
