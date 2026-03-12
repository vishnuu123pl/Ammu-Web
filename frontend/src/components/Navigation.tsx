import { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, User, LogOut, LogIn, ChevronDown } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Borrow', path: '/borrow' },
  { label: 'Lend', path: '/lend' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Categories', path: '/categories' },
  { label: 'Lost & Found', path: '/lost-found' },
  { label: 'About', path: '/about' },
];

const moreLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
  { label: 'QR Scanner', path: '/qr-scanner' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setMobileOpen(false);
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (e: any) {
      if (e?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-fluxera-blue to-fluxera-teal shadow-lg group-hover:shadow-card-hover transition-shadow">
              <img
                src="/src/assets/fluxera-logo.jpg"
                alt="Fluxera"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="font-bold text-lg text-primary hidden sm:block">Fluxera</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-fluxera-blue-pale/40 rounded-lg transition-colors"
                activeProps={{ className: 'text-primary bg-fluxera-blue-pale/60 font-semibold' }}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-fluxera-blue-pale/40 rounded-lg transition-colors">
                  More <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth + Profile */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleLogin}
                disabled={loginStatus === 'logging-in'}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                <LogIn className="w-4 h-4" />
                {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-fluxera-blue-pale/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white shadow-lg">
          <nav className="px-2 py-4 space-y-2">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-primary hover:bg-fluxera-blue-pale/40 rounded-lg transition-colors min-h-12 flex items-center"
                activeProps={{ className: 'text-primary bg-fluxera-blue-pale/60 font-semibold' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-foreground/70 hover:text-primary hover:bg-fluxera-blue-pale/40 rounded-lg transition-colors min-h-12"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="w-5 h-5" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors min-h-12"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { handleLogin(); setMobileOpen(false); }}
                  disabled={loginStatus === 'logging-in'}
                  className="flex items-center gap-2 w-full px-4 py-3 text-base font-semibold text-primary bg-fluxera-blue-pale/60 hover:bg-fluxera-blue-pale rounded-lg transition-colors min-h-12"
                >
                  <LogIn className="w-5 h-5" />
                  {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
