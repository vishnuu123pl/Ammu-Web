import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetCallerUserProfile,
  useGetItemsByOwner,
  useGetItemsByBorrower,
  useGetUserBorrowingHistory,
} from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  User, Package, Clock, LogOut, Copy, CheckCircle, MapPin, IndianRupee
} from 'lucide-react';
import { Item, BorrowRequest, RequestStatus } from '../backend';
import ItemLocationDisplay from '../components/ItemLocationDisplay';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';

export default function ProfilePage() {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const callerPrincipal = identity?.getPrincipal().toString() ?? '';
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: myItems = [], isLoading: itemsLoading } = useGetItemsByOwner(callerPrincipal);
  const { data: borrowedItems = [], isLoading: borrowedLoading } = useGetItemsByBorrower(callerPrincipal);
  const { data: history = [], isLoading: historyLoading } = useGetUserBorrowingHistory(callerPrincipal);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleCopyPrincipal = () => {
    navigator.clipboard.writeText(callerPrincipal);
    setCopied(true);
    toast.success('Principal ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = profile?.name
    ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  if (!identity) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-3">Login to View Profile</h2>
        <p className="text-muted-foreground mb-6">Sign in to manage your listings and borrowing history</p>
        <Link to="/login">
          <Button className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="w-16 h-16 shrink-0">
            <AvatarFallback className="bg-fluxera-blue-pale text-primary text-xl font-black">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {profileLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-black text-foreground">
                  {profile?.name ?? 'Unknown User'}
                </h1>
                <p className="text-muted-foreground text-sm mt-0.5">{profile?.contactInfo}</p>
                <button
                  onClick={handleCopyPrincipal}
                  className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="font-mono truncate max-w-[200px]">{callerPrincipal.slice(0, 24)}...</span>
                  {copied ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-black text-primary">{myItems.length}</p>
            <p className="text-xs text-muted-foreground">Items Listed</p>
          </div>
          <div>
            <p className="text-2xl font-black text-primary">{borrowedItems.length}</p>
            <p className="text-xs text-muted-foreground">Borrowing</p>
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{history.length}</p>
            <p className="text-xs text-muted-foreground">Total Requests</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="lending">
        <TabsList className="w-full mb-6 rounded-xl">
          <TabsTrigger value="lending" className="flex-1 rounded-lg">
            My Listings ({myItems.length})
          </TabsTrigger>
          <TabsTrigger value="borrowing" className="flex-1 rounded-lg">
            Borrowing ({borrowedItems.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 rounded-lg">
            History ({history.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lending">
          {itemsLoading ? (
            <LoadingSkeleton />
          ) : myItems.length === 0 ? (
            <EmptyState message="You haven't listed any items yet" action={{ label: 'List an Item', to: '/lend' }} />
          ) : (
            <div className="space-y-3">
              {myItems.map((item) => (
                <LendingItemCard key={item.id.toString()} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="borrowing">
          {borrowedLoading ? (
            <LoadingSkeleton />
          ) : borrowedItems.length === 0 ? (
            <EmptyState message="You're not borrowing any items" action={{ label: 'Browse Items', to: '/borrow' }} />
          ) : (
            <div className="space-y-3">
              {borrowedItems.map((item) => (
                <BorrowingItemCard key={item.id.toString()} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {historyLoading ? (
            <LoadingSkeleton />
          ) : history.length === 0 ? (
            <EmptyState message="No borrow history yet" action={{ label: 'Browse Items', to: '/borrow' }} />
          ) : (
            <div className="space-y-3">
              {history.map((req, i) => (
                <HistoryCard key={i} request={req} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function formatItemPrice(item: Item): string {
  const parts: string[] = [];
  if (item.pricePerDay !== undefined && item.pricePerDay !== null) {
    parts.push(`₹${item.pricePerDay}/day`);
  }
  if (item.pricePerMonth !== undefined && item.pricePerMonth !== null) {
    parts.push(`₹${item.pricePerMonth}/month`);
  }
  return parts.length > 0 ? parts.join(' · ') : 'Price on request';
}

function LendingItemCard({ item }: { item: Item }) {
  const isBorrowed = !!item.borrowerPrincipal;
  return (
    <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-foreground truncate">{item.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
              <span className="text-xs text-primary font-semibold flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />{formatItemPrice(item)}
              </span>
            </div>
          </div>
        </div>
        <Badge
          className={isBorrowed
            ? 'bg-warning/20 text-warning-foreground border-0 shrink-0 text-xs'
            : 'bg-success/20 text-success border-0 shrink-0 text-xs'}
        >
          {isBorrowed ? 'Borrowed' : 'Available'}
        </Badge>
      </div>
      {item.location && (
        <div className="mt-3">
          <ItemLocationDisplay location={item.location} />
        </div>
      )}
    </div>
  );
}

function BorrowingItemCard({ item }: { item: Item }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
          <Package className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-foreground truncate">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge variant="outline" className="text-xs">{item.category}</Badge>
            <span className="text-xs text-primary font-semibold flex items-center gap-0.5">
              <IndianRupee className="w-3 h-3" />{formatItemPrice(item)}
            </span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryCard({ request }: { request: BorrowRequest }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-warning/20 text-warning-foreground' },
    approved: { label: 'Approved', className: 'bg-success/20 text-success' },
    denied: { label: 'Denied', className: 'bg-destructive/10 text-destructive' },
  };

  const statusKey =
    request.status === RequestStatus.pending ? 'pending'
    : request.status === RequestStatus.approved ? 'approved'
    : 'denied';

  const config = statusConfig[statusKey];
  const durationDays = Math.round(Number(request.borrowTime));

  return (
    <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Item #{request.itemId.toString()}</p>
            <p className="text-xs text-muted-foreground">
              Duration: {durationDays} day{durationDays !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white border border-border rounded-2xl p-4 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message, action }: { message: string; action?: { label: string; to: string } }) {
  return (
    <div className="bg-fluxera-gray-light border border-border rounded-2xl p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-3">
        <Package className="w-7 h-7 text-primary" />
      </div>
      <p className="font-bold text-foreground mb-3">{message}</p>
      {action && (
        <Link to={action.to}>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
