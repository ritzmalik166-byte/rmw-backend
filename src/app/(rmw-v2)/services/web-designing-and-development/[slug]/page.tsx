import ServiceInner from "@/components/slug/ServiceInner";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ServiceInner
      slug={slug}
      parentServiceLink="web-designing-and-development"
    />
  );
}

export default Page;
