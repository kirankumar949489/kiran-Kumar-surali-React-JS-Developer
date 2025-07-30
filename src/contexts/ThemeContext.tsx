import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('theme1');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme && ['theme1', 'theme2', 'theme3'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setIsLoading(false);
  }, []);

  // Apply theme to document and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
    
    // Apply theme data attribute to html element
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    
    if (newTheme !== 'theme1') {
      html.setAttribute('data-theme', newTheme);
    }
    
    // Add animation class for smooth transition
    document.body.classList.add('animate-theme-switch');
    setTimeout(() => {
      document.body.classList.remove('animate-theme-switch');
    }, 400);
  };

  // Apply theme on initial load
  useEffect(() => {
    if (!isLoading) {
      const html = document.documentElement;
      html.removeAttribute('data-theme');
      
      if (theme !== 'theme1') {
        html.setAttribute('data-theme', theme);
      }
    }
  }, [theme, isLoading]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const getThemeConfig = (theme: Theme) => {
  const configs = {
    theme1: {
      name: 'Minimalist',
      layout: 'minimal',
      headerClass: 'header-minimal',
      contentClass: 'content-minimal',
      cardClass: 'card-minimal',
      buttonClass: 'btn-minimal',
      textScale: 'text-scale-minimal',
      hasSidebar: false,
    },
    theme2: {
      name: 'Dark Elegant',
      layout: 'sidebar',
      headerClass: 'header-elegant',
      contentClass: 'content-sidebar',
      cardClass: 'card-elegant',
      buttonClass: 'btn-elegant',
      textScale: 'text-scale-elegant',
      hasSidebar: true,
    },
    theme3: {
      name: 'Colorful',
      layout: 'grid',
      headerClass: 'header-playful',
      contentClass: 'content-grid',
      cardClass: 'card-playful',
      buttonClass: 'btn-playful',
      textScale: 'text-scale-playful',
      hasSidebar: false,
    },
  };
  
  return configs[theme];
};