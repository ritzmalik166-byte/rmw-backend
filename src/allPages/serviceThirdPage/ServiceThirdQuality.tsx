import Image from "next/image";
import styles from "./serviceThirdQuality.module.css";

interface CardData {
  title: string;
  description: string;
  image_url?: string;
}

interface ServiceThirdQualityProps {
  cardData: CardData[];
}

const ServiceThirdQuality: React.FC<ServiceThirdQualityProps> = ({
  cardData,
}) => {
  return (
    <div
      className="elementor-element elementor-element-3205e74 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="3205e74"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-27c6b78 e-con-full e-flex e-con e-child"
        data-id="27c6b78"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-66ba328 elementor-widget elementor-widget-services"
          data-id="66ba328"
          data-element_type="widget"
          data-widget_type="services.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-service__3-area fix tp-services__3-style p-relative tp-bg-className">
              <div className="container">
                <div className="tp-services__2-title-wrap">
                  <div className="row align-items-center">
                    <div className="">
                      <div className="tp-services__3-title-box">
                        <div className="tp-section-title-wrap">
                          <h2
                            className="tp-section-title"
                            // style={{color:'red'}}
                          >
                            Committed For Deliver <span>Top</span> Quality
                            <span> Services</span>
                          </h2>
                        </div>
                      </div>
                      <div className={`${styles.serviceCardsMain}`}>
                        {cardData.map((card, index) => (
                          <div
                            key={card.title}
                            className={`${styles.serviceCard} ${
                              index % 2 === 0 ? styles.row : styles.rowReverse
                            }`}
                          >
                            <Image
                              height={450}
                              width={450}
                              src={`/${card.image_url}`}
                              alt={card.title}
                              style={{
                                objectFit: "contain",
                                borderRadius: "10px",
                              }}
                            />

                            <div
                              className={styles.serviceContent}
                              style={{
                                padding: "10px",
                                flex: 1,
                                lineHeight: "1.6",
                                fontWeight: "500",
                                textAlign: "center",
                              }}
                            >
                              <h3
                                style={{
                                  color: "#390350",
                                  marginBottom: "10px",
                                }}
                              >
                                {card.title}
                              </h3>
                              <p style={{ color: "black" }}>
                                {card.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="services"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceThirdQuality;
