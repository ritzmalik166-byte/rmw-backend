import styles from "./page.module.css";

function Section7({ text = "Ready to Transform Your Website from Ordinary to Unforgettable?" }: { text: string }) {
    return (
        <a href="/contact.html" target="_blank" className="w-full flex justify-center items-center py-[40px] sm:py-[40px] md:py-[50px] lg:py--[10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-center bg-[#0F1640] overflow-x-visible">
            <p className={`font-[600] text-[17px] leading-[30px]  break-all whitespace-normal  sm:text-[20px] max:max-w-[380px]] md:-w-[505px] lg:max-w-full       md:text-[24px] lg:text-[24px] xl:text-[28px] text-white ${styles.fontmontserrat}`}>{text}</p>
        </a>
    )
}

export default Section7;