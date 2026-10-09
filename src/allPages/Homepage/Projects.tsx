import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

interface Project {
  title: string;
  category: string;
  img: string;
  link: string;
  delay: string;
}

const projects: Project[] = [
  {
    title: "Brand Identity",
    category: "Brand Identity",
    img: "/home-images/home-project/Brand-Identity-610x600.png",
    link: "/services/creative-services/branding-and-identity-development",
    delay: ".1s",
  },
  {
    title: "Digital Advertising",
    category: "Digital Advertising",
    img: "/home-images/home-project/Digital-Advertising-610x600.png",
    link: "/services/digital-marketing",
    delay: ".3s",
  },
  {
    title: "Social Media",
    category: "Social Media",
    img: "/home-images/home-project/Social-Media-610x600.png",
    link: "/services/digital-marketing/social-media-management",
    delay: ".5s",
  },
  {
    title: "Print Advertising",
    category: "Print Advertising",
    img: "/home-images/home-project/Print-Advertising-610x600.png",
    link: "/services/print-advertising",
    delay: ".7s",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className="col-xl-6 col-lg-6 col-md-6 col-12 g-5"
  >
    <div
      className="tp-project__item p-relative wow tpFadeInUp"
      data-wow-duration=".9s"
      data-wow-delay={project.delay}
    >
      <div className="tp-project__thumb-content">
        <div className="tp-project__thumb">
          <div className={styles.ourPRCard}>
            <Image
              decoding="async"
              src={project.img}
              alt={project.title}
              fill
              quality={70}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="tp-project__icon">
            <Link href={project.link} title={project.title} target="_self">
              <span>
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 189 189"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 183L173.812 15.1875M6 4H185V183"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="tp-project__content"
        style={{ borderBottomRightRadius: "0px" }}
      >
        <h3 className="tp-project__title">
          <Link href={project.link} title={project.title} target="_self">
            {project.title}
          </Link>
        </h3>
        <span className="tp-project__categories">{project.category}</span>
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <div
      className="elementor-element elementor-element-acc9bc2 e-con-full e-flex e-con e-parent"
      data-id="acc9bc2"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-6f7d130 e-con-full e-flex e-con e-child"
        data-id="6f7d130"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-ae74e6f elementor-widget elementor-widget-projects"
          data-id="ae74e6f"
          data-element_type="widget"
          data-widget_type="projects.default"
        >
          <div className="elementor-widget-container">
            <div className="tp-project__area tp-project__1 p-relative tp-bg-class">
              <div className="tp-project__shape"></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-project__title-box">
                      <span
                        className="tp-section-title-pre mb-25"
                        style={{ borderRadius: "0px" }}
                      >
                        Created Projects
                      </span>
                      <div className="tp-section-title-wrap d-flex align-items-center justify-content-between">
                        <h1 className="tp-section-title mb-0">
                          Awesome Projects <br />
                          <span> From Team</span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ Optimized rendering */}
                <div className="tp-project__wrap">
                  <div className="row">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;