import Form from "./Contactpage/Form";
import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";

const Contact = () => {
  return (
    <section style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <PagesBanner
        headingTitle={"Contact Us"}
        videoURL={"/videos/bg_pattern.mp4"}
        mtP={"120px"}
        mtS={"100px"}
        sH={"10vh"}
      />
      <Form />
      <Footer />
    </section>
  );
};

export default Contact;
