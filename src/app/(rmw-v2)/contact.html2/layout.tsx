import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ritzmediaworld.com/contact.html",
  },
  title: "Contact Ritz Media World | Digital & Brand Agency in Delhi NCR",
  description:
    "Get in touch with Ritz Media World, your full-service advertising & digital agency in Delhi NCR. Call us or fill the form for a free consultation today.",
  keywords: [
    "contact Ritz Media World",
    "advertising agency Delhi NCR contact",
    "digital marketing agency Noida contact",
    "brand agency Delhi NCR phone",
    "advertising & digital services enquiry Delhi NCR",
    "contact full-service ad agency India Noida",
    "get a quote digital marketing Delhi NCR",
    "advertising agency enquiry form Noida",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
