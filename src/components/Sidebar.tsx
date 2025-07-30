import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Mail, Star, TrendingUp, Package, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const features = [
    { name: 'Featured Products', icon: Star },
    { name: 'Trending', icon: TrendingUp },
    { name: 'All Products', icon: Package },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar-elegant theme-transition ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="space-y-8">
        {/* Main Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Explore
          </h3>
          <nav className="space-y-2">
            {features.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.name}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Quick Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Products</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Categories</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Themes</span>
              <span className="font-medium text-primary">3</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;