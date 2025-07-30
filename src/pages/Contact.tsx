import React, { useState } from 'react';
import { useTheme, getThemeConfig } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactContent = {
    theme1: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you",
      description: "Send us a message and we'll respond as soon as possible.",
    },
    theme2: {
      title: "Contact Our Team",
      subtitle: "Professional consultation awaits",
      description: "Reach out to our distinguished team for expert guidance and sophisticated solutions.",
    },
    theme3: {
      title: "Let's Chat! 💬",
      subtitle: "We're super excited to hear from you!",
      description: "Drop us a colorful message and let's create something amazing together! ✨",
    }
  };

  const currentContent = contactContent[theme];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@themeshift.com',
      link: 'mailto:hello@themeshift.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Design Street, Creative City, CC 12345',
      link: '#'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: theme === 'theme3' ? "Woohoo! Message sent! 🎉" : "Message sent successfully",
      description: theme === 'theme3' 
        ? "Thanks for the awesome message! We'll get back to you super soon! ✨"
        : "Thank you for contacting us. We'll get back to you soon.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

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
        <p className={`max-w-2xl mx-auto ${themeConfig.textScale} text-muted-foreground`}>
          {currentContent.description}
        </p>
      </section>

      <div className={`grid ${theme === 'theme2' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
        {/* Contact Information */}
        <div className={theme === 'theme2' ? 'lg:col-span-1' : 'lg:col-span-1'}>
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'theme3' ? 'text-primary' : 'text-foreground'
          }`}>
            {theme === 'theme3' ? 'Reach Out to Us! 📞' : 'Contact Information'}
          </h2>
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className={`${themeConfig.cardClass} ${
                  theme === 'theme3' ? 'hover:scale-105' : 'hover:shadow-md'
                } transition-all duration-300`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full ${
                      theme === 'theme3' 
                        ? 'bg-gradient-to-br from-primary to-accent' 
                        : 'bg-primary'
                    } flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${
                        theme === 'theme3' ? 'text-white' : 'text-primary-foreground'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.label}</h3>
                      <a 
                        href={info.link}
                        className={`${themeConfig.textScale} text-muted-foreground hover:text-primary transition-colors`}
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className={theme === 'theme2' ? 'lg:col-span-1' : 'lg:col-span-2'}>
          <div className={themeConfig.cardClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'theme3' ? 'text-primary' : 'text-foreground'
            }`}>
              {theme === 'theme3' ? 'Send Us a Colorful Message! 🌈' : 'Send us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    {theme === 'theme3' ? 'Your Awesome Name! ✨' : 'Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={theme === 'theme3' ? 'Tell us your cool name!' : 'Your name'}
                    required
                    className={`mt-1 ${theme === 'theme3' ? 'border-primary/30 focus:border-primary rounded-xl' : ''}`}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    {theme === 'theme3' ? 'Email Address! 📧' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={theme === 'theme3' ? 'your@awesome-email.com' : 'your@email.com'}
                    required
                    className={`mt-1 ${theme === 'theme3' ? 'border-primary/30 focus:border-primary rounded-xl' : ''}`}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-foreground font-medium">
                  {theme === 'theme3' ? 'What\'s This About? 🤔' : 'Subject'}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={theme === 'theme3' ? 'Give us a fun subject line!' : 'Subject of your message'}
                  required
                  className={`mt-1 ${theme === 'theme3' ? 'border-primary/30 focus:border-primary rounded-xl' : ''}`}
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-foreground font-medium">
                  {theme === 'theme3' ? 'Your Amazing Message! 💌' : 'Message'}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={theme === 'theme3' ? 'Share your colorful thoughts with us!' : 'Your message'}
                  required
                  rows={5}
                  className={`mt-1 ${theme === 'theme3' ? 'border-primary/30 focus:border-primary rounded-xl' : ''}`}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${themeConfig.buttonClass} ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {theme === 'theme3' ? 'Sending Magic...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {theme === 'theme3' ? 'Send Colorful Message! 🚀' : 'Send Message'}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Additional CTA */}
      <section className={`text-center py-12 ${
        theme === 'theme1' ? 'bg-muted rounded-lg' :
        theme === 'theme2' ? 'bg-card border border-border rounded-xl' :
        'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl'
      }`}>
        <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${
          theme === 'theme3' ? 'text-primary' : 'text-muted-foreground'
        }`} />
        <h2 className={`text-2xl font-bold mb-4 ${
          theme === 'theme3' ? 'text-primary' : 'text-foreground'
        }`}>
          {theme === 'theme3' ? 'Have Questions? We Have Answers! 🤗' : 'Have Questions?'}
        </h2>
        <p className={`mb-6 ${themeConfig.textScale} text-muted-foreground max-w-lg mx-auto`}>
          {theme === 'theme3'
            ? 'Don\'t be shy! We love chatting about all things colorful and creative!'
            : theme === 'theme2'
            ? 'Our team is available to provide professional guidance and consultation.'
            : 'We\'re here to help with any questions about our platform or services.'
          }
        </p>
        <Button variant="outline" className={theme === 'theme3' ? 'border-primary text-primary hover:bg-primary hover:text-white' : ''}>
          {theme === 'theme3' ? 'Chat With Us! 💬' : 'Start a Conversation'}
        </Button>
      </section>
    </div>
  );
};

export default Contact;