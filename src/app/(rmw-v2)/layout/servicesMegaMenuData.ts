export type MegaMenuServiceLink = {
  title: string;
  description: string;
  href: string;
  /** Optional square image under /public */
  image?: string;
};

export type MegaMenuCategory = {
  id: string;
  name: string;
  href: string;
  services: MegaMenuServiceLink[];
};

export const SERVICES_MEGA_TAGLINE =
  "Complete Branding & Marketing Solutions Under One Roof!";

export const SERVICES_MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    services: [
      {
        title: "SEO (Search Engine Optimization)",
        description: "Boost organic visibility and traffic.",
        href: "/services/digital-marketing/search-engine-optimization-seo",
        image: "/navbar/seo.png",
      },
      {
        title: "ORM (Online Reputation Management)",
        description: "Protect and enhance brand reputation.",
        href: "/services/digital-marketing/orm-in-digital-marketing",
        image: "/navbar/orm.png",
      },
      {
        title: "PPC (Google Ads) Services",
        description: "Targeted campaigns with measurable results.",
        href: "/services/digital-marketing/ppc-google-ads-agency",
        image: "/navbar/ppc.png",
      },
      {
        title: "Lead Generation",
        description: "Attract, nurture, and convert leads.",
        href: "/services/digital-marketing/lead-generation",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Social Media Management",
        description: "Boost online visibility and engagement.",
        href: "/services/digital-marketing/social-media-management",
        image: "/navbar/social-media.png",
      },
      {
        title: "Brand Awareness",
        description: "Elevate recognition and customer loyalty.",
        href: "/services/digital-marketing/brand-awareness",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "creative-services",
    name: "Creative Services",
    href: "/services/creative-services",
    services: [
      {
        title: "Branding & Identity Development",
        description: "Define a memorable brand system and voice.",
        href: "/services/creative-services/branding-and-identity-development",
        image: "/navbar/creative-services/branding-identity-development.jpg",
      },
      {
        title: "Graphic Design",
        description: "Campaign-ready visuals across touchpoints.",
        href: "/services/creative-services/graphic-designing",
        image: "/navbar/creative-services/graphic-desinger.jpg",
      },
      {
        title: "Logo Design",
        description: "Distinct marks built for scale and recall.",
        href: "/services/creative-services/logo-design",
        image: "/navbar/creative-services/logo-design.jpg",
      },
      {
        title: "Print Advertising Design",
        description: "Layouts optimized for impact in print.",
        href: "/services/creative-services/print-advertisement-design",
        image: "/navbar/creative-services/print-advertising-design.jpg",
      },
      {
        title: "Packaging Design",
        description: "Shelf-ready packaging that tells your story.",
        href: "/services/creative-services/packaging-design",
        image: "/navbar/creative-services/packaging-design.jpg",
      },
    ],
  },
  {
    id: "print-advertising",
    name: "Print Advertising",
    href: "/services/print-advertising",
    services: [
      {
        title: "Advertisement Design",
        description: "High-impact creative for newspaper and magazine.",
        href: "/services/print-advertising/advertisement-designing",
        image: "/navbar/print-services/advertizement-design.jpg",

      },
      {
        title: "Ad Placement",
        description: "Strategic placement across premium publications.",
        href: "/services/print-advertising/ad-placements",
        image: "/navbar/print-services/ad-placement.jpg",
      },
      {
        title: "Copywriting",
        description: "Sharp copy that moves readers to act.",
        href: "/services/print-advertising/copywriting",
        image: "/navbar/print-services/copywriting.jpg",
      },
      {
        title: "Cost Negotiation",
        description: "Better rates through experienced media buying.",
        href: "/services/print-advertising/negotiating-rates",
        image: "/navbar/print-services/cost-negotiation.jpg",
      },
      {
        title: "Ad Size Optimization",
        description: "Formats tuned for visibility and budget.",
        href: "/services/print-advertising/ad-size-optimization",
        image: "/navbar/print-services/ad-size-optimization.jpg",
      },
      {
        title: "Ad Scheduling",
        description: "Timing that aligns with audience and news cycles.",
        href: "/services/print-advertising/advertisement-scheduling",
        image: "/navbar/print-services/ad-size-scheduling.jpg",
      },
    ],
  },
  {
    id: "radio-advertising",
    name: "Radio Advertising",
    href: "/services/radio-advertising",
    services: [
      {
        title: "Advertising Concept Development",
        description: "Ideas built for ear and memorability.",
        href: "/services/radio-advertising/advertisement-concept-development",
       image: "/navbar/radio-advertising/advertising-concept-development.jpg",
      },
      {
        title: "Scriptwriting",
        description: "Tight scripts for clarity and punch.",
        href: "/services/radio-advertising/scriptwriting",
        image: "/navbar/radio-advertising/scriptwriting.jpg",
      },
      {
        title: "Voiceover Casting",
        description: "The right voice for your brand tone.",
        href: "/services/radio-advertising/voiceover-casting",
        image: "/navbar/radio-advertising/voice-casting.jpg",
      },
      {
        title: "Recording & Production",
        description: "Broadcast-quality audio end to end.",
        href: "/services/radio-advertising/recording-and-production",
        image: "/navbar/radio-advertising/recording-production.jpg",
      },
      {
        title: "Media Planning And Buying",
        description: "Stations, spots, and schedules that deliver reach.",
        href: "/services/radio-advertising/media-planning-and-buying",
        image: "/navbar/radio-advertising/media-planning-buying.jpg",
      },
      {
        title: "Cost Negotiations",
        description: "Efficient spends across networks and markets.",
        href: "/services/radio-advertising/radio-cost-negotiation-india",
        image: "/navbar/radio-advertising/cost-negotiations.jpg",
      },
    ],
  },
  {
    id: "content-marketing",
    name: "Content Marketing",
    href: "/services/contents-marketing",
    services: [
      {
        title: "Customized Content Strategy",
        description: "Editorial plans mapped to funnel goals.",
        href: "/services/contents-marketing/customized-content-strategy",
        image: "/navbar/content-marketing/customized-content-strategy.jpg",
      },
      {
        title: "Email and Newsletters Marketing",
        description: "Lifecycle messaging that nurtures subscribers.",
        href: "/services/contents-marketing/email-and-newsletters-marketing",
        image: "/navbar/content-marketing/email-and-newsletters-marketing.jpg",
      },
      {
        title: "Asset Creation and Infographics",
        description: "Shareable assets that simplify complex ideas.",
        href: "/services/contents-marketing/asset-creation-and-infographics",
        image: "/navbar/content-marketing/asset-creation-infographics.jpg",
      },
      {
        title: "Content Promotion and Optimization",
        description: "Distribution and tuning for sustained performance.",
        href: "/services/contents-marketing/content-promotion-and-optimization",
        image: "/navbar/content-marketing/content-promotion-optimization.jpg",
      },
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    href: "/services/web-designing-and-development",
    services: [
      {
        title: "UI/UX Design",
        description: "Interfaces focused on clarity and conversion.",
        href: "/services/web-designing-and-development/ui-ux-design",
        image: "/navbar/web-development/uiux-design.jpg",
      },
      {
        title: "Custom Design & Development",
        description: "Tailored builds for speed and scalability.",
        href: "/services/web-designing-and-development/custom-design-development",
        image: "/navbar/web-development/custom-design-development.jpg",
      },
      {
        title: "E-Commerce Website Development",
        description: "Stores engineered for trust and checkout.",
        href: "/services/web-designing-and-development/e-commerce-web-designing",
        image: "/navbar/web-development/ecommerce-website-development.jpg",
      },
      {
        title: "Landing Page Development",
        description: "Focused pages for campaigns and lead capture.",
        href: "/services/web-designing-and-development/landing-page-development-services",
        image: "/navbar/web-development/landing-page-development.jpg",
      },
      {
        title: "WordPress Web Design",
        description: "Flexible CMS sites with clean, maintainable code.",
        href: "/services/web-designing-and-development/wordpress-web-designing",
        image: "/navbar/web-development/wordpress-web-design.jpg",
      },
    ],
  },
  {
    id: "celebrity-endorsements",
    name: "Celebrity Endorsements",
    href: "/services/celebrity-endorsements",
    services: [
      {
        title: "Celebrity Identification",
        description: "Shortlist talent aligned with brand and audience.",
        href: "/services/celebrity-endorsements/celebrity-identification-services",
        image: "/navbar/celebrity-endorsements/celebirty-identification.jpg",
      },
      {
        title: "Contract Negotiations",
        description: "Structured deals with clear deliverables.",
        href: "/services/celebrity-endorsements/negotiating-contracts",
        image: "/navbar/celebrity-endorsements/contract-negotiations.jpg",
      },
      {
        title: "Creative Collaboration",
        description: "Campaigns that feel authentic to both sides.",
        href: "/services/celebrity-endorsements/creative-collaboration",
        image: "/navbar/celebrity-endorsements/creative-collaboration.jpg",
      },
      {
        title: "Campaign Integration",
        description: "Unified rollout across channels and assets.",
        href: "/services/celebrity-endorsements/campaign-integration",
        image: "/navbar/celebrity-endorsements/compaign-integration.jpg",
      },
      {
        title: "Public Relations",
        description: "Narrative and visibility around partnerships.",
        href: "/services/celebrity-endorsements/public-relations",
        image: "/navbar/celebrity-endorsements/public-relations.jpg",
      },
      {
        title: "Legal Compliance",
        description: "Guardrails for claims, usage, and disclosures.",
        href: "/services/celebrity-endorsements/legal-compliance",
        image: "/navbar/celebrity-endorsements/legal-compliance.jpg",
      },
    ],
  },
  {
    id: "influencer-marketing",
    name: "Influencer Marketing",
    href: "/services/influencer-marketing-agency-in-india",
    services: [
      {
        title: "Influencer Identification",
        description: "Vetted creators matched to KPIs and audience.",
        href: "/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency",
        image: "/navbar/influender-marketing/influencer-identification.jpg",
      },
      {
        title: "Cost-Benefit Analysis",
        description: "Transparent modeling before you commit.",
        href: "/services/influencer-marketing-agency-in-india/cost-benefit-analysis",
        image: "/navbar/influender-marketing/cost-benefit-analysis.jpg",
      },
      {
        title: "Terms Negotiations",
        description: "Scopes, timelines, and usage that protect you.",
        href: "/services/influencer-marketing-agency-in-india/terms-negotiations",
        image: "/navbar/influender-marketing/terms-negotiations.jpg",
      },
      {
        title: "Creative Collaboration",
        description: "Briefs that inspire on-brand creator content.",
        href: "/services/influencer-marketing-agency-in-india/creative-collaboration",
        image: "/navbar/influender-marketing/creative-collaboration.jpg",
      },
      {
        title: "Campaign Integration",
        description: "Amplify creator work across paid and owned.",
        href: "/services/influencer-marketing-agency-in-india/campaign-integration",
        image: "/navbar/influender-marketing/compaign-integration.jpg",
      },
      {
        title: "Messaging Optimization",
        description: "Iterate creative for stronger engagement.",
        href: "/services/influencer-marketing-agency-in-india/messaging-optimization",
        image: "/navbar/influender-marketing/messaging-optimization.jpg",
      },
    ],
  },
  {
    id: "3d-rendering-services",
    name: "3D Rendering Services",
    href: "/services/3d-rendering-services",
    services: [
      {
        title: "3D Exterior Rendering",
        description:
          "Photorealistic building exteriors, landscaping, and surroundings.",
        href: "/services/3d-rendering-services/3d-exterior-rendering",
        image: "/services/3drendring/3d1.png",
      },
      {
        title: "3D Interior Rendering",
        description:
          "Luxury interiors with lighting, materials, and furnished layouts.",
        href: "/services/3d-rendering-services/3d-interior-rendering",
        image: "/services/3drendring/interior.png",
      },
      {
        title: "Aerial & Township",
        description:
          "Master plans and bird's-eye views for large-scale developments.",
        href: "/services/3d-rendering-services/aerial-township",
        image: "/services/3drendring/3d3.png",
      },
      {
        title: "3D Floor Plan Rendering",
        description: "Clear furnished layouts that simplify unit planning.",
        href: "/services/3d-rendering-services/3d-floor-plan-rendering",
        image: "/services/3drendring/3d4.png",
      },
      {
        title: "Amenity & Landscape Rendering",
        description:
          "Clubhouses, pools, gardens, and lifestyle amenities visualized.",
        href: "/services/3d-rendering-services/amenity-landscape-rendering",
        image: "/services/3drendring/3d5.png",
      },
    ],
  },
  // {
  //   id: "real-estate-walkthrough",
  //   name: "Real Estate Walkthrough",
  //   href: "/services/real-estate-walkthrough",
  //   services: [],
    // services: [
    //   {
    //     title: "3D Architectural Walkthrough Animation",
    //     description: "Cinematic tours from exterior through lobbies and units.",
    //     href: "/services/real-estate-walkthrough",
    //     image: "/varun.icon/real.svg",
    //   },
    //   {
    //     title: "360° Virtual Property Tour",
    //     description: "Interactive tours buyers can explore at their own pace.",
    //     href: "/services/real-estate-walkthrough",
    //     image: "/varun.icon/real.svg",
    //   },
    //   {
    //     title: "3D Aerial Flythrough Animation",
    //     description: "Bird's-eye flyovers that showcase scale and surroundings.",
    //     href: "/services/real-estate-walkthrough",
    //     image: "/varun.icon/real.svg",
    //   },
    //   {
    //     title: "Interior Walkthrough Animation",
    //     description: "Room-by-room interior tours with photoreal detail.",
    //     href: "/services/real-estate-walkthrough",
    //     image: "/varun.icon/real.svg",
    //   },
    //   {
    //     title: "VR Walkthrough Experience",
    //     description: "Immersive VR property experiences for remote buyers.",
    //     href: "/services/real-estate-walkthrough",
    //     image: "/varun.icon/real.svg",
    //   },
    // ],
  // },

];
