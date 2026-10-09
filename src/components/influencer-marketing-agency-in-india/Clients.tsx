import Image from "next/image";
import Link from "next/link";
import styles from "./Clients.module.css";

function Section6({ pd = "py-[35px] lg:py-[70px] " }: { pd?: string }) {
    return (
        <section className={`w-full flex justify-center items-center md:mt-0 mt-2 ${pd}`}>
            {/* Centered Align Container  */}
            <div className={`w-full mx-auto flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-hidden ${styles.containerWidth}`}>
                {/* Top Row  */}
                {/* Copy Components  */}
                <div className="flex flex-col w-full">
                    {/* Copy Row 1  */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-stretch gap-4 sm:gap-0">
                        {/* Left Side Container  */}
                        <div className="relative w-full md:w-[150px] h-auto md:h-[156px] border-b-[#D9D9D9] border-b-[1px] md:border-b-0 md:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center md:justify-start pb-4 md:pb-0 px-4 md:px-0">
                            <h2 className="font-[700] text-[24px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center sm:text-left" style={{
                                fontFamily: 'MontserratBold',
                            }}>Brands That Trust Us</h2>
                            

                            <p className="absolute top-[50%] transform -translate-y-[50%] -right-3 hidden md:block">
                                <svg
                                    width="12"
                                    height="13"
                                    viewBox="0 0 12 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z"
                                        fill="#D9D9D9"
                                    />
                                </svg>
                            </p>
                        </div>

                        {/* Right Side Container  */}
                        <div className="flex w-full border-0 md:border-t  md:border-b  md:border-[#D9D9D9] min-h-0 md:w-[calc(100%-194px)] md:pl-6 lg:pl-[47px] overflow-x-hidden sm:items-center flex-col md:flex-row items-center md:items-center gap-4 md:gap-0">
                            {/* Slider Container  */}
                            <div className="w-full overflow-hidden">
                                <div className={`flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-max ${styles.clientSlider}`}>
                                    {[
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-22.jpg",
                                        "/new-page/logos/mpf-bl.png",
                                        "/new-page/logos/rdx-lg.avif",
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-2.png",
                                        // duplicate set 1
                                        "/new-page/logos/prm-3.png",
                                        "/new-page/logos/prm-4.png",
                                        "/new-page/logos/prm-5.png",
                                        "/new-page/logos/prm-6.png",
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-7.png",
                                        // duplicate set 2 for seamless loop
                                        "/new-page/logos/prm-8.jpg",
                                        "/new-page/logos/prm-10.png",
                                        "/new-page/logos/prm-11.jpg",
                                        "/new-page/logos/prm-12.png",
                                        "/new-page/logos/exotica-logo.png",
                                        "/new-page/logos/prm-14.png",
                                        "/new-page/logos/prm-16.png",
                                        "/new-page/logos/prm-17.jpg",
                                        "/new-page/logos/prm-18.png",
                                        "/new-page/logos/prm-19.png",
                                        "/new-page/logos/prm-20.jpg",
                                        "/new-page/logos/scnd-3.jpg",
                                        "/new-page/logos/scnd-4.jpg",
                                        "/new-page/logos/scnd-5.jpg",
                                        "/new-page/logos/scnd-6.jpg",
                                        "/new-page/logos/scnd-7.jpg",
                                        "/new-page/logos/scnd-8.jpg",
                                        "/new-page/logos/scnd-9.jpg",
                                        "/new-page/logos/scnd-10.jpg",
                                        "/new-page/logos/scnd-11.jpg",
                                        "/new-page/logos/scnd-12.jpg",
                                        "/new-page/logos/scnd-13.jpg",
                                        "/new-page/logos/scnd-14.jpg",
                                        "/new-page/logos/scnd-15.jpg",
                                        "/new-page/logos/scnd-16.jpg",
                                        "/new-page/logos/scnd-17.jpg",
                                        "/new-page/logos/scnd-18.jpg",
                                    ].map((url, idx) => (
                                        <div
                                            key={idx}
                                            className="w-[90px] h-[50px] sm:w-[120px] sm:h-[67px] md:w-[130px] md:h-[72px] lg:w-[146px] lg:h-[81px] relative shrink-0"
                                        >
                                            <Image src={url} fill alt="Ritz Media World Clients" title="Ritz Media World Clients" className="object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* View More Container  */}
                            <div className="w-[90px] h-[50px] sm:w-[120px] sm:h-[67px] md:w-[130px] md:h-[72px] lg:w-[146px] lg:h-[81px] flex justify-center items-center flex-shrink-0 ml-2 sm:ml-3 md:ml-4">
                                <Link
                                    title="Show more"
                                    href="/clients"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-[600] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] cursor-pointer border-b hover:opacity-80 transition-opacity"
                                >
                                    Show more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section6;