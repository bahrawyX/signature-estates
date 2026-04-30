import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Speak to a Signature Estates advisor. Office in Cairo Festival City. We answer every enquiry within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
