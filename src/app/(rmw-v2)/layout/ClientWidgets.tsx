"use client";

import dynamic from "next/dynamic";

const ContactBtns = dynamic(() => import("../new-home/components/ContactBtns"), {
  ssr: false,
});

const RubyBot = dynamic(() => import("@/components/ruby-bot/RubyBot"), {
  ssr: false,
});

export default function ClientWidgets() {
  return (
    <>
      <ContactBtns />
      <RubyBot />
    </>
  );
}
