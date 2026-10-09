import React from 'react';
import styles from './page.module.css';
function Section1() {
    return (
        <section className={`w-full h-[460px] md:h-[300px] lg:h-[500px] xl:min-h-[515px] 
        md:bg-[url("/alishba-services-v3/services-banner.png")]
        bg-[url("/alishba-services-v3/Services-banner-mob.png")]
         bg-cover bg-no-repeat bg-center flex items-end pb-8 sm:pb-12 md:pb-6 lg:pb-10 xl:pb-14 px-4 sm:px-6 md:px-0 lg:px-0
        justify-center md:justify-start
        ${styles.bannerSize}
        `}>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-5 lg:gap-6 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none text-center md:text-left mb-54 md:mb-0'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="md:w-[155px] lg:w-[165px] md:h-[35px] lg:h-[37px] relative text-center md:text-left hidden lg:block">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="Ritz Media World" title="Ritz Media World" className='w-full h-full object-contain hidden md:block' />
                    <p className="font-[700] uppercase text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white md:absolute top-[50%] transform translate-y-[-50%] right-4 sm:right-5 md:right-6 lg:right-8 ">Services</p>
                </div>

                {/* Row 2  */}
                <div className='pl-1 sm:pl-4 md:pl-8 lg:pl-12 max-w-[320px] sm:max-w-[430px] md:max-w-none mx-auto md:mx-0 '>
                    <h1 className="font-[500] text-[13px] sm:text-[15px] md:text-[18px] lg:text-[19px] xl:text-[21px] text-white md:text-[#0F1640] leading-[1.35] sm:leading-snug md:leading-normal">Services Tailored to Transform Your Brand from</h1>
                    <p className="font-[800] text-[30px] md:text-[48px] lg:text-[58px] xl:text-[65px] text-white md:text-[#0F1640] leading-[1.05] sm:leading-[1.12] md:leading-[1.2] lg:leading-18 mt-0 lg:mt-3">
                        "Just Another" <br />
                        to "The one<span className='text-white md:text-[#C99237] '>.</span>"
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Section1;