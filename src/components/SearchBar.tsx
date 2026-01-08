import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e:any) => onChange(e.target.value)}
        className="pl-11 h-12 rounded-full border-border bg-card font-body text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
      />
    </div>
  );
};

export default SearchBar;
