import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'fluxera-ktu');

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <img
            src="/assets/generated/fluxera-logo.dim_400x120.png"
            alt="Fluxera"
            className="h-8 w-auto object-contain opacity-80"
          />

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/borrow" className="hover:text-primary transition-colors">Borrow</Link>
            <Link to="/lend" className="hover:text-primary transition-colors">Lend</Link>
            <Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <Link to="/lost-found" className="hover:text-primary transition-colors">Lost & Found</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </nav>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground text-center">
            Prices in Indian Rupees (₹) &nbsp;•&nbsp; Made for KTU Students, Kerala
          </p>

          {/* Copyright + attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-muted-foreground text-center">
            <span>© {year} Fluxera. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 fill-primary text-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
