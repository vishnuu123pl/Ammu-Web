import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetItemsByOwner, useUpdateBorrowRequestStatus } from '../hooks/useQueries';
import AddItemForm from '../components/AddItemForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { IndianRupee, Package, CheckCircle, XCircle, MapPin, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import { RequestStatus } from '../backend';

export default function LendPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const principalText = identity?.getPrincipal().toString() ?? '';

  const { data: myItems = [], isLoading } = useGetItemsByOwner(principalText);
  const { mutate: updateStatus, isPending } = useUpdateBorrowRequestStatus();

  const handleApprove = (itemId: bigint) => {
    updateStatus(
      { itemId, newStatus: RequestStatus.approved },
      {
        onSuccess: () => toast.success('Borrow request approved!'),
        onError: (err: any) => toast.error(err?.message || 'Failed to approve'),
      }
    );
  };

  const handleDeny = (itemId: bigint) => {
    updateStatus(
      { itemId, newStatus: RequestStatus.denied },
      {
        onSuccess: () => toast.success('Borrow request denied.'),
        onError: (err: any) => toast.error(err?.message || 'Failed to deny'),
      }
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-3">Login to Start Lending</h2>
        <p className="text-muted-foreground mb-6">Share your items with fellow KTU students and earn extra income</p>
        <Link to="/login">
          <Button className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl">
            Login to Lend
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">Earn By Sharing</h1>
        <p className="text-muted-foreground">
          List your items and earn money while helping fellow KTU students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Item Form */}
        <div>
          {/* Rent suggestion callout */}
          <div className="bg-fluxera-blue-pale border border-primary/20 rounded-2xl p-4 mb-6 flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary mb-1">Set Student-Friendly Rents</p>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Please set very low rent because this is a student-friendly initiative.
                Example rents: <strong>Books ₹5/day</strong> · <strong>Lab coat ₹10/day</strong> · <strong>DSLR/Tools ₹50/day</strong>
              </p>
            </div>
          </div>
          <AddItemForm />
        </div>

        {/* My Listed Items */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">My Listed Items</h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : myItems.length === 0 ? (
            <div className="text-center py-12 bg-fluxera-gray-light rounded-2xl border border-border">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No items listed yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myItems.map((item) => (
                <div key={item.id.toString()} className="bg-white rounded-2xl border border-border p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge
                      className={item.borrowerPrincipal
                        ? 'bg-warning/20 text-warning-foreground border-0'
                        : 'bg-success/20 text-success border-0'}
                    >
                      {item.borrowerPrincipal ? 'Borrowed' : 'Available'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2">
                    <IndianRupee className="w-3 h-3" />
                    {item.pricePerDay !== undefined && item.pricePerDay !== null && `₹${item.pricePerDay}/day`}
                    {item.pricePerDay !== undefined && item.pricePerDay !== null && item.pricePerMonth !== undefined && item.pricePerMonth !== null && ' · '}
                    {item.pricePerMonth !== undefined && item.pricePerMonth !== null && `₹${item.pricePerMonth}/month`}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  )}
                  {!item.borrowerPrincipal && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(item.id)}
                        disabled={isPending}
                        className="flex-1 bg-success text-success-foreground hover:bg-success/90 rounded-lg text-xs gap-1"
                      >
                        <CheckCircle className="w-3 h-3" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeny(item.id)}
                        disabled={isPending}
                        className="flex-1 border-destructive text-destructive hover:bg-destructive/10 rounded-lg text-xs gap-1"
                      >
                        <XCircle className="w-3 h-3" /> Deny
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
