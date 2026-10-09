"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import s5 from "./Section5.module.css";
import m from "./Section5M.module.css";

type Milestone = {
    year: string;
    label: string;
    image: string;
    alt: string;
};

const MILESTONES: Milestone[] = [
    { year: "2008", label: "Foundation", image: "/new-about-imgs/s4/abt-s4-img1.jpg", alt: "2008 — Foundation" },
    { year: "2012", label: "Innovation Leadership", image: "/new-about-imgs/s4/abt-s4-img2.jpg", alt: "2012 — Innovation Leadership" },
    { year: "2016", label: "Digital Expansion", image: "/new-about-imgs/s4/abt-s4-img3.jpg", alt: "2016 — Digital Expansion" },
    { year: "2020", label: "Premium Positioning", image: "/new-about-imgs/s4/abt-s4-img4.jpg", alt: "2020 — Premium Positioning" },
    { year: "2026", label: "AI-Powered 3D Rendering at 5X", image: "/new-about-imgs/s4/abt-s4-img5.jpg", alt: "2026 — AI-Powered 3D Rendering at 5X" },
];

function MilestoneItem({ item, index }: { item: Milestone; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${m.item} ${visible ? m.itemVisible : ""}`}
            style={{ transitionDelay: visible ? `${Math.min(index, 5) * 45}ms` : "0ms" }}
        >
            <span className={m.node} aria-hidden />
            <div className={m.yearLabelWrap}>
                <p className={`${styles.fontmontserrat} ${m.year}`}>{item.year}</p>
                <p className={`${styles.fontopensans} ${m.label}`}>{item.label}</p>
            </div>
            <div className={m.thumb}>
                <img src={item.image} alt={item.alt} title={item.alt} loading="lazy" />
            </div>
        </div>
    );
}

function Section5M() {
    return (
        <section className={`flex w-full justify-center py-[40px] xl:py-[70px] ${s5.root} ${m.mRoot}`}>
            <div className={`w-full ${styles.containerWidth} ${s5.container}`}>
                <div className={m.inner}>
                    <header className={m.hero}>
                        <p className={`font-[600] text-[16px] uppercase text-[#C99237] ${styles.fontpoppins} ${s5.eyebrow}`}>Our Journey</p>
                        <p className={`mb-1 font-[700] text-[36px] ${styles.fontmontserrat} ${s5.heading} ${m.headingTight}`}>
                            17 Years of Brand Excellence
                        </p>
                        <p className={`font-[400] text-[16px] ${styles.fontpoppins} ${s5.copy} ${m.subTight}`}>
                            From pioneering print innovations to 360° Digital Marketing , our journey reflects our commitment to excellence.
                        </p>
                    </header>

                    <div className={m.timeline} aria-label="Company timeline">
                        <div className={m.rail} aria-hidden />
                        {MILESTONES.map((item, index) => (
                            <MilestoneItem key={item.year} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section5M;
