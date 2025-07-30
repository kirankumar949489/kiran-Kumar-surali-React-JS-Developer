import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme, getThemeConfig } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const content = {
    theme1: {
      title: "404",
      subtitle: "Page not found",
      description: "Sorry, the page you're looking for doesn't exist."
    },
    theme2: {
      title: "404",
      subtitle: "Page not found",
      description: "We regret to inform you that the requested page could not be located."
    },
    theme3: {
      title: "404",
      subtitle: "Oops! This page got lost! 🤭",
      description: "Don't worry! Even our colorful pages sometimes wander off. Let's get you back home! ✨"
    }
  };

  const currentContent = content[theme];

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className={`text-center ${themeConfig.cardClass} max-w-md mx-auto`}>
        <div className={`text-8xl font-bold mb-6 ${
          theme === 'theme3' 
            ? 'bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent' 
            : 'text-primary'
        }`}>
          {currentContent.title}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          {currentContent.subtitle}
        </h1>
        
        <p className={`mb-8 ${themeConfig.textScale} text-muted-foreground`}>
          {currentContent.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className={themeConfig.buttonClass}>
              <Home className="w-4 h-4 mr-2" />
              {theme === 'theme3' ? 'Take Me Home! 🏠' : 'Go Home'}
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className={theme === 'theme3' ? 'border-primary text-primary hover:bg-primary hover:text-white' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {theme === 'theme3' ? 'Go Back! ⬅️' : 'Go Back'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
