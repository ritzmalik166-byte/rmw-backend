import S2Card from "./cards/S2Card";
import styles from "./page.module.css";
function Section2({ data }: { data: any }) {
    return (
        <section className="flex w-full items-center justify-center py-10 md:py-[70px]">
            {/* Centered Align Container  */}
            <div className={`flex w-full flex-col gap-8 md:gap-12 lg:gap-8 ${styles.containerWidth2}`}>
                {data && data.length > 0 ? data.map((idx: any, index: number) => {
                    return (
                        <S2Card index={index} key={index} data={idx} />
                    )
                }) : <div>No data found</div>}
            </div>
        </section>
    )
}

export default Section2;