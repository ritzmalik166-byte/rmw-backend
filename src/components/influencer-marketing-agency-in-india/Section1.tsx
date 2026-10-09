import React from 'react';
import styles from './Section1.module.css';
function Section1() {
    return (
        <section 
        className={`w-full h-[425px] md:h-[300px] md:min-h-[300px] lg:h-[500px] lg:min-h-[500px] xl:h-[500px] xl:min-h-[500px] min-[1536px]:h-auto min-[1536px]:min-h-[615px] 
            bg-[url("/varun/influencer-marketing/inf-mark-mob-banner.png")] 
            md:bg-[url("/service-v3/influencer-marketing-agency-in-india/banner/inf-banner.jpg")]
            
            bg-cover bg-no-repeat bg-center flex md:items-stretch lg:items-end pb-8 sm:pb-12 md:pb-3 lg:pb-10 xl:pb-26 px-4 sm:px-6 md:px-0 overflow-visible
        justify-center items-center md:justify-start 
        ${styles.bannerHeight}
        `}>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-2 lg:gap-3 xl:gap-8 w-full max-lg:max-w-none lg:max-w-none text-center md:text-left md:h-full md:justify-end lg:h-auto lg:justify-start -translate-y-14 sm:-translate-y-16 md:translate-y-0 lg:translate-y-3 xl:translate-y-17'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="hidden md:block md:w-[160px] xl:w-[170px]  md:h-[30px] xl:h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="Ritz Media World – influencer marketing" title="Ritz Media World – influencer marketing" className='w-full h-full' />
                    <p className={`font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8 ${styles.fontmontserrat}`}>Services</p>
                </div>

                {/* Row 2  */}
                <div className='pl-0 sm:pl-4 md:pl-[40px] lg:pl-[45px] xl:pl-[53px]'>
                    <h1 className="text-white leading-[45px] sm:leading-[1.15] md:leading-tight lg:leading-[45px] xl:leading-[45px] mt-1 sm:mt-2 md:mt-0  xl:mt-3 lg:py-0 xl:py-0">
                        <span className="max-md:inline-block max-md:whitespace-nowrap md:contents lg:inline-block lg:whitespace-nowrap lg:translate-y-2 xl:translate-y-0 xl:contents">
                          <span
                            className={`${styles.bannerHeadlineSm} font-[800] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[55px] xl:font-[800] lg:leading-[10px]`}
                            style={{ fontFamily: "MontserratExtraBold" }}
                          >
                            Influencer Marketing{" "}
                          </span>
                          {/* <br className="hidden md:block lg:hidden xl:block" />
                          <span
                            className={`${styles.bannerHeadlineSm} font-[500] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[65px] xl:font-[500] ${styles.bannerServicesMatchLg}`}
                            style={{ fontFamily: "MontserratMedium" }}
                          >
                            Services
                          </span> */}
                        </span></h1>
                        <h2 className={`font-[500]  text-[14px] sm:text-[16px] md:text-[13px] lg:text-[15px] lg:font-[400] xl:text-[21px] xl:font-[500] text-white leading-[25px]  w-full max-md:max-w-none md:max-w-[320px] lg:max-w-[350px] xl:max-w-[690px] md:mb-2 lg:mb-0 xl:mb-[0] mb-[20px]`} style={{ fontFamily: "MontserratMedium" }}>Maximize Engagement & Conversions With Result-driven Influencer Campaigns</h2>
                    
                </div>
            </div>
        </section>
    )
}

export default Section1;