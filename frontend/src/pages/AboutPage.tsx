import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Target, Eye, Heart, Leaf, IndianRupee, Users, Shield, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We believe in reducing waste by promoting reuse. Every borrowed item is one less purchase, helping the environment and your wallet.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: IndianRupee,
    title: 'Affordability',
    desc: 'Education should not be a financial burden. Fluxera keeps rents at ₹5–₹50 so every KTU student can access what they need.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Fluxera is built on trust between KTU students. Peer-to-peer connections within the university community make borrowing safe and reliable.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    desc: 'All users are verified via Internet Identity. Transparent pricing in ₹ with no hidden fees ensures a fair experience for everyone.',
    color: 'bg-indigo-50 text-indigo-600',
  },
];

const team = [
  { stat: '₹5', label: 'Minimum rent per day' },
  { stat: 'KTU', label: 'University network' },
  { stat: 'Kerala', label: 'State-wide vision' },
  { stat: '0', label: 'Hidden fees' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/assets/generated/fluxera-logo.dim_400x120.png"
            alt="Fluxera"
            className="h-16 w-auto object-contain mx-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">About Fluxera</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A student-first platform built to make education affordable for every KTU student in Kerala
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-primary-foreground mb-1">{s.stat}</div>
                <div className="text-sm text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-fluxera-gray-light rounded-3xl p-8 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Make education affordable for KTU students by enabling peer-to-peer borrowing at
                ultra-low rents (₹5–₹50). We believe every student at APJ Abdul Kalam Technological
                University deserves access to the tools and resources they need — without financial burden.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-fluxera-blue-pale rounded-3xl p-8 border border-primary/20">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Build a Kerala-wide borrowing network where every KTU student — from Thiruvananthapuram
                to Kasaragod — can access essential items without financial burden. A future where
                sharing is the norm and waste is minimized across all KTU campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-fluxera-gray-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-foreground mb-3">Our Values</h2>
            <p className="text-muted-foreground">What drives everything we do at Fluxera</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-border shadow-card flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${v.color}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-black text-foreground mb-4">Built with Love for KTU</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Fluxera was born from a simple observation: KTU students spend thousands of rupees on
            items they use for just a few weeks or months. Engineering drawing kits, lab coats,
            reference books, calculators — these items sit unused after a semester ends.
            Fluxera connects students who need these items with those who have them, creating a
            circular economy within the KTU community.
          </p>
          <Link to="/borrow">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark gap-2 rounded-xl px-8">
              Start Borrowing <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
