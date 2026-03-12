import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Display-only form — no actual email sending
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale py-14 lg:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mx-auto mb-5">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-8">
              <h2 className="text-2xl font-black text-foreground mb-6">Send a Message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-fluxera-blue-pale flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="border-primary text-primary hover:bg-fluxera-blue-pale rounded-xl mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="e.g., Arjun Nair"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="e.g., arjun@ktu.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="rounded-xl resize-none"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl font-semibold h-11 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We're here to help KTU students get the most out of Fluxera. Reach out via
                  WhatsApp for the fastest response, or send us an email.
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl hover:shadow-card transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <SiWhatsapp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground">WhatsApp Support</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">Fastest response</p>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-center gap-4 p-5 bg-fluxera-gray-light border border-border rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@fluxera.example.com</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Response within 24 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-5 bg-fluxera-gray-light border border-border rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Based in Kerala</p>
                  <p className="text-sm text-muted-foreground">Serving all KTU-affiliated colleges</p>
                  <p className="text-xs text-muted-foreground mt-0.5">APJ Abdul Kalam Technological University</p>
                </div>
              </div>

              {/* Community */}
              <div className="flex items-center gap-4 p-5 bg-fluxera-blue-pale border border-primary/20 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Student Community</p>
                  <p className="text-sm text-muted-foreground">
                    Join our growing network of KTU students sharing and saving together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
