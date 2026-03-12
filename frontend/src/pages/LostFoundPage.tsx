import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useGetLostItems,
  useGetFoundItems,
  useAddLostItem,
  useAddFoundItem,
  useResolveLostItem,
  useResolveFoundItem,
} from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Package, MapPin, Phone, CheckCircle, Plus, Loader2, AlertTriangle } from 'lucide-react';
import { LostItem, FoundItem, LostFoundStatus } from '../backend';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';

// ─── Report Lost Item Form ────────────────────────────────────────────────────

function ReportLostForm({ onClose }: { onClose: () => void }) {
  const [description, setDescription] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { mutate: addLostItem, isPending } = useAddLostItem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !lastSeenLocation.trim() || !contactInfo.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    addLostItem(
      { description: description.trim(), lastSeenLocation: lastSeenLocation.trim(), contactInfo: contactInfo.trim() },
      {
        onSuccess: () => {
          toast.success('Lost item report submitted!');
          onClose();
        },
        onError: (err: any) => toast.error(err?.message || 'Failed to submit report'),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lost-desc">Item Description *</Label>
        <Textarea
          id="lost-desc"
          placeholder="Describe the lost item in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl resize-none"
          rows={3}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lost-location">Last Seen Location *</Label>
        <Input
          id="lost-location"
          placeholder="e.g., Library, 2nd floor, near window"
          value={lastSeenLocation}
          onChange={(e) => setLastSeenLocation(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lost-contact">Your Contact Info *</Label>
        <Input
          id="lost-contact"
          placeholder="e.g., +91 98765 43210 or WhatsApp"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl"
        >
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting...</> : 'Submit Report'}
        </Button>
      </div>
    </form>
  );
}

// ─── Report Found Item Form ───────────────────────────────────────────────────

function ReportFoundForm({ onClose }: { onClose: () => void }) {
  const [description, setDescription] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { mutate: addFoundItem, isPending } = useAddFoundItem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !pickUpLocation.trim() || !contactInfo.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    addFoundItem(
      { description: description.trim(), pickUpLocation: pickUpLocation.trim(), contactInfo: contactInfo.trim() },
      {
        onSuccess: () => {
          toast.success('Found item report submitted!');
          onClose();
        },
        onError: (err: any) => toast.error(err?.message || 'Failed to submit report'),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="found-desc">Item Description *</Label>
        <Textarea
          id="found-desc"
          placeholder="Describe the found item in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl resize-none"
          rows={3}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="found-location">Pick-Up Location *</Label>
        <Input
          id="found-location"
          placeholder="e.g., Security desk, Main gate"
          value={pickUpLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="found-contact">Your Contact Info *</Label>
        <Input
          id="found-contact"
          placeholder="e.g., +91 98765 43210 or WhatsApp"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="rounded-xl"
          required
        />
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl"
        >
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting...</> : 'Submit Report'}
        </Button>
      </div>
    </form>
  );
}

// ─── Lost Item Card ───────────────────────────────────────────────────────────

function LostItemCard({ item, callerPrincipal }: { item: LostItem; callerPrincipal: string }) {
  const { mutate: resolve, isPending } = useResolveLostItem();
  const isOwner = item.reporterPrincipal === callerPrincipal;
  const isActive = item.status === LostFoundStatus.active;

  const handleResolve = () => {
    resolve(item.id, {
      onSuccess: () => toast.success('Marked as resolved!'),
      onError: (err: any) => toast.error(err?.message || 'Failed to resolve'),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-orange-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug">{item.description}</p>
          </div>
        </div>
        <Badge
          className={isActive
            ? 'bg-orange-100 text-orange-700 border-0 shrink-0'
            : 'bg-green-100 text-green-700 border-0 shrink-0'}
        >
          {isActive ? 'Active' : 'Resolved'}
        </Badge>
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Last seen: {item.lastSeenLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{item.contactInfo}</span>
        </div>
      </div>
      {isOwner && isActive && (
        <Button
          size="sm"
          onClick={handleResolve}
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl text-xs gap-1"
        >
          {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
          Mark as Found
        </Button>
      )}
    </div>
  );
}

// ─── Found Item Card ──────────────────────────────────────────────────────────

function FoundItemCard({ item, callerPrincipal }: { item: FoundItem; callerPrincipal: string }) {
  const { mutate: resolve, isPending } = useResolveFoundItem();
  const [receiverInput, setReceiverInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const isOwner = item.finderPrincipal === callerPrincipal;
  const isActive = item.status === LostFoundStatus.active;

  const handleResolve = () => {
    if (!receiverInput.trim()) {
      toast.error('Please enter the receiver\'s name or contact');
      return;
    }
    resolve(
      { id: item.id, receiver: receiverInput.trim() },
      {
        onSuccess: () => { toast.success('Marked as returned!'); setShowInput(false); },
        onError: (err: any) => toast.error(err?.message || 'Failed to resolve'),
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug">{item.description}</p>
          </div>
        </div>
        <Badge
          className={isActive
            ? 'bg-green-100 text-green-700 border-0 shrink-0'
            : 'bg-muted text-muted-foreground border-0 shrink-0'}
        >
          {isActive ? 'Available' : 'Returned'}
        </Badge>
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Pick up at: {item.pickUpLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{item.contactInfo}</span>
        </div>
        {item.receiver && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Returned to: {item.receiver}</span>
          </div>
        )}
      </div>
      {isOwner && isActive && (
        showInput ? (
          <div className="space-y-2">
            <Input
              placeholder="Receiver's name or contact"
              value={receiverInput}
              onChange={(e) => setReceiverInput(e.target.value)}
              className="rounded-xl text-xs"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowInput(false)}
                className="flex-1 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleResolve}
                disabled={isPending}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl text-xs"
              >
                {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => setShowInput(true)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl text-xs gap-1"
          >
            <CheckCircle className="w-3 h-3" /> Mark as Returned
          </Button>
        )
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LostFoundPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const callerPrincipal = identity?.getPrincipal().toString() ?? '';

  const { data: lostItems = [], isLoading: lostLoading } = useGetLostItems();
  const { data: foundItems = [], isLoading: foundLoading } = useGetFoundItems();

  const [showLostForm, setShowLostForm] = useState(false);
  const [showFoundForm, setShowFoundForm] = useState(false);

  const activeLost = lostItems.filter((i) => i.status === LostFoundStatus.active);
  const activeFound = foundItems.filter((i) => i.status === LostFoundStatus.active);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">Lost & Found</h1>
        <p className="text-muted-foreground">
          Report lost items or help return found items to their owners on KTU campus
        </p>
      </div>

      {/* Auth notice */}
      {!isAuthenticated && (
        <div className="bg-fluxera-blue-pale border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
            <p className="text-sm text-primary font-medium">Login to report lost or found items</p>
          </div>
          <Link to="/login">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-lg shrink-0">
              Login
            </Button>
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      {isAuthenticated && (
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button
            onClick={() => setShowLostForm(true)}
            variant="outline"
            className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl gap-2 font-semibold"
          >
            <Plus className="w-4 h-4" /> Report Lost Item
          </Button>
          <Button
            onClick={() => setShowFoundForm(true)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl gap-2 font-semibold"
          >
            <Plus className="w-4 h-4" /> Report Found Item
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="lost">
        <TabsList className="w-full mb-6 rounded-xl">
          <TabsTrigger value="lost" className="flex-1 rounded-lg">
            Lost Items ({activeLost.length})
          </TabsTrigger>
          <TabsTrigger value="found" className="flex-1 rounded-lg">
            Found Items ({activeFound.length})
          </TabsTrigger>
        </TabsList>

        {/* Lost Items */}
        <TabsContent value="lost">
          {lostLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : lostItems.length === 0 ? (
            <div className="text-center py-16 bg-fluxera-gray-light rounded-2xl border border-border">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">No lost item reports</p>
              <p className="text-sm text-muted-foreground">All items are accounted for!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lostItems.map((item) => (
                <LostItemCard key={item.id.toString()} item={item} callerPrincipal={callerPrincipal} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Found Items */}
        <TabsContent value="found">
          {foundLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : foundItems.length === 0 ? (
            <div className="text-center py-16 bg-fluxera-gray-light rounded-2xl border border-border">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">No found item reports</p>
              <p className="text-sm text-muted-foreground">Nothing has been turned in yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foundItems.map((item) => (
                <FoundItemCard key={item.id.toString()} item={item} callerPrincipal={callerPrincipal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Report Lost Modal */}
      <Dialog open={showLostForm} onOpenChange={setShowLostForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-500" /> Report Lost Item
            </DialogTitle>
            <DialogDescription>
              Describe the item you lost so others can help you find it.
            </DialogDescription>
          </DialogHeader>
          <ReportLostForm onClose={() => setShowLostForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Report Found Modal */}
      <Dialog open={showFoundForm} onOpenChange={setShowFoundForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Report Found Item
            </DialogTitle>
            <DialogDescription>
              Let others know you found an item so the owner can claim it.
            </DialogDescription>
          </DialogHeader>
          <ReportFoundForm onClose={() => setShowFoundForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
