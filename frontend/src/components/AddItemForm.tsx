import { useState } from 'react';
import { useAddItem } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, IndianRupee, MapPin, Tag, Package } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  'Books & Notes',
  'Lab Coats',
  'Calculators',
  'Electronics',
  'Hostel Essentials',
  'Tools',
  'Bags',
  'Sports Items',
  'Other',
];

export default function AddItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [location, setLocation] = useState('');

  const { mutate: addItem, isPending } = useAddItem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !category) {
      toast.error('Please fill in name, description, and category');
      return;
    }
    if (!pricePerDay && !pricePerMonth) {
      toast.error('Please provide at least one price (per day or per month)');
      return;
    }
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }

    const ppd = pricePerDay ? BigInt(Math.round(parseFloat(pricePerDay))) : null;
    const ppm = pricePerMonth ? BigInt(Math.round(parseFloat(pricePerMonth))) : null;

    addItem(
      {
        category,
        hashtag: hashtag.trim(),
        name: name.trim(),
        description: description.trim(),
        pricePerDay: ppd,
        pricePerMonth: ppm,
        location: location.trim(),
      },
      {
        onSuccess: () => {
          toast.success('Item listed successfully! 🎒');
          setName('');
          setDescription('');
          setCategory('');
          setHashtag('');
          setPricePerDay('');
          setPricePerMonth('');
          setLocation('');
        },
        onError: (err: any) => toast.error(err?.message || 'Failed to list item'),
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-fluxera-blue-pale flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">List Your Item</h2>
          <p className="text-xs text-muted-foreground">Share with KTU students</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="item-name">Item Name *</Label>
          <Input
            id="item-name"
            placeholder="e.g., Engineering Drawing Kit"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-desc">Description *</Label>
          <Textarea
            id="item-desc"
            placeholder="Describe the item, its condition, and any usage notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl resize-none"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-category">Category *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="item-category" className="rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-hashtag" className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Hashtag (optional)
          </Label>
          <Input
            id="item-hashtag"
            placeholder="e.g., ktu2024, cse, mechanical"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            className="rounded-xl"
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price-day" className="flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-primary" /> Price per Day (₹)
            </Label>
            <Input
              id="price-day"
              type="number"
              min="1"
              placeholder="e.g., 10"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price-month" className="flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-primary" /> Price per Month (₹)
            </Label>
            <Input
              id="price-month"
              type="number"
              min="1"
              placeholder="e.g., 200"
              value={pricePerMonth}
              onChange={(e) => setPricePerMonth(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          Provide at least one price. Keep rents low for students (₹5–₹50 recommended).
        </p>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="item-location" className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Location *
          </Label>
          <Input
            id="item-location"
            placeholder="e.g., Room 204, Hostel B, CUSAT Campus"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl font-semibold h-11 gap-2"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Posting...</>
          ) : (
            <><IndianRupee className="w-4 h-4" />Post Your Item (₹)</>
          )}
        </Button>
      </form>
    </div>
  );
}
