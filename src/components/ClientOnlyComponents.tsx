"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatBoat = dynamic(() => import("@/components/chat/ChatBoat"), { ssr: false });
const ServicesBoat = dynamic(() => import("@/components/servicesBoat/ServicesBoat"), { ssr: false });
const WhatsAppFloatingButton = dynamic(
  () => import("@/components/whats-app/WhatsAppFloatingButton"),
  { ssr: false }
);
const Button = dynamic(() => import("@/components/sideButton/sideButton"), { ssr: false });

export default function ClientOnlyComponents() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Defer rendering of these components until after initial load
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <WhatsAppFloatingButton />
      <ChatBoat />
      {/* <ServicesBoat /> */}
      <Button />
    </>
  );
}
