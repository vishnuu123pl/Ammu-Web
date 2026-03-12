import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Search, IndianRupee, RotateCcw, ArrowRight, Shield, Users, Leaf } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search Items Near Your College',
    description:
      'Browse hundreds of items listed by fellow KTU students. Use filters to find items by category (Books, Electronics, Tools, etc.), hostel, or college branch. All items are priced in ₹ to keep rents ultra-low.',
    highlight: '₹ filters shown',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tips: [
      'Filter by category for quick results',
      'Search by item name or description',
      'Filter by hostel or location',
    ],
  },
  {
    number: '02',
    icon: IndianRupee,
    title: 'Borrow for Minimum Rent',
    description:
      'Borrow items for extremely low rent — ₹5/day for books, ₹10/day for lab coats, ₹50/day for DSLR cameras and tools. Choose your rental duration (per day or per month) and submit your borrow request.',
    highlight: 'Minimum rent ₹5–₹50',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
    tips: [
      'Books from just ₹5/day',
      'Lab coats from ₹10/day',
      'DSLR & tools from ₹50/day',
    ],
  },
  {
    number: '03',
    icon: RotateCcw,
    title: 'Return Safely',
    description:
      'Return the item to the lender at the agreed location and time. Handle borrowed items with care. If an item is damaged, the borrower must compensate the lender fairly.',
    highlight: 'Safe & simple',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    tips: [
      'Return on time as agreed',
      'Handle items with care',
      'Contact lender if delayed',
    ],
  },
];

const values = [
  { icon: Shield, title: 'Verified Students', desc: 'All users verified via Internet Identity' },
  { icon: Users, title: 'KTU Community', desc: 'Built exclusively for KTU students in Kerala' },
  { icon: Leaf, title: 'Sustainable', desc: 'Reduce waste by sharing instead of buying' },
  { icon: IndianRupee, title: 'Ultra-Affordable', desc: 'Rents from just ₹5/day for students' },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">How Fluxera Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start borrowing and saving money as a KTU student in Kerala
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
              >
                {/* Illustration */}
                <div className="flex-shrink-0 w-full lg:w-80">
                  <div className={`${step.color} rounded-3xl p-10 flex flex-col items-center justify-center aspect-square max-w-xs mx-auto`}>
                    <div className="text-6xl font-black text-foreground/10 mb-4">{step.number}</div>
                    <step.icon className={`w-20 h-20 ${step.iconColor}`} />
                    <div className="mt-4 bg-white rounded-full px-4 py-1.5 text-xs font-bold text-foreground shadow-card">
                      {step.highlight}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-black text-primary/20">{step.number}</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-base">{step.description}</p>
                  <ul className="space-y-2">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-fluxera-gray-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground text-center mb-8">Why Students Trust Fluxera</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-5 text-center border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-foreground mb-3">Ready to Start Borrowing?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of KTU students saving money with Fluxera</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/borrow">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-dark gap-2 rounded-xl px-8">
                <IndianRupee className="w-4 h-4" /> Start Borrowing
              </Button>
            </Link>
            <Link to="/lend">
              <Button variant="outline" className="border-primary text-primary hover:bg-fluxera-blue-pale gap-2 rounded-xl px-8">
                List an Item <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
