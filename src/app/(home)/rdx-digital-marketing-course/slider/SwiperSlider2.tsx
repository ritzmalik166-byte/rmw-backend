import React from "react";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SlideData {
  img: string;
  alt: string;
  title: string;
}

interface Props {
  dataArray: SlideData[];
}
export default function SwiperSlider2({ dataArray }: Props) {
 
  // Inline styles (CSS converted to TSX objects)
  const styles = {
    root: {
      height: "100%",
    },
    body: {
      background: "#000",
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      fontSize: "14px",
      color: "#fff",
      margin: 0,
      padding: 0,
    },
    swiper: {
      width: "100%",
      margin: "20px auto",
    },
    swiperSlide: {
      textAlign: "center" as const,
      fontSize: "18px",
      background: "#444",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    s9Card: {
      width: "400px",
      height: "307px",
      borderRadius: "20px",
      backgroundColor: "white",
      position: "relative" as const,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      border: "1px solid #aeaeae",
      textAlign: "center" as const,
    },
    s9CardImage: {
      width: "100px",
      height: "100px",
    },
    s9CardTitle: {
      fontSize: "28px",
      color: "#000",
    },
  };

  return (
    <div style={styles.root}>
   <Swiper
  modules={[Virtual, Navigation]}
  loop={true}
  slidesPerView={3}
  centeredSlides={true}
  spaceBetween={30}
  pagination={{ type: "fraction" }}
  navigation={true}
  virtual
  style={styles.swiper}
  breakpoints={{
    0: {
      slidesPerView: 1, // Mobile
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2, // Tablet
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3, // Desktop
      spaceBetween: 30,
    },
  }}
>
  {dataArray.map((slide, index) => (
    <SwiperSlide key={index} virtualIndex={index}>
      <div style={styles.s9Card}>
        <img src={slide.img} alt={slide.alt} title={slide.title} style={styles.s9CardImage} />
        <h3 style={styles.s9CardTitle}>{slide.title}</h3>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
}
