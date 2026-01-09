import { useState, useEffect } from 'react';
import { type Category } from '../types/product';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import CategoryFilter from '../components/CategoryFilter';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';
import { getProducts } from '../services/api';

const PRODUCTS_PER_PAGE = 8;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProducts(currentPage, PRODUCTS_PER_PAGE, activeCategory, searchQuery);
      console.log("response:::", result);
      
      
      // Your API structure: { data: { data: [...products], pagination: {...} } }
      const products = result.data || [];
      const total = result?.pagination?.total || 0;
      
      setProducts(products);
      setTotalCount(total);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on initial render and when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, activeCategory, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
            Curated Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully selected pieces, crafted with attention to detail and timeless design.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="flex justify-end mb-6">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </section>

        {/* Category Tabs */}
        <section className="mb-10 md:mb-14">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </section>

        {/* Products Grid */}
        <section>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">Error: {error}</p>
              <button 
                onClick={fetchProducts} 
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product: any, index) => (
                <div
                  key={product._id || product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <section className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}

        {/* Results Count */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)} of {totalCount} products
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;