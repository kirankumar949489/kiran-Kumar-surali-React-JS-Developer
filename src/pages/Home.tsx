import React from 'react';
import { useTheme, getThemeConfig } from '@/contexts/ThemeContext';
import { useProducts } from '@/hooks/useApi';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Palette } from 'lucide-react';

const Home = () => {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const { data: products, loading, error } = useProducts();

  const heroContent = {
    theme1: {
      title: "Welcome to ThemeShift",
      subtitle: "Experience the power of dynamic theming",
      description: "A minimalist approach to showcasing how themes can transform your entire user experience."
    },
    theme2: {
      title: "Elegant Design Excellence",
      subtitle: "Where sophistication meets functionality",
      description: "Immerse yourself in a world of refined aesthetics and premium user experience design."
    },
    theme3: {
      title: "Colorful Adventures Await!",
      subtitle: "Let your creativity run wild! 🎨",
      description: "Dive into a vibrant universe where every interaction sparkles with joy and endless possibilities!"
    }
  };

  const currentHero = heroContent[theme];

  const features = [
    {
      icon: Sparkles,
      title: "Dynamic Themes",
      description: "Switch between three completely different visual experiences"
    },
    {
      icon: Zap,
      title: "Instant Changes",
      description: "See your preferences applied immediately with smooth transitions"
    },
    {
      icon: Palette,
      title: "Unique Layouts",
      description: "Each theme offers a distinct layout and interaction pattern"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className={`w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4`}></div>
          <p className="text-muted-foreground">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading products: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className={`text-center py-12 ${theme === 'theme3' ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl' : ''}`}>
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
          theme === 'theme3' 
            ? 'bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent' 
            : 'text-foreground'
        }`}>
          {currentHero.title}
        </h1>
        <p className={`text-xl md:text-2xl mb-4 ${
          theme === 'theme3' ? 'text-primary font-semibold' : 'text-muted-foreground'
        }`}>
          {currentHero.subtitle}
        </p>
        <p className={`max-w-2xl mx-auto mb-8 ${themeConfig.textScale} text-muted-foreground`}>
          {currentHero.description}
        </p>
        <Button className={`${themeConfig.buttonClass} ${theme === 'theme3' ? 'text-lg px-8 py-6' : ''}`}>
          Explore Products
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Features Section */}
      <section>
        <h2 className={`text-3xl font-bold text-center mb-8 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          Why Choose ThemeShift?
        </h2>
        <div className={theme === 'theme3' ? 'grid-playful' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`${themeConfig.cardClass} text-center`}>
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${
                  theme === 'theme3' 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-primary'
                } flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${
                    theme === 'theme3' ? 'text-white' : 'text-primary-foreground'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className={`${themeConfig.textScale} text-muted-foreground`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold ${
            theme === 'theme3' ? 'text-primary' : 'text-foreground'
          }`}>
            {theme === 'theme3' ? 'Amazing Products! ✨' : 'Featured Products'}
          </h2>
          <Button variant="outline" className={theme === 'theme3' ? 'border-primary text-primary hover:bg-primary hover:text-white' : ''}>
            View All
          </Button>
        </div>
        
        {products && products.length > 0 ? (
          <div className={theme === 'theme3' ? 'grid-playful' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
            {products.slice(0, theme === 'theme2' ? 8 : 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className={`text-center py-12 ${
        theme === 'theme1' ? 'bg-muted rounded-lg' :
        theme === 'theme2' ? 'bg-card border border-border rounded-xl' :
        'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl'
      }`}>
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          {theme === 'theme3' ? 'Ready for More Fun? 🚀' : 'Ready to Get Started?'}
        </h2>
        <p className={`mb-6 ${themeConfig.textScale} text-muted-foreground max-w-lg mx-auto`}>
          {theme === 'theme3' 
            ? 'Join thousands of happy users who love our colorful experience!'
            : 'Experience the power of dynamic theming in your next project.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className={themeConfig.buttonClass}>
            {theme === 'theme3' ? 'Start Your Journey! 🎉' : 'Get Started'}
          </Button>
          <Button variant="outline" className={theme === 'theme3' ? 'border-primary text-primary hover:bg-primary hover:text-white' : ''}>
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;