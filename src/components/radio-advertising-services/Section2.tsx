
import styles from './page.module.css';
function Section2() {
    return (
        <section className={`w-full flex justify-center items-center py-[35px] lg:py-[70px]`}>
            {/* Centered Align Container   */}
            <div className={`w-full text-center flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-[1075px] ${styles.containerWidth}`}>
                <p className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight sm:leading-snug md:leading-normal px-2 sm:px-0 ${styles.fontmontserrat}`}>
                    In a visually crowded world, audio remains the only way to command undivided attention.
                </p>
                <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-full sm:max-w-[896px] leading-relaxed px-2 sm:px-0 text-center ${styles.fontopensans}`}>
                    At
                    <a href='/' target='_blank' className="font-[700] text-[#C99237] cursor-pointer"> Ritz Media World</a>, we develop compelling <i>radio campaigns</i> that break through the clutter, stay memorable, and stick in the consumer's head. We turn airtime into impactful brand communication through persuading scripts, engaging voiceovers, and smart media buying. Whethediscussion-forumr the need be for immediate response or building long-term brand recall, our <i>radio advertising</i> ensures your message is heard clearly, confidently, and unmistakably spoken.
                </p>
            </div>
        </section>
    )
}

export default Section2;