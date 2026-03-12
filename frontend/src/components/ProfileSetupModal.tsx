import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    saveProfile(
      { name: name.trim(), contactInfo: contactInfo.trim() },
      {
        onSuccess: () => toast.success('Profile created! Welcome to Fluxera 🎒'),
        onError: (err: any) => toast.error(err?.message || 'Failed to save profile'),
      }
    );
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-fluxera-blue-pale flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Set Up Your Profile</DialogTitle>
              <DialogDescription>Tell us your name to get started</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g., Arjun Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Info</Label>
            <Input
              id="contact"
              placeholder="e.g., +91 98765 43210 or WhatsApp"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-dark"
          >
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : 'Save Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
