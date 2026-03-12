import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { HelpCircle, IndianRupee, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'Is borrowing safe on Fluxera?',
    a: 'Yes! All users are verified via Internet Identity before they can borrow or lend. This ensures that only genuine KTU students participate in the platform. You can also see the lender\'s contact information before completing a transaction.',
  },
  {
    q: 'Why are rents so low on Fluxera?',
    a: 'Because Fluxera is made for students — we promote affordability and sustainability. Our mission is to make education accessible for every KTU student in Kerala. Lenders are encouraged to set rents between ₹5–₹50/day to keep the platform student-friendly.',
  },
  {
    q: 'What if an item is damaged during borrowing?',
    a: 'The borrower is responsible for the item during the rental period. If an item is damaged, the borrower must compensate the lender fairly based on the item\'s value and condition. Please handle all borrowed items with care and respect.',
  },
  {
    q: 'Does Fluxera charge any extra fees?',
    a: 'No hidden fees! All prices are transparent and displayed in Indian Rupees (₹). The rent you see is exactly what you pay to the lender. Fluxera does not add any service charges or platform fees.',
  },
  {
    q: 'How do I list an item for lending?',
    a: 'Go to the Lend page, fill in the item details (name, description, category, price per day/month, and location), and click "Post Your Item (₹)". Your item will be visible to all KTU students immediately.',
  },
  {
    q: 'Can I borrow multiple items at the same time?',
    a: 'Yes! You can borrow as many items as you need from different lenders. Each borrow request is handled separately, and you can track all your active borrows from your Profile page.',
  },
  {
    q: 'What if I lose a borrowed item?',
    a: 'If you lose a borrowed item, you must inform the lender immediately and compensate them for the full value of the item. You can also use the Lost & Found section to report and search for lost items on campus.',
  },
  {
    q: 'How do I contact a lender?',
    a: 'When you view an item and submit a borrow request, the lender\'s contact information (provided during profile setup) will be shared with you once the request is approved. Always communicate respectfully.',
  },
  {
    q: 'Is Fluxera available for all KTU colleges?',
    a: 'Yes! Fluxera is designed for all colleges affiliated with APJ Abdul Kalam Technological University (KTU) across Kerala. Students from any KTU-affiliated college can join and use the platform.',
  },
  {
    q: 'What items can I list on Fluxera?',
    a: 'You can list any item that is useful for KTU students: books, notes, lab coats, calculators, electronics, tools, hostel essentials, bags, sports items, and more. Please do not list illegal or inappropriate items.',
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale py-14 lg:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about borrowing and lending on Fluxera
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-border rounded-2xl px-6 shadow-card data-[state=open]:border-primary/30 data-[state=open]:shadow-card-hover transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-12 bg-fluxera-gray-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-foreground mb-3">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-dark gap-2 rounded-xl px-8">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/borrow">
              <Button variant="outline" className="border-primary text-primary hover:bg-fluxera-blue-pale gap-2 rounded-xl px-8">
                <IndianRupee className="w-4 h-4" /> Start Borrowing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
