import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Designing & Development Company in India | Custom Web Solutions",
  description:
      "Looking for a website that converts? Get custom web design & development in Delhi NCR tailored to your brand, audience, and business goals.",
  keywords:
      "Top Web Design & Development Company, Web Designing & Development Services, Custom Website Design & Development, Best Web Design Agency, Creative Website Designers & Developers, Full-Service Web Development Company, End-to-End Website Design & Development Solutions Best Marketing Agency in India, content marketing agency, content marketing agency in Noida, content marketing agency in India, digital marketing agencies, best digital marketing agencies, Top digital marketing company in Noida, top seo companies in Noida",
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  openGraph: {
      type: "website",
      locale: "en_US",
      title:
          "Website Designing & Development Company in India | Custom Web Solutions",
      description:
          "Looking for a website that converts? Get custom web design & development in Delhi NCR tailored to your brand, audience, and business goals.",
      siteName: "Ritz Media World",
  },
  robots: {
      index: true,
      follow: true,
  },
  alternates: {
      canonical: "https://ritzmediaworld.com/services/web-designing-and-development",
  },
};


export default function layout({
  children,
}: {    children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}