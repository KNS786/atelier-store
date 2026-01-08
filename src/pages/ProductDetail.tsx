import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import Header from "../components/Header";
import { Button } from '../components/ui/button';
import { Star, ArrowLeft, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
            Product not found
          </h1>
          <Link to="/" className="text-primary hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="sticky top-28">
              {/* Category & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-muted-foreground capitalize">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              {/* Name & Price */}
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {product.name}
              </h1>
              <p className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                ${product.price}
              </p>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-destructive">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <Button
                  size="lg"
                  className="flex-1 h-12 rounded-full font-medium"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-foreground" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <RotateCcw className="w-5 h-5 text-foreground" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-foreground" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
