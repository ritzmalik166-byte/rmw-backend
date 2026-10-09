import Image from "next/image";

type ProcessStep = {
  title: string;
  description: string;
  icon?: string;
};

const steps: ProcessStep[] = [
  {
    title: "Brief & Files",
    description:
      "Share floor plans, elevations, site plans, and design references with our team.",
    icon: "/services/3drendring/processicon/step1.png",
  },
  {
    title: "3D Modelling",
    description:
      "Our architects and 3D artists build a precise digital model of your project.",
    icon: "/services/3drendring/processicon/step2.png",
  },
  {
    title: "Lighting & Textures",
    description:
      "Photo-real materials, lighting, and environment are applied to bring depth and realism.",
    icon: "/services/3drendring/processicon/step3.png",
  },
  {
    title: "Draft Review",
    description:
      "You review draft renders and share feedback, unlimited revisions until you're satisfied.",
    icon: "/services/3drendring/processicon/step4.png",
  },
  {
    title: "Final Delivery",
    description:
      "High-resolution renders delivered in print-ready and digital formats, ready for your campaign.",
    icon: "/services/3drendring/processicon/step5.png",
  },
];

function StepIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
      <Image src={src} alt={alt} title={alt} width={70} height={70} className="object-contain" />
    </div>
  );
}

function StepText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-[30px] text-center">
      <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-[15px] sm:leading-7">
        {description}
      </p>
    </div>
  );
}

export default function Process3D() {
  return (
    <section className="overflow-hidden bg-[#08124B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center md:mb-20">
          <h2 className="text-3xl font-semibold text-white md:text-5xl">
            Our 3D Rendering Process
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            A transparent, collaborative workflow from brief to final delivery , so you always
            know exactly where your project stands
          </p>
        </div>

        <div className="relative min-h-0 lg:min-h-[400px] xl:min-h-[420px]">
          <div
            className="pointer-events-none absolute inset-x-0 z-0 hidden lg:block"
            aria-hidden
          >
            <img
              src="/services/3drendring/processicon/backgournd.png"
              alt="3D rendering process background"
              title="3D rendering process background"
              className="h-[330px] w-full object-fill"
            />
            <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white" />
            <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white" />
          </div>

          <div className="relative z-10 flex flex-col items-center lg:grid lg:grid-cols-5">
            {steps.map((step, index) => {
              const isValley = index % 2 === 1;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.title}
                  className={`relative flex w-full flex-col items-center text-center lg:px-3 ${
                    isValley ? "lg:flex-col" : "lg:pt-10"
                  }`}
                >
                  <span
                    className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white lg:hidden"
                    aria-hidden
                  />

                  {!isValley && step.icon && (
                    <div className="mb-0 hidden lg:block">
                      <StepIcon src={step.icon} alt={step.title} />
                    </div>
                  )}

                  <div
                    className={`relative z-10 w-full rounded-2xl border border-white/20 px-5 py-8 lg:border-0 lg:px-0 lg:py-0 ${
                      isValley ? (step.icon ? "lg:mb-6 lg:mt-4" : "") : "lg:mt-5"
                    }`}
                  >
                    {step.icon && (
                      <div className="mb-5 flex justify-center lg:hidden">
                        <StepIcon src={step.icon} alt={step.title} />
                      </div>
                    )}
                    <StepText title={step.title} description={step.description} />
                  </div>

                  {isValley && step.icon && (
                    <div className="hidden lg:block">
                      <StepIcon src={step.icon} alt={step.title} />
                    </div>
                  )}

                  {!isLast && <div className="h-12 w-px bg-white/20 lg:hidden" aria-hidden />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
