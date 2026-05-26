import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from './contact-form';
import { siteConfig } from '@/constants/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with the Leaf & Lume team — we reply within one business day.',
  path: '/contact',
});

const channels = [
  { icon: Mail, label: 'Email', value: siteConfig.contact.email },
  { icon: Phone, label: 'Phone', value: siteConfig.contact.phone },
  { icon: MapPin, label: 'Studio', value: siteConfig.contact.address },
];

export default function ContactPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container size="lg">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight xs:text-3xl sm:text-5xl">
            Talk to a human
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Skincare advice, order help, press inquiries — drop us a line below.
          </p>
        </header>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1fr_2fr]">
          <aside aria-label="Contact details" className="space-y-4">
            {channels.map(({ icon: Icon, label, value }) => (
              <Card key={label} className="shadow-soft rounded-3xl">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </aside>

          <Card className="shadow-soft rounded-3xl">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
