import React from "react";
import FlowingMenu from "./FlowingMenu";
function GSAPService() {
  const demoItems = [
    {
      id: 1,
      text: "DIGITAL_MARKETING",
      image: "https://picsum.photos/600/400?random=1",
      link: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
      id: 2,
      text: "CELEBRITY_ENDORSEMENTS",
      image: "https://picsum.photos/600/400?random=2",
      link: "https://ritzmediaworld.com/services/celebrity-endorsements",
    },
    {
      id: 3,
      text: "INFLUENCER_MARKETING",
      image: "https://picsum.photos/600/400?random=3",
      link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    },
    {
      id: 4,
      text: "PRINT_ADVERTISING",
      image: "https://picsum.photos/600/400?random=4",
      link: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
      id: 5,
      text: "RADIO_ADVERTISING",
      image: "https://picsum.photos/600/400?random=5",
      link: "https://ritzmediaworld.com/services/radio-advertising",
    },
    {
      id: 6,
      text: "CREATIVE_SERVICES",
      image: "https://picsum.photos/600/400?random=6",
      link: "https://ritzmediaworld.com/services/creative-services",
    },
    {
      id: 7,
      text: "WEB_DEVELOPMENT",
      image: "https://picsum.photos/600/400?random=7",
      link: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    {
      id: 8,
      text: "CONTENTS_MARKETING",
      image: "https://picsum.photos/600/400?random=8",
      link: " https://ritzmediaworld.com/services/contents-marketing",
    },
  ];

  return (
    <section style={{ height: "600px", position: "relative" }}>
      <FlowingMenu items={demoItems} />
    </section>
  );
}

export default GSAPService;
