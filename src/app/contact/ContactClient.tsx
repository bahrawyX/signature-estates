"use client";
import * as React from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";

const SUBJECTS = [
  "Buying — Residential",
  "Buying — Commercial",
  "Selling a Property",
  "Investment Brief",
  "Press & Editorial",
  "Other",
];

export function ContactClient() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <>
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
                Contact
              </span>
              <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-8xl text-balance leading-[0.98]">
                Tell us your <em className="font-display text-[var(--color-gold)]">brief.</em>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.2}>
              <p className="text-base lg:text-lg text-[var(--color-gray)] leading-relaxed">
                A senior advisor responds to every enquiry within one working day.
                There's no obligation in a first conversation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 lg:col-start-1">
            {submitted ? (
              <div className="border border-[var(--color-gold)] p-12 bg-white">
                <p className="font-display text-5xl">Thank you.</p>
                <p className="mt-4 text-[var(--color-gray)] leading-relaxed max-w-md">
                  We've received your brief and an advisor will be in touch within one
                  working day. In the meantime, the latest properties on our list are
                  on the catalogue.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
              >
                <div className="md:col-span-1">
                  <Label>Full name</Label>
                  <Input className="mt-2" required name="name" />
                </div>
                <div className="md:col-span-1">
                  <Label>Email</Label>
                  <Input className="mt-2" type="email" required name="email" />
                </div>
                <div className="md:col-span-1">
                  <Label>Phone</Label>
                  <Input className="mt-2" type="tel" name="phone" />
                </div>
                <div className="md:col-span-1">
                  <Label>Subject</Label>
                  <Select name="subject">
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Message</Label>
                  <Textarea className="mt-2" rows={6} required name="message" placeholder="Tell us about your timeline, your budget band, and the locations you're considering." />
                </div>
                <div className="md:col-span-2 mt-2">
                  <Button type="submit" variant="gold" size="lg">Send Brief</Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 space-y-10">
            <Reveal>
              <div>
                <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)] mb-3">Cairo Office</p>
                <p className="font-display text-2xl leading-snug">
                  Cairo Festival City<br />
                  Boulevard Tower, 12th floor<br />
                  New Cairo, Egypt
                </p>
                <div className="gold-rule my-7" />
                <ul className="space-y-3 text-[var(--color-gray)]">
                  <li className="flex items-center gap-3"><Phone size={14} className="text-[var(--color-gold)]" /> +20 2 2614 9000</li>
                  <li className="flex items-center gap-3"><Mail size={14} className="text-[var(--color-gold)]" /> concierge@signatureestates.eg</li>
                  <li className="flex items-center gap-3"><Clock size={14} className="text-[var(--color-gold)]" /> Sun – Thu · 9:30 to 18:30</li>
                  <li className="flex items-start gap-3"><MapPin size={14} className="text-[var(--color-gold)] mt-1" /> Visits by appointment</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)] mb-3">Follow</p>
                <div className="flex items-center gap-4 text-black/60">
                  <a href="#" aria-label="Instagram" className="hover:text-[var(--color-gold)] transition-colors"><Instagram size={18} /></a>
                  <a href="#" aria-label="Facebook" className="hover:text-[var(--color-gold)] transition-colors"><Facebook size={18} /></a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-[var(--color-gold)] transition-colors"><Linkedin size={18} /></a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section>
        <div className="aspect-[16/7] w-full">
          <iframe
            title="Signature Estates office location"
            src="https://www.google.com/maps?q=Cairo+Festival+City&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
