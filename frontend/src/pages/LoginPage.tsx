import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { LogIn, Shield, Loader2 } from 'lucide-react';
import ProfileSetupModal from '../components/ProfileSetupModal';

export default function LoginPage() {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      navigate({ to: '/borrow' });
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (e: any) {
      if (e?.message === 'User is already authenticated') {
        console.warn('Already authenticated');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="/assets/generated/fluxera-logo.dim_400x120.png"
              alt="Fluxera"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-center text-sm">
              Designed for KTU students in Kerala
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-card border border-border p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Fluxera</h1>
              <p className="text-muted-foreground text-sm">
                Sign in to borrow, lend, and connect with fellow KTU students
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                { icon: '📚', text: 'Borrow books, tools & more from ₹5/day' },
                { icon: '💰', text: 'Earn by sharing your items with peers' },
                { icon: '🔒', text: 'Secure peer-to-peer student network' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="text-lg">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {isInitializing ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                disabled={loginStatus === 'logging-in'}
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary-dark h-12 text-base font-semibold rounded-xl"
              >
                {loginStatus === 'logging-in' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
                ) : (
                  <><LogIn className="w-4 h-4" /> Login with Internet Identity</>
                )}
              </Button>
            )}

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Secured by Internet Identity — no passwords needed</span>
            </div>
          </div>
        </div>
      </div>

      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
