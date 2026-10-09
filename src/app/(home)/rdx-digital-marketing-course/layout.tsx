import type { Metadata } from "next";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ritzmediaworld.com/rdx-digital-marketing-course",
  },
  title:
    "Best Digital Marketing Course in Delhi NCR with placement - RDX | Ritz Media World",
  description:
    "RDX | Ritz Media World – Leading Digital Marketing Course in Delhi & across India. Get the most advanced & affordable digital marketing training with assured placement assistance.",
  keywords:
    "Digital Marketing Course in Delhi, digital marketing institute in delhi, top ten Digital marketing institutes in delhi, delhi institute of digital marketing, digital marketing training in delhi, Digital Marketing training in Delhi, Digital marketing course with placement in Delhi NCR, Digital marketing training in Delhi NCR, Digital marketing classes in Delhi NCR, Learn digital marketing in Delhi NCR, Digital marketing course in Delhi NCR, Best digital marketing institute in Delhi NCR",
};

export default function RDXDigitalMarketing({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
