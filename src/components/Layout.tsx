import React, { useState } from 'react';
import { useTheme, getThemeConfig } from '@/contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen theme-transition ${themeConfig.layout === 'sidebar' ? 'layout-sidebar' : ''}`}>
      <Header 
        onMenuClick={() => setSidebarOpen(true)}
        showMenuButton={themeConfig.hasSidebar}
      />
      
      {themeConfig.hasSidebar && (
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      <main className={`${themeConfig.contentClass} theme-transition`}>
        <div className={themeConfig.layout === 'minimal' ? 'layout-minimal' : themeConfig.layout === 'grid' ? 'layout-grid' : ''}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;