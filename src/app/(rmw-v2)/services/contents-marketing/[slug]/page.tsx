import ServiceInner from "@/components/slug/ServiceInner";
async function Page({params}: {params: {slug: string}}) {
    const {slug} = await params;
    return (
        <>
            <ServiceInner slug={slug as string} parentServiceLink="contents-marketing" />
        </>
    )
}

export default Page;