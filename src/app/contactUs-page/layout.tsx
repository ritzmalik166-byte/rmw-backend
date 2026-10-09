import "@/app/(rmw-v2)/styles/tailwind.css";
import "@/app/(rmw-v2)/styles/global.css";
import NewNavbar from "@/app/(rmw-v2)/layout/NewNavbar";

export default function ContactPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NewNavbar />
      {children}
    </>
  );
}