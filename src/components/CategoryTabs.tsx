import { categories } from "../data/products";
import type { Category } from "../types/product";

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category:any) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id as Category)}
          className={`category-tab ${
            activeCategory === category.id
              ? 'category-tab-active'
              : 'category-tab-inactive'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
