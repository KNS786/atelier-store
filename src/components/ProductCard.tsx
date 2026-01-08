import type { Product } from '../types/product';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <article className="product-card">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-medium text-foreground px-4 py-2 bg-card rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
          
          <h3 className="font-display text-base font-medium text-card-foreground leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          
          <p className="font-display text-lg font-semibold text-card-foreground">
            ${product.price}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
