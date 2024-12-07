import { useTheme } from "@/context/ThemeProvider";


const ThemeSwitcher = () => {
    const { toggleTheme, isDark } = useTheme();
    
  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-gray-200 py-2 text-left px-5 w-full dark:hover:bg-neutral-700 dark:text-white dark:bg-neutral-800"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeSwitcher;
