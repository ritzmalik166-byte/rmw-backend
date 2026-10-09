import React from 'react'
import styles from './discussion.module.css';

export default function NeedExpert() {
  const services = [
    'SEO & Performance Marketing',
    'Social Media Marketing',
    'Content Marketing Services',
    'Print Advertising Services',
    'Radio Advertising Campaigns',
    'Web Development & Branding'
  ]

  return (
    <section className="w-full flex justify-center items-center py-8 sm:py-12 md:py-0 lg:py-[30px] xl:py-[20px]">
      <div className={`container mx-auto bg-white px-6 md:px-10 lg:px-12 xl:px-3 ${styles.needExpertContainer}`}>
        <div className="mx-auto flex flex-col items-center text-center">
          <h2 className={`text-[20px]  leading-tight text-black sm:text-[24px] md:text-[36px] ${styles.montserratBold}`}>
            Need Expert Help?
          </h2>

          <p className={`mt-4 max-w-xl text-sm leading-7 sm:text-[16px] md:text-[16px] ${styles.poppins}`}>
            If you’re looking for professional marketing solutions, connect with Ritz Media World a trusted{' '}
            <span className={`font-[700] ${styles.fontopensans}`}>digital marketing agency in India</span> offering :
          </p>

          <div className="mt-10 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className=" border border-[#E6E6E6] bg-white p-10 text-center transition "
              >
                <p className={`text-[16px] font-[400] text-black md:text-[16px] ${styles.fontopensans}`}>{service}</p>
              </div>
            ))}
          </div>

          <p className={`mt-10 max-w-xl text-sm leading-7 text-black sm:text-[16px] md:text-[16px] ${styles.poppins}`}>
            We are recognized as the best digital marketing company in Delhi NCR providing 360° brand growth solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
