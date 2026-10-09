import Image from "next/image";
import styles from "./our-process.module.css";

const STEPS = [
  {
    id: "01",
    title: "Project Brief & File Collection",
    description:
      "You share your floor plans, elevation drawings, site plans, material palettes, and any brand references or mood boards. Our team reviews everything and aligns on scope, style, and timeline before any work begins.",
    layout: "leftMiddle",
    align: "right",
  },
  {
    id: "02",
    title: "3D Modelling & Scene Building",
    description:
      "Our architects and 3D artists construct a precise digital model of your project building mass, interiors, landscape, site surroundings, and all key amenity areas.",
    layout: "topLeft",
    align: "right",
  },
  {
    id: "03",
    title: "Camera Path & Storyboard",
    description:
      "We plan the walkthrough's camera journey, the sequence of spaces, entry points, key views, and transitions and share a storyboard for your approval before animation begins.",
    layout: "top",
    align: "center",
  },
  {
    id: "04",
    title: "Animation, Lighting & Rendering",
    description:
      "Photo-real materials, day-lighting, landscape animation, and ambient sound are applied. The full walkthrough is rendered frame by frame at 4K resolution for cinematic quality output.",
    layout: "topRight",
    align: "left",
  },
  {
    id: "05",
    title: "Review, Revisions & Final Delivery",
    description:
      "You review a draft cut and share feedback. We apply revisions until you're fully satisfied, then deliver the final walkthrough in all formats needed : MP4, web-ready, social media cuts, and VR-ready if applicable.",
    layout: "rightMiddle",
    align: "left",
  },
];

const LAYOUT_CLASS = {
  leftMiddle: `${styles.step} ${styles.stepLeftMiddle} ${styles.stepRightAlign}`,
  topLeft: `${styles.step} ${styles.stepTopLeft} ${styles.stepRightAlign}`,
  top: `${styles.step} ${styles.stepTop} ${styles.stepCenterAlign}`,
  topRight: `${styles.step} ${styles.stepTopRight} ${styles.stepLeftAlign}`,
  rightMiddle: `${styles.step} ${styles.stepRightMiddle} ${styles.stepLeftAlign}`,
};

function StepCard({ step, className }) {
  const numberEl = (
    <span className={styles.stepNum} aria-hidden>
      {step.id}
    </span>
  );

  const contentEl = (
    <div className={styles.stepContent}>
      <h3 id={`process-step-${step.id}`} className={styles.stepTitle}>
        {step.title}
      </h3>
      <p className={styles.stepDesc}>{step.description}</p>
    </div>
  );

  return (
    <article className={className} aria-labelledby={`process-step-${step.id}`}>
      {step.align === "right" ? (
        <>
          {contentEl}
          {numberEl}
        </>
      ) : step.align === "center" ? (
        <>
          {numberEl}
          {contentEl}
        </>
      ) : (
        <>
          {numberEl}
          {contentEl}
        </>
      )}
    </article>
  );
}

function OurProcess() {
  return (
    <section className={styles.section} aria-labelledby="our-process-heading">
      <div className={styles.bgWrap} aria-hidden>
        <Image
          src="/services/walkthrough/our-process-bg.jpg"
          alt="Background illustration for real estate walkthrough creation process"
          title="How we create your walkthrough – Ritz Media World"
          fill
          priority={false}
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.contentWrap}>
        <h2 id="our-process-heading" className={styles.srOnly}>
          How We Create Your Walkthrough
        </h2>

        {/* Mobile & tablet */}
        <div className={styles.mobileWrap}>
          <header className={styles.mobileHeader}>
            <div className={styles.mobileBadge} aria-hidden>
              <span className={styles.mobileBadgeLine1}>OUR</span>
              <span className={styles.mobileBadgeLine2}>PROCESS</span>
            </div>
            <p className={styles.mobileHeading} aria-hidden="true">
              How We Create Your Walkthrough
            </p>
            <p className={styles.mobileDescription}>
              A structured, collaborative process that takes your project from
              blueprints to a cinematic walkthrough : on time and on brief.
            </p>
          </header>

          <ol className={styles.mobileSteps}>
            {STEPS.map((step) => (
              <li key={step.id} className={styles.mobileStep}>
                <span className={styles.mobileStepNum} aria-hidden>
                  {step.id}
                </span>
                <div className={styles.mobileStepBody}>
                  <h3 className={styles.mobileStepTitle}>{step.title}</h3>
                  <p className={styles.mobileStepDesc}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop — 1300×680 design, scales with container width */}
        <div className={styles.inner}>
          <div className={styles.stage}>
            <div className={styles.stageCanvas}>
              <svg
                className={styles.connectors}
                viewBox="0 0 1300 680"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <line
                  className={styles.connectorLine}
                  x1="357"
                  y1="500"
                  x2="463"
                  y2="500"
                />
                <line
                  className={styles.connectorLine}
                  x1="437"
                  y1="390"
                  x2="543"
                  y2="390"
                />
                <line
                  className={styles.connectorLine}
                  x1="650"
                  y1="259"
                  x2="650"
                  y2="360"
                />
                <line
                  className={styles.connectorLine}
                  x1="863"
                  y1="390"
                  x2="757"
                  y2="390"
                />
                <line
                  className={styles.connectorLine}
                  x1="950"
                  y1="500"
                  x2="844"
                  y2="500"
                />
              </svg>

              <div className={styles.desktopSteps}>
                {STEPS.map((step) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    className={LAYOUT_CLASS[step.layout]}
                  />
                ))}
              </div>

              <div className={styles.hubWrap}>
                <div className={styles.hubClip}>
                  <div className={styles.hubCircle}>
                    <div className={styles.hubText}>
                      <h2 className={styles.heading} aria-hidden="true">
                        How We Create
                        <br />
                        Your Walkthrough
                      </h2>
                      <p className={styles.description}>
                        A structured, collaborative process that takes your
                        project from blueprints to a cinematic walkthrough :
                        on time and on brief.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeLine1}>OUR</span>
                  <span className={styles.badgeLine2}>PROCESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.whiteBar} aria-hidden />
    </section>
  );
}

export default OurProcess;
