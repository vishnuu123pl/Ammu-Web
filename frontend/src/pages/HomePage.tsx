import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Shirt, Calculator, Cpu, Home, Wrench, Backpack, Trophy,
  Search, HandshakeIcon, RotateCcw, Leaf, Users, IndianRupee, ArrowRight,
  Star, Shield, Zap
} from 'lucide-react';

const categories = [
  { name: 'Books & Notes', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
  { name: 'Lab Coats', icon: Shirt, color: 'bg-teal-50 text-teal-600' },
  { name: 'Calculators', icon: Calculator, color: 'bg-sky-50 text-sky-600' },
  { name: 'Electronics', icon: Cpu, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Hostel Essentials', icon: Home, color: 'bg-cyan-50 text-cyan-600' },
  { name: 'Tools', icon: Wrench, color: 'bg-blue-50 text-blue-700' },
  { name: 'Bags', icon: Backpack, color: 'bg-teal-50 text-teal-700' },
  { name: 'Sports Items', icon: Trophy, color: 'bg-sky-50 text-sky-700' },
];

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search Items',
    desc: 'Search items near your KTU college campus. Filter by category, hostel, or branch. All prices in ₹.',
  },
  {
    step: '02',
    icon: IndianRupee,
    title: 'Borrow for ₹5–₹50',
    desc: 'Borrow for extremely low rent — ₹5/day for books, ₹10/day for lab coats, ₹50/day for DSLR & tools.',
  },
  {
    step: '03',
    icon: RotateCcw,
    title: 'Return Safely',
    desc: 'Return the item to the lender at the agreed location and time. Simple, safe, and student-friendly.',
  },
];

const benefits = [
  { icon: IndianRupee, title: 'Ultra-Low Rents', desc: 'Save money with ₹5–₹50 rents designed for student budgets' },
  { icon: Users, title: 'Peer-to-Peer', desc: 'Borrow directly from fellow KTU students — no middlemen' },
  { icon: Leaf, title: 'Sustainable', desc: 'Reduce waste by sharing instead of buying new items' },
  { icon: Shield, title: 'Verified Students', desc: 'All users verified via Internet Identity for safe transactions' },
  { icon: Home, title: 'Helps Hostellers', desc: 'Perfect for hostel students who need items temporarily' },
  { icon: Zap, title: 'Instant Access', desc: 'Find and borrow items quickly from your campus community' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-fluxera-blue-pale text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Star className="w-3 h-3 fill-primary" />
                Designed for KTU Students in Kerala
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight mb-4">
                FLUXERA
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-3">
                Borrow Instead of Buy
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                The student rental platform built for APJ Abdul Kalam Technological University.
                Rent items from ₹5/day and save big.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/borrow' })}
                  className="bg-primary text-primary-foreground hover:bg-primary-dark gap-2 h-12 px-8 text-base font-semibold rounded-xl shadow-card"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/lend' })}
                  className="border-primary text-primary hover:bg-fluxera-blue-pale gap-2 h-12 px-8 text-base font-semibold rounded-xl"
                >
                  Join as Lender
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-primary" />From ₹5/day</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" />Verified Students</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary" />KTU Network</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl bg-white shadow-card-hover flex items-center justify-center border border-border">
                  <img
                    src="/assets/generated/fluxera-logo-transparent.dim_400x300.png"
                    alt="Fluxera"
                    className="w-56 h-56 lg:w-72 lg:h-72 object-contain"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-card">
                  ₹5–₹50/day
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-card">
                  🎓 KTU Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">How Fluxera Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to start saving money</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-fluxera-gray-light border border-border hover:shadow-card-hover transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-black w-8 h-8 rounded-full flex items-center justify-center">
                  {s.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mb-4 mt-2">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 bg-fluxera-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">Browse Categories</h2>
            <p className="text-muted-foreground text-lg">Find exactly what you need for your KTU studies</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/borrow"
                search={{ category: cat.name }}
                className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-border hover:shadow-card-hover hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/categories">
              <Button variant="outline" className="border-primary text-primary hover:bg-fluxera-blue-pale gap-2">
                View All Categories <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Fluxera */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">Why Choose Fluxera?</h2>
            <p className="text-muted-foreground text-lg">Built specifically for the KTU student community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-fluxera-gray-light border border-border hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Join the KTU Sharing Revolution
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Thousands of KTU students are already saving money by borrowing instead of buying.
            Start today — items from just ₹5/day!
          </p>
          <Link to="/borrow">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-fluxera-blue-pale gap-2 h-12 px-10 text-base font-bold rounded-xl shadow-card"
            >
              <IndianRupee className="w-4 h-4" />
              Start Borrowing (₹)
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
