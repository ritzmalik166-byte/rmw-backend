import Image from "next/image";

export default function ServiceCategory() {
    return (
        <section className="w-full bg-white px-4 pb-6 pt-2 md:px-5 md:pb-[30px] md:pt-3 lg:px-8 lg:pb-9 lg:pt-4 xxl:px-0">
            <div className="relative mx-auto w-full max-w-[1366px] aspect-[2048/456]">
                <Image
                    src="/contact/service-category.png"
                    alt="Service category highlights"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 767px) 100vw, (max-width: 1366px) 95vw, 1366px"
                />
            </div>
        </section>
    );
}
