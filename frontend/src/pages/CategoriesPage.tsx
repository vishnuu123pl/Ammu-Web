import { Link } from '@tanstack/react-router';
import {
  BookOpen, Shirt, Calculator, Cpu, Home, Wrench, Backpack, Trophy,
  FileText, Smartphone, FlaskConical, Layers
} from 'lucide-react';

const categories = [
  {
    name: 'Engineering Books',
    icon: BookOpen,
    desc: 'Textbooks, reference books, KTU syllabus books',
    price: 'From ₹15/day',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    query: 'Books',
  },
  {
    name: 'Notes & Study Material',
    icon: FileText,
    desc: 'Handwritten notes, printed notes, study guides',
    price: 'From ₹5/day',
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    query: 'Books',
  },
  {
    name: 'Electronics',
    icon: Cpu,
    desc: 'Breadboards, components, Arduino, Raspberry Pi',
    price: 'From ₹5/day',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    query: 'Electronics',
  },
  {
    name: 'Tools',
    icon: Wrench,
    desc: 'Soldering iron, multimeter, drawing instruments',
    price: 'From ₹10/day',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    query: 'Tools',
  },
  {
    name: 'Hostel Items',
    icon: Home,
    desc: 'Study lamps, extension boards, hostel essentials',
    price: 'From ₹5/day',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    query: 'Hostel Essentials',
  },
  {
    name: 'Lab Coat / Apron',
    icon: Shirt,
    desc: 'Lab coats, aprons, safety gear for labs',
    price: 'From ₹6/day',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    query: 'Lab Equipment',
  },
  {
    name: 'Gadgets & DSLR',
    icon: Smartphone,
    desc: 'DSLR cameras, tripods, USB hubs, power banks',
    price: 'From ₹5/day',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    query: 'Electronics',
  },
  {
    name: 'Bags',
    icon: Backpack,
    desc: 'Backpacks, laptop bags, travel bags',
    price: 'From ₹10/day',
    color: 'bg-teal-50 text-teal-700 border-teal-100',
    query: 'Bags',
  },
  {
    name: 'Sports Items',
    icon: Trophy,
    desc: 'Cricket bat, football, badminton racket, volleyball',
    price: 'From ₹10/day',
    color: 'bg-sky-50 text-sky-700 border-sky-100',
    query: 'Sports',
  },
  {
    name: 'Calculators',
    icon: Calculator,
    desc: 'Scientific calculators, graphing calculators',
    price: 'From ₹10/day',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    query: 'Calculator',
  },
  {
    name: 'Lab Equipment',
    icon: FlaskConical,
    desc: 'Lab kits, measuring instruments, safety gear',
    price: 'From ₹6/day',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    query: 'Lab Equipment',
  },
  {
    name: 'Other',
    icon: Layers,
    desc: 'Miscellaneous items for student needs',
    price: 'Varies',
    color: 'bg-slate-50 text-slate-600 border-slate-100',
    query: 'Other',
  },
];

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale py-14 lg:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Browse Categories</h1>
          <p className="text-lg text-muted-foreground">
            Find everything you need for your KTU studies — all at ultra-low rents in ₹
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/borrow"
                search={{ category: cat.query }}
                className="group flex flex-col p-5 bg-white rounded-2xl border border-border hover:shadow-card-hover hover:border-primary/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1 leading-tight">{cat.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{cat.desc}</p>
                <span className="text-xs font-bold text-primary">{cat.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
