import styles2 from "./page.module.css";
function BlueLayer() {
    return (
        <div className="flex w-full   items-center justify-center bg-[#0F1640]  px-2 py-6 xl:px-6 sm:py-7 md:py-8">
            {/* Centered Align Container  */}
            <div className={`flex w-full flex-col items-center gap-4 text-center md:flex-row md:justify-between md:gap-6 md:text-left ${styles2.containerWidth}`}>
                <p
                    className={`font-[600] text-[20px] leading-tight text-white sm:text-[24px] md:text-[18px] lg:text-[28px] ${styles2.fontmontserrat}`}>Let's Do Something Remarkable Together.</p>

                <a href="https://ritzmediaworld.com/contact.html" target="_blank" className={`flex items-center justify-center gap-4 bg-transparent border-none cursor-pointer transition-opacity hover:opacity-80 sm:gap-5 md:gap-6 ${styles2.fontopensans}`}>
                    <p className="font-[500] text-[16px] text-white sm:text-[17px] md:text-[18px]">Contact us</p>

                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#C99237] hover:bg-[#B8822F] sm:h-[36px] sm:w-[36px]">

                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4274 2.92334L17.1344 9.08003L12.949 4.01587L19.4274 2.92334Z" fill="white" />
                            <rect x="2.19653" y="16.7163" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19653 16.7163)" fill="white" />
                        </svg>

                    </div>
                </a>
            </div>
        </div>
    )
}

export default BlueLayer;