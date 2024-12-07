import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDark(savedTheme === 'dark');
        }
      }, []);
    
      useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-mode', theme);
        localStorage.setItem('theme', theme);
      }, [isDark]);
    
      const toggleTheme = () => setIsDark((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useExpense must be used within an ExpenseProvider");
    }
    return context;
  };

export default ThemeProvider