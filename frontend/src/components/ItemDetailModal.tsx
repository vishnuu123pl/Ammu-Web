import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Item } from '../backend';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateBorrowRequest } from '../hooks/useQueries';
import { MapPin, Tag, IndianRupee, Loader2, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';

interface Props {
  item: Item;
  onClose: () => void;
}

function getOwnerDisplayName(ownerPrincipal: string): string {
  // Demo items have friendly kebab-case names; real users have long principal IDs
  if (ownerPrincipal.length > 30 && ownerPrincipal.includes('-')) {
    return ownerPrincipal.slice(0, 12) + '...';
  }
  // Convert kebab-case to Title Case for demo names
  return ownerPrincipal
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function ItemDetailModal({ item, onClose }: Props) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isOwner = identity?.getPrincipal().toString() === item.ownerPrincipal;

  const [pricingType, setPricingType] = useState<'day' | 'month'>('day');
  const [duration, setDuration] = useState('1');
  const { mutate: createRequest, isPending } = useCreateBorrowRequest();

  const pricePerUnit = pricingType === 'day' ? item.pricePerDay : item.pricePerMonth;
  const totalCost = pricePerUnit !== undefined && pricePerUnit !== null
    ? Number(pricePerUnit) * parseInt(duration || '1')
    : null;

  const handleBorrow = () => {
    if (!isAuthenticated) return;
    const dur = parseInt(duration);
    if (!dur || dur < 1) {
      toast.error('Please enter a valid duration');
      return;
    }
    // Convert to days for storage
    const borrowTimeDays = pricingType === 'month' ? BigInt(dur * 30) : BigInt(dur);
    createRequest(
      { itemId: item.id, borrowTime: borrowTimeDays },
      {
        onSuccess: () => {
          toast.success('Borrow request sent! The lender will review it.');
          onClose();
        },
        onError: (err: any) => toast.error(err?.message || 'Failed to send request'),
      }
    );
  };

  const hasDay = item.pricePerDay !== undefined && item.pricePerDay !== null;
  const hasMonth = item.pricePerMonth !== undefined && item.pricePerMonth !== null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category & Hashtag */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-fluxera-blue-pale text-primary border-0">{item.category}</Badge>
            {item.hashtag && item.hashtag !== 'all' && (
              <Badge variant="outline" className="text-muted-foreground">
                <Tag className="w-3 h-3 mr-1" />#{item.hashtag}
              </Badge>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-fluxera-gray-light rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">Pricing</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {hasDay && (
                <span className="text-lg font-black text-primary">₹{item.pricePerDay?.toString()}/day</span>
              )}
              {hasMonth && (
                <span className="text-lg font-black text-primary">₹{item.pricePerMonth?.toString()}/month</span>
              )}
              {!hasDay && !hasMonth && (
                <span className="text-muted-foreground text-sm">Price on request</span>
              )}
            </div>
          </div>

          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{item.location}</span>
            </div>
          )}

          {/* Owner */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">
              Owner: <span className="text-muted-foreground">{getOwnerDisplayName(item.ownerPrincipal)}</span>
            </span>
          </div>

          {/* Borrow Form */}
          {isAuthenticated && !isOwner && (
            <div className="border-t border-border pt-4 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Request to Borrow
              </h4>

              {(hasDay || hasMonth) && (
                <div className="space-y-2">
                  <Label>Pricing Type</Label>
                  <RadioGroup
                    value={pricingType}
                    onValueChange={(v) => setPricingType(v as 'day' | 'month')}
                    className="flex gap-4"
                  >
                    {hasDay && (
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="day" id="day" />
                        <Label htmlFor="day" className="cursor-pointer">Per Day (₹{item.pricePerDay?.toString()})</Label>
                      </div>
                    )}
                    {hasMonth && (
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="month" id="month" />
                        <Label htmlFor="month" className="cursor-pointer">Per Month (₹{item.pricePerMonth?.toString()})</Label>
                      </div>
                    )}
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duration ({pricingType === 'day' ? 'days' : 'months'})
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-xl"
                  placeholder="e.g., 3"
                />
              </div>

              {totalCost !== null && (
                <div className="bg-fluxera-blue-pale rounded-xl p-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Estimated Total</span>
                  <span className="text-lg font-black text-primary">₹{totalCost}</span>
                </div>
              )}

              <Button
                onClick={handleBorrow}
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl font-semibold"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending Request...</>
                ) : (
                  'Send Borrow Request'
                )}
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-3">Login to borrow this item</p>
              <Link to="/login">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl">
                  Login to Borrow
                </Button>
              </Link>
            </div>
          )}

          {isOwner && (
            <div className="border-t border-border pt-4">
              <Badge variant="outline" className="text-muted-foreground">This is your item</Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
