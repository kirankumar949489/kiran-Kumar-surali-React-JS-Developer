import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, getThemeConfig, type Theme } from '@/contexts/ThemeContext';
import { ChevronDown, Sparkles, Palette, Moon, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton = false }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const themeConfig = getThemeConfig(theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themes = [
    { id: 'theme1' as Theme, name: 'Minimalist', icon: Sparkles },
    { id: 'theme2' as Theme, name: 'Dark Elegant', icon: Moon },
    { id: 'theme3' as Theme, name: 'Colorful', icon: Palette },
  ];

  const currentTheme = themes.find(t => t.id === theme);
  const CurrentIcon = currentTheme?.icon || Sparkles;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`${themeConfig.headerClass} theme-transition`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Mobile menu button and Logo */}
        <div className="flex items-center space-x-3">
          {/* Mobile menu button for sidebar themes */}
          {showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className={`lg:hidden ${
                theme === 'theme3' 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {/* Mobile menu button for non-sidebar themes */}
          {!showMenuButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden ${
                theme === 'theme3' 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
          
          <Link to="/" className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg ${
            theme === 'theme3' ? 'bg-white/20' : 'bg-primary'
          } flex items-center justify-center`}>
            <Sparkles className={`w-5 h-5 ${
              theme === 'theme3' ? 'text-white' : 'text-primary-foreground'
            }`} />
          </div>
          <span className={`font-bold text-xl ${
            theme === 'theme3' ? 'text-white' : 'text-foreground'
          }`}>
            ThemeShift
          </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`transition-colors duration-200 ${
                location.pathname === item.href
                  ? theme === 'theme3' 
                    ? 'text-white font-semibold' 
                    : 'text-primary font-semibold'
                  : theme === 'theme3'
                    ? 'text-white/80 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant={theme === 'theme3' ? 'secondary' : 'ghost'}
              className={`flex items-center space-x-2 ${
                theme === 'theme3' 
                  ? 'bg-white/20 text-white hover:bg-white/30 border-white/30' 
                  : ''
              }`}
            >
              <CurrentIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{currentTheme?.name}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-popover/95 backdrop-blur-sm border border-border/50"
          >
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <DropdownMenuItem
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    theme === themeOption.id 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{themeOption.name}</span>
                  {theme === themeOption.id && (
                    <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation Menu for non-sidebar themes */}
      {!showMenuButton && mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50">
          <nav className="px-6 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;