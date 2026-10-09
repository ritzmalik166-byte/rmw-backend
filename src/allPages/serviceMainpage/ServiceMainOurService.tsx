"use client"
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  link: string;
  translate: string;
}

const ServiceMainOurService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // ✅ Fetch API Data
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
        const data = response.data;
        if (data.success) {
          setServices(data.data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // ✅ Jab data load ho jaye tabhi event listener lagao
    if (services.length === 0) return;

    const hoverItems = document.querySelectorAll<HTMLElement>(".tp-hover__reveal-item");

    if (hoverItems.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      hoverItems.forEach((hoverItem) => {
        const itemRect = hoverItem.getBoundingClientRect();
        const x = e.clientX - itemRect.left;
        const y = e.clientY - itemRect.top;

        const revealChild = hoverItem.querySelector<HTMLElement>(".tp-hover__reveal-bg");
        if (revealChild) {
          revealChild.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    // ✅ Events ko naye elements pe lagao
    hoverItems.forEach((item) => {
      item.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      hoverItems.forEach((item) => {
        item.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, [services]); // ✅ Dependencies me services rakho taaki API call ke baad event reattach ho

  if (loading) return <Loader />;

  return (
    <div className="elementor-element elementor-element-9978344 e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="container">
        <h2 className="tp-section-title">
          OUR <span><i>SERVICE</i></span>
        </h2>

        <div className="tp-services__widget mb-85">
          {services.map((list, index) => (
            <div key={index} className="tp-services__item tp-hover__reveal-item">
              <Link href={`/services/${list.link}`} title={list.title} target="_self">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2">
                    <div className="tp-services__number">
                      <span className="tp-services__number-text">{`0${index + 1}`}</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-services__featured">
                      <h3 className="tp-services__tag">{list.title}</h3>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5">
                    <div className="tp-services__dsc">
                      <p>{list.description}</p>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2">
                    <div className="tp-services__action text-xl-end">
                      <div className="tp-services__button">
                        <span>
                          <svg
                            width="56"
                            height="28"
                            viewBox="0 0 56 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M55.2304 13.9101H0.360352M38.2384 0.45813C41.8964 13.9101 55.2304 14.0281 55.2304 14.0281C55.2304 14.0281 41.8964 14.1461 38.2384 27.5981"
                              stroke="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* ✅ Background Move Hoga */}
              <div
                className="tp-hover__reveal-bg"
                style={{
                  backgroundImage: `url(/services/${list.imgUrl})`,
                  transform: list.translate,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMainOurService;
