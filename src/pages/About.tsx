import React from 'react';
import { useTheme, getThemeConfig } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  const aboutContent = {
    theme1: {
      title: "About ThemeShift",
      subtitle: "Simplicity meets functionality",
      mission: "To demonstrate how thoughtful design can transform user experiences through clean, minimal interfaces.",
    },
    theme2: {
      title: "Our Distinguished Heritage",
      subtitle: "Excellence through sophisticated design",
      mission: "To elevate digital experiences through refined aesthetics and meticulous attention to detail in every interaction.",
    },
    theme3: {
      title: "About Our Colorful World! 🌈",
      subtitle: "Where creativity knows no bounds!",
      mission: "To spread joy and inspiration through vibrant designs that make every digital interaction a delightful adventure! ✨",
    }
  };

  const currentContent = aboutContent[theme];

  const values = [
    {
      icon: Users,
      title: theme === 'theme3' ? 'Amazing Team! 👥' : 'Team Collaboration',
      description: theme === 'theme3' 
        ? 'Our super talented team works together to create magical experiences that bring smiles to faces!'
        : theme === 'theme2'
        ? 'Our distinguished team of professionals collaborates with precision and dedication to deliver exceptional results.'
        : 'We believe in the power of collaborative design and development to create meaningful user experiences.'
    },
    {
      icon: Target,
      title: theme === 'theme3' ? 'Big Dreams! 🎯' : 'Clear Vision',
      description: theme === 'theme3'
        ? 'We dream big and aim high! Our goal is to make the digital world more colorful and fun for everyone!'
        : theme === 'theme2'
        ? 'With unwavering focus and strategic precision, we pursue excellence in every aspect of our craft.'
        : 'Our vision is to democratize good design by making it accessible and adaptable to any context.'
    },
    {
      icon: Lightbulb,
      title: theme === 'theme3' ? 'Creative Sparks! 💡' : 'Innovation',
      description: theme === 'theme3'
        ? 'Innovation is our playground! We love experimenting with crazy ideas that turn into awesome realities!'
        : theme === 'theme2'
        ? 'Through thoughtful innovation and sophisticated approaches, we craft solutions that stand the test of time.'
        : 'We constantly explore new ways to improve user interfaces through innovative design patterns.'
    },
    {
      icon: Heart,
      title: theme === 'theme3' ? 'Spreading Love! ❤️' : 'User-Centered',
      description: theme === 'theme3'
        ? 'Everything we do is filled with love! We care deeply about making users happy and creating joyful moments!'
        : theme === 'theme2'
        ? 'Every decision is made with careful consideration of our users\' needs and the elegance of their experience.'
        : 'Every design decision is made with the end user in mind, ensuring intuitive and delightful interactions.'
    }
  ];

  const stats = [
    { label: 'Themes Available', value: '3', suffix: '' },
    { label: 'Happy Users', value: '1000', suffix: '+' },
    { label: 'Design Variations', value: '50', suffix: '+' },
    { label: 'Lines of Code', value: '10', suffix: 'K+' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className={`text-center py-12 ${
        theme === 'theme3' ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl' : ''
      }`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
          theme === 'theme3' 
            ? 'bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent' 
            : 'text-foreground'
        }`}>
          {currentContent.title}
        </h1>
        <p className={`text-xl md:text-2xl mb-6 ${
          theme === 'theme3' ? 'text-primary font-semibold' : 'text-muted-foreground'
        }`}>
          {currentContent.subtitle}
        </p>
        <p className={`max-w-3xl mx-auto ${themeConfig.textScale} text-muted-foreground`}>
          {currentContent.mission}
        </p>
      </section>

      {/* Stats Section */}
      <section>
        <div className={theme === 'theme3' ? 'grid-playful' : 'grid grid-cols-2 md:grid-cols-4 gap-6'}>
          {stats.map((stat, index) => (
            <div key={index} className={`${themeConfig.cardClass} text-center`}>
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                theme === 'theme3' ? 'text-primary' : 'text-foreground'
              }`}>
                {stat.value}{stat.suffix}
              </div>
              <div className={`${themeConfig.textScale} text-muted-foreground`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          {theme === 'theme3' ? 'What Makes Us Special! ⭐' : 'Our Values'}
        </h2>
        <div className={theme === 'theme3' ? 'grid-playful' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className={`${themeConfig.cardClass} ${
                theme === 'theme3' ? 'hover:scale-105' : 'hover:shadow-lg'
              } transition-all duration-300`}>
                <div className={`w-16 h-16 mb-6 rounded-full ${
                  theme === 'theme3' 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-primary'
                } flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${
                    theme === 'theme3' ? 'text-white' : 'text-primary-foreground'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-4 text-foreground`}>
                  {value.title}
                </h3>
                <p className={`${themeConfig.textScale} text-muted-foreground leading-relaxed`}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-12 ${
        theme === 'theme1' ? 'bg-muted rounded-lg' :
        theme === 'theme2' ? 'bg-card border border-border rounded-xl' :
        'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl'
      }`}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 ${
            theme === 'theme3' ? 'text-primary' : 'text-foreground'
          }`}>
            {theme === 'theme3' ? 'Meet Our Awesome Team! 🎊' : 'Meet Our Team'}
          </h2>
          <p className={`max-w-2xl mx-auto mb-8 ${themeConfig.textScale} text-muted-foreground`}>
            {theme === 'theme3'
              ? 'We\'re a bunch of creative souls who love making the digital world more colorful and fun!'
              : theme === 'theme2'
              ? 'Our distinguished team brings years of experience and refined expertise to every project.'
              : 'A passionate group of designers and developers dedicated to creating exceptional user experiences.'
            }
          </p>
          <Button className={themeConfig.buttonClass}>
            {theme === 'theme3' ? 'Join Our Fun Team! 🚀' : 'Join Our Team'}
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="text-center">
        <h2 className={`text-3xl font-bold mb-6 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          {theme === 'theme3' ? 'Our Big Mission! 🌟' : 'Our Mission'}
        </h2>
        <p className={`text-xl max-w-4xl mx-auto ${themeConfig.textScale} text-muted-foreground leading-relaxed`}>
          {theme === 'theme3'
            ? 'To fill the digital world with rainbows, smiles, and endless creativity! We believe that every click, every scroll, and every interaction should spark joy and wonder. Our mission is to prove that technology can be both powerful and playful! 🎨✨'
            : theme === 'theme2'
            ? 'To establish new standards of excellence in digital design through sophisticated aesthetics, meticulous attention to detail, and an unwavering commitment to delivering experiences that transcend expectations and inspire confidence.'
            : 'To democratize exceptional design by creating flexible, accessible tools that adapt to any context while maintaining the highest standards of usability and aesthetic appeal.'
          }
        </p>
      </section>
    </div>
  );
};

export default About;