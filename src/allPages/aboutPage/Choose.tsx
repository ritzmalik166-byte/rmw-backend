"use client" //changed
import Link from "next/link"
// changed
import { useSplitText } from "@/hooks/useSplitText";

const Choose = () => {

  const textRefs = useSplitText();

  return (
    <div className="elementor-widget-container">
    <section className="tp-chooseus__area fix tp-chooseus__1 p-relative section-bg tp-bg-className">
      <div
        className="tp-chooseus__bg-thumb d-none d-xl-block wow avtrix_clip_right"
        data-wow-delay=".3s"
        data-wow-duration="2.5s"
      >
        <div className="tp-chooseus__icon">
          <Link
            href="/service-details/"
            rel="nofollow"
            title="Why choose us"
            target="_self"
          >
            <span>
              <svg
                width="229"
                height="229"
                viewBox="0 0 229 229"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 224L211.25 17.75M5 4H225V224"
                  stroke="currentColor"
                  strokeWidth="6.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-7 offset-xl-5">
            <div className="tp-chooseus__wrap pt-100 pb-105">
              <div className="tp-chooseus__title-box mb-45">
                <span ref={(el) => { if (el) textRefs.current.push(el) }} className="tp-section-title-2-pre tp-split__text tp-split__in-right mb-15">
                  
                  Why choose us
                </span>
                <h3 ref={(el) => { if (el) textRefs.current.push(el) }} className="tp-section-title-2 tp-split__text tp-split__in-right mb-40">
                  We’re <span>Award</span>-Winning Development
                  <span>Agencies</span>
                </h3>
                <p>
                  
                  Whether it&apos;s crafting a visually stunning brand
                  identity Whether it&apos;s ns designing immersive
                  digital experiences, or developi crafting a
                  visually strategic marketing campaigns, we
                  approach stunning brand identity
                </p>
              </div>
              <div className="tp-progress__bar p-relative mb-60">
                <span>85%</span>
                <h5 className="tp-progress__bar-title">
                  Architecture Design
                </h5>
                <div className="progress">
                  <div
                    className="progress-bar"
                    //    style="width: 85%; visibility: visible; animation-duration: 1s; animation-delay: 1s; animation-name: slideInLeft;"
                  ></div>
                </div>
              </div>
              <div
                className="tp-chooseus__progress d-sm-flex align-items-center wow tpFadeInUp"
                data-wow-duration=".9s"
                data-wow-delay=".3s"
              >
                <div className="tp-progress__item">
                  <div className="tp-progress__canva">
                    <input
                      type="text"
                      className="knob"
                      value="0"
                      data-rel="80"
                      data-linecap="round"
                      data-width="130"
                      data-height="130"
                      data-bgcolor="#fff"
                      data-fgcolor="#8A5A0D"
                      data-thickness=".07"
                      data-readonly="true"
                      disabled
                    />
                  </div>
                  <div className="tp-progress__content">
                    <h4 className="tp-progress__title">
                      Business Consultant
                    </h4>
                  </div>
                </div>
                <div className="tp-progress__item">
                  <div className="tp-progress__canva">
                    <input
                      type="text"
                      className="knob"
                      value="0"
                      data-rel="80"
                      data-linecap="round"
                      data-width="130"
                      data-height="130"
                      data-bgcolor="#fff"
                      data-fgcolor="#8A5A0D"
                      data-thickness=".07"
                      data-readonly="true"
                      disabled
                    />
                  </div>
                  <div className="tp-progress__content">
                    <h4 className="tp-progress__title">
                      Business Consultant
                    </h4>
                  </div>
                </div>
                <div className="tp-progress__item">
                  <div className="tp-progress__canva">
                    <input
                      type="text"
                      className="knob"
                      value="0"
                      data-rel="80"
                      data-linecap="round"
                      data-width="130"
                      data-height="130"
                      data-bgcolor="#fff"
                      data-fgcolor="#8A5A0D"
                      data-thickness=".07"
                      data-readonly="true"
                      disabled
                    />
                  </div>
                  <div className="tp-progress__content">
                    <h4 className="tp-progress__title">
                      Business Consultant
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default Choose
