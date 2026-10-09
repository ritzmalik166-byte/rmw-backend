import React from 'react';
import styles from './discussion.module.css';

function Section1() {
    return (
        <section
            className={`w-full h-[425px] md:h-[300px] md:min-h-[300px] lg:h-[440px] lg:min-h-[440px] xl:h-[500px] xl:min-h-[500px] xxl:h-auto xxl:min-h-[615px] 
            bg-[#0F1640] md:bg-[#0F1640] bg-cover bg-no-repeat bg-center flex md:items-stretch lg:items-end pb-8 sm:pb-12 md:pb-3 lg:pb-10 xl:pb-26 px-4 sm:px-6 md:px-0 overflow-visible justify-center items-center md:justify-start  `}>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-2 lg:gap-3 xl:gap-8 w-full max-lg:max-w-none lg:max-w-none text-center md:text-left md:h-full md:justify-end lg:h-auto lg:justify-start -translate-y-14 sm:-translate-y-16 md:translate-y-0 lg:translate-y-3 xl:translate-y-17'>
                {/* Row 1  Yellow ReactAngle */}
                {/* <div className="hidden md:block md:w-[160px] xl:w-[170px]  md:h-[30px] xl:h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="Ritz Media World – influencer marketing" title="Ritz Media World – influencer marketing" className='w-full h-full' />
                    <p className={`font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8 `}>Services</p>
                </div> */}

                {/* Row 2  */}
                <div className={`px-0 sm:px-4 md:px-[40px] lg:px-[45px] xl:px-[48px] `}>
                    <h1 className={`text-white leading-[45px] sm:leading-[1.15] md:leading-tight lg:leading-[45px] xl:leading-[45px] mt-1 sm:mt-2 md:mt-0  xl:mt-3 lg:py-0 xl:py-0 ${styles.montserratBold}`}>
                        <span className="max-md:inline-block max-md:whitespace-nowrap md:contents lg:inline-block lg:whitespace-nowrap lg:translate-y-2 xl:translate-y-0 xl:contents">
                            <span
                                className={`text-[28px] sm:text-[30px] md:text-[28px] lg:text-[35px] xl:text-[60px] leading-tight lg:leading-[10px]`}
                            >
                                Discussion Forum{" "}
                            </span>
                            {/* <br className="hidden md:block lg:hidden xl:block" />
                          <span
                            className={`${styles.bannerHeadlineSm} font-[500] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[65px] xl:font-[500] ${styles.bannerServicesMatchLg}`}
                            style={{ fontFamily: "MontserratMedium" }}
                          >
                            Services
                          </span> */}
                        </span></h1>
                    <h2 className={`font-[500] mt-2 lg:mt-5 xl:mt-2 text-[20px] sm:text-[18px] md:text-[15px] lg:text-[17px] xl:text-[23px] xxl:text-[23px] xl:font-[500] text-white leading-[24px] md:leading-snug w-full max-md:max-w-none md:max-w-[320px] lg:max-w-[350px] xl:max-w-[690px] xxl:max-w-[750px] md:mb-2 lg:mb-0 xl:mb-[0] mb-[20px]${styles.fontopensans}`} >Let’s Talk Marketing, Growth & Ideas</h2>

                </div>
            </div>
        </section>
    )
}

export default Section1;