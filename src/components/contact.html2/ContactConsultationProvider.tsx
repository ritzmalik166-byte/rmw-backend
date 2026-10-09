"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import ContactLeadForm from "./ContactLeadForm";
import modalStyles from "./contactConsultationModal.module.css";
import pageStyles from "./sections/page.module.css";

const MODAL_CLOSE_MS = 240;

type ContactConsultationContextValue = {
    openConsultationModal: () => void;
    closeConsultationModal: () => void;
};

const ContactConsultationContext =
    createContext<ContactConsultationContextValue | null>(null);

export function useContactConsultation() {
    const ctx = useContext(ContactConsultationContext);
    if (!ctx) {
        throw new Error(
            "useContactConsultation must be used within ContactConsultationProvider",
        );
    }
    return ctx;
}

export function useContactConsultationOptional() {
    return useContext(ContactConsultationContext);
}

export default function ContactConsultationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const openConsultationModal = useCallback(() => {
        setIsClosing(false);
        setOpen(true);
    }, []);

    const closeConsultationModal = useCallback(() => {
        if (isClosing) return;
        setIsClosing(true);
        window.setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
        }, MODAL_CLOSE_MS);
    }, [isClosing]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeConsultationModal();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, closeConsultationModal]);

    return (
        <ContactConsultationContext.Provider
            value={{ openConsultationModal, closeConsultationModal }}
        >
            {children}

            {open && (
                <div
                    className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm ${
                        isClosing ? modalStyles.overlayClosing : modalStyles.overlay
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-consultation-title"
                    onClick={closeConsultationModal}
                >
                    <div
                        className={`relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8 ${
                            isClosing ? modalStyles.panelClosing : modalStyles.panel
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeConsultationModal}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#5C5C5C] transition-colors hover:bg-[#F5F5F5] hover:text-black"
                            aria-label="Close consultation form"
                        >
                            <span className="text-2xl leading-none">&times;</span>
                        </button>

                        <h2
                            id="contact-consultation-title"
                            className={`pr-9 text-center text-[15px] font-semibold leading-[1.2] whitespace-nowrap text-[#000000] sm:pr-10 sm:text-left sm:text-[22px] sm:whitespace-normal sm:leading-tight lg:text-[26px] ${pageStyles.fontMontserrat}`}
                        >
                            Your Big Idea Starts Here
                        </h2>
                        <p
                            className={`mt-2 mb-6 text-center text-[15px] leading-[26px] text-[#000000] sm:text-left ${pageStyles.fontopensans}`}
                        >
                            Got a project you&apos;re thinking about? Fill out the
                            form below, & our team will reach out to you soon to make
                            your ideas happen!
                        </p>

                        <ContactLeadForm
                            variant="modal"
                            onSubmitSuccess={closeConsultationModal}
                        />
                    </div>
                </div>
            )}
        </ContactConsultationContext.Provider>
    );
}
