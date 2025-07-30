import React from 'react';
import { useTheme, getThemeConfig } from '@/contexts/ThemeContext';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/hooks/useApi';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className={`${themeConfig.cardClass} theme-transition hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300`}>
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center space-x-1 text-white text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating.rate}</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className={`font-semibold text-foreground ${themeConfig.textScale}`}>
            {truncateText(product.title, theme === 'theme3' ? 30 : 40)}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 capitalize">
            {product.category}
          </p>
        </div>

        <p className={`text-muted-foreground ${themeConfig.textScale}`}>
          {truncateText(product.description, theme === 'theme2' ? 100 : 80)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {theme === 'theme3' && (
              <span className="text-xs text-muted-foreground line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          
          <Button className={themeConfig.buttonClass}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {theme === 'theme3' ? 'Buy Now!' : 'Add to Cart'}
          </Button>
        </div>

        {/* Rating details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating.rate}/5</span>
          </div>
          <span>({product.rating.count} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;