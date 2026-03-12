import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAvailableItems } from '../hooks/useQueries';
import { Item } from '../backend';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, MapPin, Tag, IndianRupee, Package, Filter, User } from 'lucide-react';
import ItemDetailModal from '../components/ItemDetailModal';
import { Link } from '@tanstack/react-router';

// These must match the category strings stored in the backend
const CATEGORIES = [
  'All Categories',
  'Books',
  'Calculator',
  'Sports',
  'Lab Equipment',
  'Electronics',
  'Hostel Essentials',
  'Tools',
  'Bags',
  'Other',
];

const BRANCHES = [
  'All Branches',
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'IT',
  'Chemical',
  'Biotechnology',
];

function formatPrice(pricePerDay?: bigint, pricePerMonth?: bigint): string {
  const parts: string[] = [];
  if (pricePerDay !== undefined && pricePerDay !== null) parts.push(`₹${pricePerDay}/day`);
  if (pricePerMonth !== undefined && pricePerMonth !== null) parts.push(`₹${pricePerMonth}/month`);
  return parts.length > 0 ? parts.join(' · ') : 'Price on request';
}

function getOwnerDisplayName(ownerPrincipal: string): string {
  // Demo items have friendly names as ownerPrincipal; real users have long principal IDs
  // If it looks like a principal ID (contains dashes and is long), truncate it
  if (ownerPrincipal.length > 30 && ownerPrincipal.includes('-')) {
    return ownerPrincipal.slice(0, 12) + '...';
  }
  // Convert kebab-case to Title Case for demo names
  return ownerPrincipal
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <div
      className="bg-white rounded-2xl border border-border hover:shadow-card-hover hover:border-primary/30 transition-all cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-base leading-tight truncate group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
          </div>
          <Badge variant="secondary" className="shrink-0 text-xs bg-fluxera-blue-pale text-primary border-0">
            {item.category}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-primary font-bold text-sm mb-3">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>{formatPrice(item.pricePerDay, item.pricePerMonth)}</span>
        </div>

        {item.location && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <User className="w-3 h-3 shrink-0" />
          <span className="truncate">{getOwnerDisplayName(item.ownerPrincipal)}</span>
        </div>

        {item.hashtag && item.hashtag !== 'all' && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="w-3 h-3" />
            <span>#{item.hashtag}</span>
          </div>
        )}
      </div>
      <div className="px-5 pb-4">
        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl text-xs font-semibold"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          View & Borrow
        </Button>
      </div>
    </div>
  );
}

export default function BorrowPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const search = useSearch({ strict: false }) as { category?: string };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [hostelFilter, setHostelFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const { data: items = [], isLoading } = useGetAvailableItems();

  // Pre-select category from URL query param
  useEffect(() => {
    if (search?.category) {
      // Accept both exact matches and legacy category names
      const categoryMap: Record<string, string> = {
        'Books & Notes': 'Books',
        'Calculators': 'Calculator',
        'Sports Items': 'Sports',
        'Lab Coats': 'Lab Equipment',
        'Lab Equipment': 'Lab Equipment',
        'Electronics': 'Electronics',
        'Hostel Essentials': 'Hostel Essentials',
        'Tools': 'Tools',
        'Bags': 'Bags',
        'Other': 'Other',
        'Books': 'Books',
        'Calculator': 'Calculator',
        'Sports': 'Sports',
      };
      const mapped = categoryMap[search.category] || search.category;
      if (CATEGORIES.includes(mapped)) {
        setSelectedCategory(mapped);
      }
    }
  }, [search?.category]);

  const filtered = items.filter((item) => {
    const matchSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchHostel =
      !hostelFilter ||
      item.location.toLowerCase().includes(hostelFilter.toLowerCase());
    return matchSearch && matchCategory && matchHostel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            <IndianRupee className="w-3 h-3 mr-1" />
            Ultra-Low Rent (₹5–₹50)
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">Browse Items</h1>
        <p className="text-muted-foreground">
          Find items to borrow from fellow KTU students at ultra-low rents
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-6 shadow-card">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
          <Filter className="w-4 h-4 text-primary" />
          Filters
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              {BRANCHES.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Hostel / Location..."
            value={hostelFilter}
            onChange={(e) => setHostelFilter(e.target.value)}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Auth notice */}
      {!isAuthenticated && (
        <div className="bg-fluxera-blue-pale border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-primary font-medium">
            Login to borrow items from fellow KTU students
          </p>
          <Link to="/login">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-lg shrink-0">
              Login
            </Button>
          </Link>
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No items found</h3>
          <p className="text-muted-foreground mb-6">
            {items.length === 0
              ? 'No items listed yet. Be the first to lend!'
              : 'Try adjusting your filters'}
          </p>
          <Link to="/lend">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl">
              List an Item
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <ItemCard key={item.id.toString()} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </>
      )}

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
