"use client";

import Section8 from "@/components/influencer-marketing-agency-in-india/Section8";
import { useContactConsultation } from "../ContactConsultationProvider";

function Section10() {
    const { openConsultationModal } = useContactConsultation();

    return <Section8 onScheduleClick={openConsultationModal} />;
}

export default Section10;
