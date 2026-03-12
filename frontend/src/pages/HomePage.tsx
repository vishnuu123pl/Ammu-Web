import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Shirt, Calculator, Cpu, Home, Wrench, Backpack, Trophy,
  Search, HandshakeIcon, RotateCcw, Leaf, Users, IndianRupee, ArrowRight,
  Star, Shield, Zap
} from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { PageContainer } from '@/components/PageContainer';
import { SectionCard } from '@/components/SectionCard';
import { StepCard } from '@/components/StepCard';
import { BenefitCard } from '@/components/BenefitCard';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/constants/design';

const categoryIcons: Record<string, any> = {
  'Books & Notes': BookOpen,
  'Lab Coats': Shirt,
  'Calculators': Calculator,
  'Electronics': Cpu,
  'Hostel Essentials': Home,
  'Tools': Wrench,
  'Bags': Backpack,
  'Sports Items': Trophy,
};

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
      <HeroSection>
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
      </HeroSection>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">How Fluxera Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to start saving money</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <StepCard
                key={s.step}
                step={s.step}
                icon={s.icon}
                title={s.title}
                description={s.desc}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-fluxera-gray-light">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">Browse Categories</h2>
            <p className="text-muted-foreground text-lg">Find exactly what you need for your KTU studies</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.name];
              return (
                <CategoryCard
                  key={cat.name}
                  name={cat.name}
                  icon={IconComponent}
                  color={cat.color}
                />
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/categories">
              <Button variant="outline" className="border-primary text-primary hover:bg-fluxera-blue-pale gap-2">
                View All Categories <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Why Choose Fluxera */}
      <section className="py-16 lg:py-24 bg-white">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">Why Choose Fluxera?</h2>
            <p className="text-muted-foreground text-lg">Built specifically for the KTU student community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <BenefitCard
                key={b.title}
                icon={b.icon}
                title={b.title}
                description={b.desc}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <PageContainer className="text-center">
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
        </PageContainer>
      </section>
    </div>
  );
}
