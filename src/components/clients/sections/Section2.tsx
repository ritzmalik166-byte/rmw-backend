import styles from "./page.module.css";

function Section2() {
    return (
        <section className="flex w-full items-center justify-center bg-white py-10 sm:py-12 xl:py-[70px]">
            <div
                className={`flex w-full flex-col items-center gap-0 ${styles.containerWidth}`}
            >
                <h2 className={styles.clientsSectionTitle}>Our Clients</h2>
                <p className={styles.clientsSectionSubtitle}>
                    Brands That Trust Our Creativity
                </p>
                <p className={`mt-0 ${styles.clientsSectionDesc}`}>
                    We collaborate with ambitious brands, startups, and enterprises to
                    craft meaningful digital experiences. Our clients trust us to deliver
                    creative solutions that drive growth, engagement, and long-term
                    success.
                </p>
            </div>
        </section>
    );
}

export default Section2;
