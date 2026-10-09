

"use client";

import { useState } from "react";

export default function CareersOpening() {
  const careersData = {
    sectionTitle: "Current Openings",

    jobs: [
      {
        id: 1,
        title: "Videographer Intern",
        type: "Internship",
        experience: "0–3 months",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a creative Videographer Intern to assist in producing videos for our digital marketing campaigns. The intern will support filming, editing, and content creation under the guidance of senior videographers."
        ],
        requirements: [
          "Pursuing or completed a degree in Film or Mass Communication",
          "Basic knowledge of camera operation and video composition",
          "Familiarity with video editing software is a plus",
          "Portfolio or showreel (college projects accepted)"
        ],
        responsibilities: [
          "Assist in shooting video content for advertisements, reels, and client projects",
          "Collaborate with senior videographers on camera, lighting, and audio setups",
          "Edit videos at a beginner level using Adobe Premiere Pro or DaVinci Resolve",
          "Organize and manage raw video and project files"
        ],
        applyLink: "#"
      },
      {
        id: 2,
        title: "Customer Relationship Executive",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for an energetic Customer Relationship Executive to manage client communications and ensure satisfaction. The role involves maintaining strong client relations and supporting the sales and marketing teams."
        ],
        requirements: [
          "Bachelor's degree in Business, Marketing, or Mass Communication",
          "1–3 years in client servicing or account management (agency experience preferred)",
          "Excellent verbal and written communication in Hindi and English",
          "Proficiency in MS Office and CRM tools"
        ],
        responsibilities: [
          "Serve as the primary point of contact for assigned clients",
          "Translate client briefs into actionable tasks for internal teams",
          "Prepare and present campaign updates and performance reports",
          "Handle client feedback and escalations professionally"
        ],
        applyLink: "#"
      },
      {
        id: 3,
        title: "Social Media Executive",
        type: "Full-Time",
        experience: "1–2 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a talented Social Media Executive to manage social media marketing, content creation, and brand building online. The role includes managing channels, developing posts, and engaging with audiences."
        ],
        requirements: [
          "Bachelor's in Marketing, Mass Communication, or related field",
          "1–2 years of experience in social media management (agency experience preferred)",
          "Familiarity with Meta Ads Manager and analytics tools",
          "Strong copywriting skills and a good eye for visual content"
        ],
        responsibilities: [
          "Plan and execute content calendars for multiple brands on Instagram, Facebook, LinkedIn, and YouTube",
          "Write captions, hashtags, and CTAs aligned with brand voice",
          "Monitor engagement, respond to comments, and manage community interactions",
          "Track performance metrics and prepare monthly reports"
        ],
        applyLink: "#"
      },
      {
        id: 4,
        title: "Junior HR Executive",
        type: "Full-Time",
        experience: "0–2 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking an organized and proactive Junior HR Executive to assist with hiring, employee engagement, and HR operations. The role involves maintaining records, coordinating processes, and supporting HR initiatives."
        ],
        requirements: [
          "Bachelor's in HR, Business Administration, or related field",
          "0–2 years of HR experience (strong interns welcome)",
          "Proficient in MS Office and HR tools",
          "Highly organized with excellent communication skills"
        ],
        responsibilities: [
          "Source, screen, and schedule candidates across departments",
          "Coordinate onboarding, documentation, and orientation for new hires",
          "Maintain employee records, attendance, and HR databases",
          "Assist in payroll, leave management, and engagement activities"
        ],
        applyLink: "#"
      },
      {
        id: 5,
        title: "AI Manager",
        type: "Full-Time",
        experience: "3–6 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for an experienced AI Manager to lead AI strategy, machine learning, and automation projects. The role includes developing AI solutions and collaborating with teams to implement innovative business tools."
        ],
        requirements: [
          "Degree in Computer Science, AI, Data Science, or related field",
          "3–6 years working with AI platforms (marketing/media context preferred)",
          "Hands-on experience with ChatGPT, Claude, Midjourney, Runway, and LLM APIs",
          "Ability to communicate AI concepts to non-technical stakeholders"
        ],
        responsibilities: [
          "Lead AI tool integration across creative, content, digital, and analytics teams",
          "Evaluate and onboard third-party AI platforms suited for agency workflows",
          "Train internal teams on AI tools, prompts, and best practices",
          "Develop AI governance policies and measure efficiency ROI"
        ],
        applyLink: "#"
      },
      {
        id: 6,
        title: "Brand Content Writer",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a talented Brand Content Writer to craft compelling content, brand stories, and SEO-optimized copy. The role includes writing blog posts, website copy, and marketing materials while maintaining brand consistency."
        ],
        requirements: [
          "Bachelor's in English, Journalism, Mass Communication, or Marketing",
          "2–4 years of experience in brand/content writing, preferably in an agency",
          "Exceptional storytelling and narrative skills in English",
          "Working knowledge of SEO principles and content tools"
        ],
        responsibilities: [
          "Write blog posts, brand stories, website copy, and thought leadership pieces for client brands",
          "Research industries and target audiences to produce insight-driven content",
          "Ensure all content is SEO-optimized while maintaining brand voice",
          "Review and edit content from junior writers"
        ],
        applyLink: "#"
      },
      {
        id: 7,
        title: "Content Copywriter",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a Content Copywriter to create unique, SEO-focused marketing copy for websites, advertisements, and social media campaigns."
        ],
        requirements: [
          "Bachelor's in Mass Communication, English, or Advertising",
          "Strong bilingual skills (English and Hindi copywriting)",
          "Portfolio showcasing multi-format copy across industries"
        ],
        responsibilities: [
          "Write ad copy for Google Ads, Meta Ads, and LinkedIn campaigns",
          "Develop taglines, headlines, and slogans for print, outdoor, and radio",
          "Craft landing page copy, email campaigns, and video/reel scripts",
          "Collaborate with designers and art directors to align copy with visuals"
        ],
        applyLink: "#"
      },
      {
        id: 8,
        title: "Video Journalist",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a dynamic Video Journalist to produce news videos, digital content, and visual storytelling. The role involves shooting, reporting, editing, and creating content for social media and digital platforms."
        ],
        requirements: [
          "Bachelor's in Journalism or Mass Communication",
          "Confident, engaging on-camera presence",
          "Strong scriptwriting and solo production capabilities"
        ],
        responsibilities: [
          "Research and develop video story ideas aligned with brand objectives",
          "Present, interview, and report on-camera across multiple formats",
          "Independently operate cameras, lighting, and audio equipment",
          "Edit final video content using Premiere Pro or Final Cut Pro"
        ],
        applyLink: "#"
      },
      {
        id: 9,
        title: "Podcast Producer",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a creative Podcast Producer to manage podcast production, audio recording, and content strategy. This role involves planning, editing, publishing episodes, and ensuring high-quality audio content for audience engagement."
        ],
        requirements: [
          "Bachelor's in Mass Communication or Audio Production",
          "Proficiency in Adobe Audition, GarageBand, or Audacity",
          "Experience with Riverside.fm or Zencastr for remote recording"
        ],
        responsibilities: [
          "Develop podcast concepts, episode formats, and content arcs for client brands",
          "Book guests, prepare briefs, and manage pre-show logistics",
          "Record, edit, and produce episodes including music and sound design",
          "Distribute episodes across Spotify, Apple Podcasts, YouTube, and other platforms"
        ],
        applyLink: "#"
      },
      {
        id: 10,
        title: "Creative Director – Real Estate",
        type: "Full-Time",
        experience: "6–10 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are searching for a Creative Director – Real Estate to lead brand strategy, marketing campaigns, and high-impact creative concepts. This role oversees content, design, and campaigns for property marketing and brand positioning."
        ],
        requirements: [
          "Degree in Design, Advertising, Architecture, or Mass Communication",
          "Strong portfolio of property campaigns across luxury, mid-segment, and commercial projects",
          "Expert in Adobe Creative Suite with proven team leadership experience",
          "Deep understanding of the Delhi NCR real estate market"
        ],
        responsibilities: [
          "Lead creative strategy for all real estate campaigns across digital, print, and video",
          "Develop integrated concepts for property launches and brand identity",
          "Direct and mentor a team of designers, copywriters, and videographers",
          "Present and pitch creative ideas confidently to senior client stakeholders"
        ],
        applyLink: "#"
      },
      {
        id: 11,
        title: "AI/ML Engineer",
        type: "Full-Time",
        experience: "2–5 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a sharp, curious AI/ML Engineer to build intelligent systems for smarter digital marketing campaigns, workflow automation, and data-driven insights for clients and internal teams."
        ],
        requirements: [
          "Proficiency in Python, TensorFlow, PyTorch, and Scikit-learn",
          "Strong understanding of NLP, deep learning, and data pipelines",
          "Experience with cloud platforms: AWS, GCP, or Azure",
          "Familiarity with marketing data, ad tech, or media industry is a plus"
        ],
        responsibilities: [
          "Design, develop, and deploy machine learning models for marketing automation, audience segmentation, and predictive analytics",
          "Build and maintain AI-powered tools for content generation, campaign optimization, and performance forecasting",
          "Collaborate with digital marketing and data teams to monitor model performance and retrain models as needed",
          "Research and implement advancements in generative AI, NLP, and computer vision for advertising",
          "Integrate ML solutions into live workflows"
        ],
        applyLink: "#"
      },
      {
        id: 12,
        title: "Ad Sales Executive",
        type: "Full-Time",
        experience: "1–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a driven Ad Sales Executive to grow our client base by selling digital and print advertising solutions to brands, businesses, and media buyers across Delhi NCR."
        ],
        requirements: [
          "Strong communication, negotiation, and presentation skills",
          "Understanding of digital advertising formats: display, social, search, and programmatic",
          "Existing network of brand or agency contacts is an advantage",
          "Self-motivated with a target-driven mindset"
        ],
        responsibilities: [
          "Identify, prospect, and pitch advertising solutions to clients across digital, print, and radio",
          "Build and maintain relationships with brand managers, marketing heads, and media planners",
          "Meet and exceed monthly and quarterly revenue targets",
          "Prepare customized advertising proposals, media plans, and presentations",
          "Coordinate with creative and strategy teams for seamless campaign execution"
        ],
        applyLink: "#"
      },
      {
        id: 13,
        title: "Motion Illustrator / 2D Animator",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a talented Motion Illustrator / 2D Animator to bring brand stories to life through visually compelling animations for social media, digital ads, explainer videos, and brand campaigns."
        ],
        requirements: [
          "Proficiency in Adobe After Effects, Illustrator, Animate, and Premiere Pro",
          "Strong illustration skills with a distinctive visual style",
          "Portfolio demonstrating diverse animation styles and storytelling ability",
          "Experience with social media content formats preferred"
        ],
        responsibilities: [
          "Conceptualize and produce high-quality 2D animations and motion graphics",
          "Collaborate with creative and content teams on storyboards and visual narratives",
          "Create frame-by-frame animations, character animations, and kinetic typography",
          "Deliver assets across multiple formats: Reels, YouTube, digital ads, and website banners",
          "Maintain brand consistency and visual quality"
        ],
        applyLink: "#"
      },
      {
        id: 14,
        title: "Lead – 3D Visualisation & CAD",
        type: "Full-Time",
        experience: "4–7 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring an experienced Lead for 3D Visualisation & CAD to head our visualisation practice, delivering photorealistic renders, walkthroughs, and technical drawings for real estate and architecture clients."
        ],
        requirements: [
          "Expertise in 3ds Max, V-Ray, AutoCAD, Revit, and Lumion",
          "Strong understanding of lighting, materials, and photorealistic rendering",
          "Experience in real estate or architectural visualisation projects",
          "Leadership experience with ability to manage a small creative team"
        ],
        responsibilities: [
          "Lead 3D visualisation projects from modelling to final render and client delivery",
          "Produce architectural renders, interior visualisations, and animated walkthroughs",
          "Create precise CAD drawings, floor plans, and technical layouts",
          "Manage and mentor junior 3D artists and visualisation specialists",
          "Liaise with clients to understand requirements and manage timelines"
        ],
        applyLink: "#"
      },
      {
        id: 15,
        title: "Senior Executive – Human Resources",
        type: "Full-Time",
        experience: "4–7 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a proactive Senior HR Executive to manage end-to-end recruitment, employee engagement, and HR operations for Ritz Media World's growing team."
        ],
        requirements: [
          "Strong understanding of recruitment, HR operations, and labour compliance",
          "Proficiency in HR software and MS Office",
          "Excellent interpersonal and communication skills",
          "High level of discretion and integrity"
        ],
        responsibilities: [
          "Handle end-to-end recruitment: postings, screening, interviews, and offer rollouts across creative, digital, and technical roles",
          "Manage onboarding, induction programs, and new joiner experience",
          "Maintain employee records, HR databases, and compliance documentation",
          "Support performance management, appraisals, and feedback cycles",
          "Drive employee engagement initiatives, welfare activities, and internal communication"
        ],
        applyLink: "#"
      },
      {
        id: 16,
        title: "HR Manager",
        type: "Full-Time",
        experience: "5–8 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking an experienced HR Manager to lead the Human Resources function at Ritz Media World. The role involves developing people strategies, driving talent acquisition, and creating a high-performance, engaged workplace culture."
        ],
        requirements: [
          "Prior experience in a media, advertising, or creative agency preferred",
          "Strong knowledge of labour laws, HR compliance, and best practices",
          "Excellent leadership, stakeholder management, and conflict resolution skills",
          "MBA or PGDM in Human Resources from a recognised institution"
        ],
        responsibilities: [
          "Lead the full HR function: talent acquisition, onboarding, performance management, L&D, and employee relations",
          "Develop and implement HR policies, compensation structures, and workforce planning strategies",
          "Partner with department heads and senior leadership on organizational design and people decisions",
          "Manage statutory compliance, payroll, and HR audits",
          "Build a strong employer brand and drive initiatives to improve retention and team engagement"
        ],
        applyLink: "#"
      },
      {
        id: 17,
        title: "Junior SEO Executive",
        type: "Full-Time",
        experience: "0–2 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring an enthusiastic Junior SEO Executive to support our SEO team in boosting keyword rankings, organic traffic, and on-page optimisation for client websites."
        ],
        requirements: [
          "Basic understanding of SEO fundamentals, Google algorithms, and search intent",
          "Familiarity with SEMrush, Ahrefs, Google Analytics, and Search Console",
          "Good written communication skills in English and Hindi",
          "Eagerness to learn, adapt, and grow in a fast-paced agency environment"
        ],
        responsibilities: [
          "Conduct keyword research, competitor analysis, and content gap identification",
          "Execute on-page SEO: meta tags, heading structures, internal linking, and image optimisation",
          "Support link building activities: outreach, guest posting, and directory submissions",
          "Track and report keyword rankings, organic traffic, and SEO KPIs",
          "Assist in technical SEO audits and coordinate with web development teams"
        ],
        applyLink: "#"
      },
      {
        id: 18,
        title: "Music Designer – Digital",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a creative Music Designer to compose and produce original audio, including background scores, sound design, and audio branding for digital campaigns, videos, and radio ads."
        ],
        requirements: [
          "Experience creating content for digital advertising or media production",
          "Strong portfolio of original compositions, jingles, or brand audio projects",
          "Proficiency in DAWs: Logic Pro, Ableton Live, FL Studio, or Pro Tools",
          "Strong sense of rhythm, melody, and brand-appropriate sonic aesthetics"
        ],
        responsibilities: [
          "Compose and produce original music, jingles, and background scores",
          "Design and deliver sound effects, audio logos, and sonic branding elements",
          "Collaborate with video, motion, and creative teams to sync audio with visuals",
          "Edit and master audio tracks to platform-specific standards (YouTube, Instagram, Spotify, radio)"
        ],
        applyLink: "#"
      },
      {
        id: 19,
        title: "Copywriter",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a sharp, versatile Copywriter to create compelling copy for digital ads, social media, websites, email campaigns, scripts, and print campaigns across diverse brands and industries."
        ],
        requirements: [
          "Exceptional writing skills in English, adaptable for different tones and audiences",
          "Understanding of SEO copywriting, digital ad formats, and social media content",
          "Ability to manage multiple briefs under tight deadlines",
          "Portfolio of work spanning digital, print, and social copy"
        ],
        responsibilities: [
          "Write clear, persuasive, and on-brand copy for digital ads, social media posts, landing pages, email campaigns, and print collateral",
          "Develop brand voice documents, taglines, and messaging frameworks",
          "Collaborate with design and strategy teams for integrated campaigns",
          "Write long-form content (blogs, articles, whitepapers) optimized for SEO",
          "Edit and proofread copy to ensure accuracy, tone consistency, and quality"
        ],
        applyLink: "#"
      },
      {
        id: 20,
        title: "System & Network Administrator",
        type: "Full-Time",
        experience: "2–5 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a reliable System & Network Administrator to manage IT infrastructure, ensuring seamless connectivity, system security, and operational uptime across all departments."
        ],
        requirements: [
          "Proficiency in Windows Server, Linux, Cisco networking, and cloud platforms",
          "Strong knowledge of LAN/WAN, TCP/IP, DNS, DHCP, and VPN configurations",
          "Experience with cybersecurity protocols: firewalls, VPNs, antivirus, and data backup systems",
          "Relevant certifications: CCNA, CompTIA Network+, or Microsoft Certified"
        ],
        responsibilities: [
          "Install, configure, and maintain servers, workstations, and network devices",
          "Monitor network performance and troubleshoot connectivity issues",
          "Manage user accounts, access controls, permissions, and Active Directory",
          "Coordinate with software vendors, ISPs, and hardware suppliers",
          "Ensure maximum system uptime and IT security compliance"
        ],
        applyLink: "#"
      },
      {
        id: 21,
        title: "Video Content Creator",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a creative Video Content Creator who can produce engaging content that makes audiences stop scrolling. You'll work on exciting brands, tell real stories, and bring your creative touch to campaigns."
        ],
        requirements: [
          "Bachelor's degree in Mass Communication, Film Production, or related field",
          "Strong video shooting and storytelling skills",
          "Knowledge of video editing tools: Premiere Pro, Final Cut Pro, etc.",
          "Understanding of social media trends and formats"
        ],
        responsibilities: [
          "Conceptualize, shoot, and edit videos for social media, campaigns, and branded content",
          "Collaborate with writers and designers to bring ideas to life",
          "Manage multiple projects without compromising quality",
          "Bring fresh energy and creativity to every brief"
        ],
        applyLink: "#"
      },
      {
        id: 22,
        title: "3D Environment Artist",
        type: "Full-Time",
        experience: "2–5 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a 3D Environment Artist who is passionate about detailed lighting, textures, and spatial mood. You'll work on brand films, AI-driven productions, and immersive visual experiences."
        ],
        requirements: [
          "Bachelor's degree in Animation, Design, or related field",
          "Proficiency in Blender, Maya, Unreal Engine, or similar tools",
          "Strong understanding of lighting, textures, and composition"
        ],
        responsibilities: [
          "Build immersive 3D environments for films, virtual productions, and digital campaigns",
          "Collaborate with AI filmmakers and creative directors to realize visual concepts",
          "Adapt and optimize assets across different output formats without losing quality",
          "Continuously raise the bar on visual quality and realism"
        ],
        applyLink: "#"
      },
      {
        id: 23,
        title: "AI Filmmaker",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring an AI Filmmaker who can craft cinematic stories using tools like Runway, Sora, and Kling, delivering films that feel genuinely human even when AI-generated."
        ],
        requirements: [
          "Bachelor's degree in Film, Media, or related field",
          "Knowledge of AI video tools",
          "Strong storytelling and editing skills",
          "Understanding of cinematic techniques"
        ],
        responsibilities: [
          "Produce AI-generated films and brand videos aligned with client briefs",
          "Collaborate with 3D artists, editors, and creative leads",
          "Explore and implement new tools and techniques",
          "Ensure AI-generated content feels human and cinematic"
        ],
        applyLink: "#"
      },
      {
        id: 24,
        title: "GM – Brand Solutions & GTM",
        type: "Full-Time",
        experience: "7+ Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a GM – Brand Solutions & GTM to drive brand strategy, go-to-market planning, and high-value business development."
        ],
        requirements: [
          "MBA in Marketing, Business, or related field",
          "Experience in brand strategy and GTM planning",
          "Strong leadership and client management skills",
          "Analytical and strategic thinking"
        ],
        responsibilities: [
          "Lead GTM strategy for brand and AI-driven offerings",
          "Own senior client relationships and drive high-value business development",
          "Coordinate creative, strategy, and technology teams to deliver innovative solutions",
          "Monitor market trends and provide actionable insights"
        ],
        applyLink: "#"
      },
      {
        id: 25,
        title: "Video Editor",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a Video Editor passionate about storytelling, pacing, and audio-visual harmony across social media, digital campaigns, and brand films."
        ],
        requirements: [
          "Bachelor's degree in Media, Film, or related field",
          "Expertise in Premiere Pro, After Effects",
          "Strong sense of timing, pacing, and storytelling"
        ],
        responsibilities: [
          "Edit videos for social media, digital campaigns, and brand films",
          "Collaborate with directors and creators throughout post-production",
          "Apply color grading, sound, and motion effects to enhance visuals"
        ],
        applyLink: "#"
      },
      {
        id: 26,
        title: "Generative AI Engineer",
        type: "Full-Time",
        experience: "2–4 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking a Generative AI Engineer to build AI tools and automations that streamline workflows and enhance creativity."
        ],
        requirements: [
          "Bachelor's/Master's in Computer Science, AI, or related field",
          "Experience with LLMs, Python, and AI frameworks",
          "Knowledge of prompt engineering and model tuning",
          "Strong problem-solving and analytical skills"
        ],
        responsibilities: [
          "Develop and deploy AI tools for creative and strategy teams",
          "Identify and solve real-world problems with AI",
          "Stay updated with advancements in AI and implement best practices",
          "Document processes for team knowledge sharing"
        ],
        applyLink: "#"
      },
      {
        id: 27,
        title: "Junior Copywriter",
        type: "Full-Time",
        experience: "0–1 Year",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a Junior Copywriter eager to learn and create compelling content for digital ads, social media, and campaigns."
        ],
        requirements: [
          "Bachelor's in English, Journalism, or related field",
          "Strong writing and grammar skills",
          "Basic knowledge of SEO and content marketing",
          "Creativity and adaptability"
        ],
        responsibilities: [
          "Write copy for digital ads, social media, email campaigns",
          "Support senior writers and creative leads on briefs",
          "Proofread content carefully",
          "Contribute ideas during brainstorming sessions"
        ],
        applyLink: "#"
      },
      {
        id: 28,
        title: "Junior Art Director",
        type: "Full-Time",
        experience: "0–1 Year",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a Junior Art Director with a keen visual sense, ready to contribute to campaigns and grow creatively in a real-world agency environment."
        ],
        requirements: [
          "Bachelor's in Design, Fine Arts, or related field",
          "Proficiency in Adobe Creative Suite",
          "Strong visual and creative skills"
        ],
        responsibilities: [
          "Support senior art directors on campaign concepts and deliverables",
          "Create visual assets for digital, social, and brand communications",
          "Collaborate with copywriters and strategists",
          "Stay visually curious and inspired"
        ],
        applyLink: "#"
      },
      {
        id: 29,
        title: "AI Knowledge Custodian",
        type: "Full-Time",
        experience: "1–3 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring an AI Knowledge Custodian to document, test, and share AI tools, making generative AI accessible across the organisation."
        ],
        requirements: [
          "Bachelor's in IT, Data Science, or related field",
          "Understanding of AI tools, LLMs, and data management",
          "Strong documentation and organizational skills",
          "Analytical mindset"
        ],
        responsibilities: [
          "Research and document new AI tools for team use",
          "Build and maintain playbooks, guides, and learning resources",
          "Conduct training sessions and workshops",
          "Support teams in using AI efficiently"
        ],
        applyLink: "#"
      },
      {
        id: 30,
        title: "Executive Creative Director",
        type: "Full-Time",
        experience: "8–12 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking an Executive Creative Director to lead brand storytelling, creative strategy, and high-performance campaigns across digital and offline platforms."
        ],
        requirements: [
          "Bachelor's in Marketing, Design, Media, or related field",
          "Expertise in brand storytelling and campaign strategy",
          "Experience leading creative teams across digital platforms",
          "Strong leadership and decision-making skills"
        ],
        responsibilities: [
          "Define and drive creative direction for brand campaigns",
          "Manage and mentor designers, writers, and video creators",
          "Collaborate with marketing and strategy teams for campaign execution",
          "Ensure brand consistency across all touchpoints",
          "Integrate emerging trends like AI and immersive content into campaigns"
        ],
        applyLink: "#"
      },
      {
        id: 31,
        title: "AI Automation Head",
        type: "Full-Time",
        experience: "5–9 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are seeking an AI Automation Head to optimize operations and implement intelligent solutions that enhance efficiency. You will bring AI-driven workflows to everyday tasks, enabling teams to work smarter and faster."
        ],
        requirements: [
          "Bachelor's/Master's in Computer Science or AI",
          "Expertise in AI automation tools and workflows",
          "Experience with APIs, integrations, and process automation",
          "Understanding of LLMs, chatbots, and AI-driven systems"
        ],
        responsibilities: [
          "Design and implement AI-driven automation systems",
          "Optimize business processes using AI tools and integrations",
          "Collaborate with cross-functional teams to identify automation opportunities",
          "Monitor system performance and improve efficiency continuously"
        ],
        applyLink: "#"
      },
      {
        id: 32,
        title: "Junior Content Writer",
        type: "Full-Time",
        experience: "0–2 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are looking for a Junior Content Writer passionate about creating SEO-friendly and engaging content for blogs, websites, and social media while learning digital storytelling."
        ],
        requirements: [
          "Bachelor's in English, Journalism, or Marketing",
          "Strong writing, editing, and proofreading skills",
          "Basic understanding of SEO and keyword usage",
          "Creativity, attention to detail, and adaptability"
        ],
        responsibilities: [
          "Write blogs, website content, and social media copies",
          "Conduct keyword research for SEO-optimized content",
          "Edit and proofread content for clarity and accuracy",
          "Collaborate with marketing and design teams"
        ],
        applyLink: "#"
      },
      {
        id: 33,
        title: "Head of Artificial Intelligence",
        type: "Full-Time",
        experience: "10+ Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are hiring a Head of AI to lead the company's AI vision and strategy, overseeing the development and implementation of AI technologies to enhance business operations."
        ],
        requirements: [
          "Advanced degree in AI, Machine Learning, or Computer Science",
          "Strong experience in AI strategy, deployment, and team leadership",
          "Deep knowledge of ML, NLP, and generative AI",
          "Experience managing large technical teams"
        ],
        responsibilities: [
          "Define and execute the company's AI strategy",
          "Lead AI product development and innovation initiatives",
          "Manage and mentor AI/ML teams",
          "Collaborate with leadership for business integration",
          "Ensure ethical and scalable AI implementation"
        ],
        applyLink: "#"
      },
      {
        id: 34,
        title: "Generative AI Designer",
        type: "Full-Time",
        experience: "2–5 Years",
        location: "Sector 142, Noida, 201305",
        about: [
          "We are searching for a creative Generative AI Designer to produce visually captivating content using AI tools, giving brands a new dimension in digital storytelling."
        ],
        requirements: [
          "Bachelor's in Design, Animation, or related field",
          "Hands-on experience with generative AI tools (image/video/text)",
          "Strong visual design and storytelling skills",
          "Knowledge of design software and AI platforms",
          "Creative thinking with attention to detail"
        ],
        responsibilities: [
          "Create AI-generated visuals, videos, and design assets",
          "Experiment with new generative AI tools and techniques",
          "Collaborate with creative and marketing teams",
          "Maintain brand consistency in AI-generated content"
        ],
        applyLink: "#"
      }
    ]
  };

  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id: any) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className=" border-t border-gray-200 py-10">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            {careersData.sectionTitle}
          </h1>
        </div>

        {/* Accordion */}
        <div className="space-y-4">

          {careersData.jobs.map((job, index) => {
            const isOpen = openId === job.id;

            return (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
              >

                {/* Header */}
                <button
                  onClick={() => toggleAccordion(job.id)}
                  className="w-full flex items-center cursor-pointer justify-between p-5 sm:p-6 text-left"
                >

                  <div className="flex items-start gap-4">

                    {/* Number */}
                    <span className="text-gray-400 font-semibold text-sm sm:text-base">
                      {String(index + 1).padStart(2, "0")}.
                    </span>

                    <div>

                      {/* Title */}
                      <div className="text-lg sm:text-xl font-semibold text-black">
                        {job.title}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">

                        {job.type && (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            {job.type}
                          </span>
                        )}

                        {/* Experience */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                            />
                          </svg>

                          <span>{job.experience}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a6 6 0 008.485-8.485l-4.243-4.243"
                            />
                          </svg>

                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div className="text-3xl text-gray-500">
                    {isOpen ? "×" : "+"}
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${isOpen
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-5 sm:px-6 pb-6">

                    {/* About */}
                    <div className="bg-[#FAFAFA] rounded-2xl p-5">

                      <div className="font-semibold text-black mb-4">
                      Job Overview:
                      </div>

                      {job.about.map((item, i) => (
                        <p
                          key={i}
                          className="text-sm text-gray-600 leading-7 mb-4"
                        >
                          {item}
                        </p>
                      ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                      {/* Requirements */}
                      <div>
                        <div className="font-semibold text-black mb-4">
                          Requirements:
                        </div>

                        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
                          {job.requirements.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Responsibilities */}
                      <div>
                        <div className="font-semibold text-black mb-4">
                          Key Responsibilities:
                        </div>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
                          {job.responsibilities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="mt-8">
                      <a
                        href={job.applyLink}
                        className="group letsTalkToday inline-flex items-center gap-3 font-medium text-black transition"
                      >
                        Apply Now
                        <span className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#C99237] flex justify-center items-center transition-colors group-hover:bg-[#b8822f] letsTalkTodayIcon">
                          <svg
                            width="22"
                            height="20"
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                          >
                            <path
                              d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z"
                              fill="white"
                            />
                            <rect
                              x="2.19678"
                              y="16.7172"
                              width="16.5517"
                              height="0.689655"
                              transform="rotate(-39.5724 2.19678 16.7172)"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}