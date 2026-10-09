
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';


function Section2() {
  return (
    <section className={`w-full flex justify-center items-center py-[35px] lg:py-[70px]`}>
      {/* Centered Align Container   */}
      <div className={`w-full text-center flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-[1075px] ${styles.containerWidth}`}>
        <p className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight sm:leading-snug md:leading-[42px] px-2 sm:px-0 ${styles.fontmontserrat}`}>
          Content Without Strategy is Mere Decoration
        </p>
        <p className={`font-[400]  text-[15px] lg:text-[16px] max-w-full sm:max-w-[896px] leading-relaxed px-2 sm:px-0 ${styles.fontopensans}`}>
          As a trusted content marketing agency in India, we at <b><a href="/" target="_blank" className="cursor-pointer">Ritz Media World</a></b> develop content marketing strategies that not only inform but also persuade, inspire, and convert.
          Our strategy includes <i>SEO content</i>, <i>social media content</i>, <i>email marketing</i>, <i>video content</i>, <i>infographics</i>, and <i>promotional activities</i> to capture attention, build credibility, and drive measurable business results. Each piece of content is designed for high engagement, lead generation, and brand building.
        </p>
        <Link href="/contact.html" target="_blank" title="Let's Talk Today" aria-label="Let's Talk Today" className="mt-4 lg:mt-5 flex items-center justify-center gap-4 p-[10px] text-[#0F1640] transition-colors rounded-[5px] letsTalkToday">
          <span
            className=" text-[18px]   md:text-[20px] font-[500]"
            style={{ fontFamily: "MontserratMedium" }}
          >
            Let&apos;s Talk Today
          </span>
          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors letsTalkTodayIcon">

            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
              <rect x="2.19678" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7171)" fill="white" />
            </svg>

          </span>
        </Link>
      </div>
    </section>
  )
}

export default Section2;