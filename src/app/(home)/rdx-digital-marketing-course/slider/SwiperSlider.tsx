import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";

interface DataItem {
  img: string;
  title: string;
  desc: string;
}

interface SwiperSliderProps {
  dt: DataItem[];
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ dt }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const styles = {
    body: {
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative",
    } as React.CSSProperties,

    swiper: {
      width: "100%",
      height: "502px",
    } as React.CSSProperties,

    card: {
      flex: "0 0 auto",
      width: "400px",
      height: "502px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "white",
      boxShadow: "4px 4px 10px rgba(0,0,0,0.102)",
    } as React.CSSProperties,

    btnWrapper: {
      width: "auto",
      maxWidth: "100%",
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "16px",
      alignSelf: "flex-end",
      zIndex: 10,
    } as React.CSSProperties,

    btnGroup: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      flexShrink: 0,
    } as React.CSSProperties,

    btnBase: {
      width: "63px",
      height: "62px",
      borderRadius: "50%",
      border: "1px solid #323232",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      background: "transparent",
    } as React.CSSProperties,

    btnNext: {
      backgroundColor: "#323232",
    } as React.CSSProperties,
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div style={styles.body}>
      <Swiper
        style={styles.swiper}
        slidesPerView="auto"
        loop
        spaceBetween={20}
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {dt.map((item, index) => (
          <SwiperSlide key={index} style={styles.card}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                title={item.title}
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <h3>{item.title}</h3>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#00000099",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons */}
      <div style={styles.btnWrapper}>
        <div style={styles.btnGroup}>
          <button style={styles.btnBase} onClick={handlePrev}>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
              <path
                d="M0.439339 10.9393C-0.146448 11.5251 -0.146448 12.4749 0.439339 13.0607L9.98528 22.6066C10.5711 23.1924 11.5208 23.1924 12.1066 22.6066C12.6924 22.0208 12.6924 21.0711 12.1066 20.4853L3.62132 12L12.1066 3.51472C12.6924 2.92893 12.6924 1.97919 12.1066 1.3934C11.5208 0.807611 10.5711 0.807611 9.98528 1.3934L0.439339 10.9393ZM31.5 12V10.5L1.5 10.5V12V13.5L31.5 13.5V12Z"
                fill="#323232"
              />
            </svg>
          </button>

          <button
            style={{ ...styles.btnBase, ...styles.btnNext }}
            onClick={handleNext}
          >
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
              <path
                d="M31.5607 10.9393C32.1464 11.5251 32.1464 12.4749 31.5607 13.0607L22.0147 22.6066C21.4289 23.1924 20.4792 23.1924 19.8934 22.6066C19.3076 22.0208 19.3076 21.0711 19.8934 20.4853L28.3787 12L19.8934 3.51472C19.3076 2.92893 19.3076 1.97919 19.8934 1.3934C20.4792 0.807611 21.4289 0.807611 22.0147 1.3934L31.5607 10.9393ZM0.5 12L0.5 10.5L30.5 10.5V12V13.5L0.5 13.5L0.5 12Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwiperSlider;
