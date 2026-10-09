import React from "react";
import Image from "next/image";
import styles from "./Contact.module.css";

export default function LetsConnect() {
    return (
        <section className="w-full px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <div className="mx-auto w-full max-w-[1366px]">
                <div className={styles.letsConnectDesktopLayout}>
                    <div>
                        <div className="mb-5 md:mb-6">
                            <h2
                                className={`max-w-[770px] text-[34px] leading-[1.15] text-[#0E0E0E] sm:text-[48px] md:text-[56px] ${styles.montserrat}`}
                            >
                                <span className={styles.montserratExtraBold}>
                                    Let&apos;s Connect
                                </span>{" "}
                                &amp; Bring
                                <br />
                                Your Vision to Life.
                            </h2>
                        </div>

                        <div className={styles.letsConnectLeftGroup}>
                            <div className={styles.letsConnectImageTile}>
                                <Image
                                    src="/contact/public-logo.png"
                                    alt="Ritz Media World emblem"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 220px"
                                />
                            </div>

                            <div className={styles.letsConnectEmailTile}>
                                <p className={`text-[15px] text-white md:text-[16px] font-[400] ${styles.fontopensans}`}>
                                    Email Address
                                </p>
                                <p
                                    className={`mt-2 text-[22px] leading-[1.2] text-white md:text-[20px] lg:text-[22px] ${styles.montserratMedium} ${styles.letsConnectEmailValue}`}
                                >
                                    info@ritzmediaworld.com
                                </p>
                            </div>

                            <div className={styles.letsConnectInfoTile}>
                                <p className={`text-[15px] md:text-[16px] font-[400] ${styles.fontopensans}`}>
                                    Phone Number
                                </p>
                                <p
                                    className={`mt-2 text-[18px] leading-[1.35] text-[#0E0E0E] md:text-[18px] lg:text-[18px] ${styles.montserratBold}`}
                                >
                                    09220516777
                                    <br />
                                    07290002168
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.letsConnectRightGroup}>
                        <div className={styles.letsConnectImageTile}>
                            <Image
                                src="/contact/building.png"
                                alt="Ritz Media World office building"
                                fill
                                className="object-cover"
                                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 280px"
                            />
                        </div>

                        <div className={`${styles.letsConnectInfoTile} ${styles.letsConnectAddressTile}`}>
                            <div className="absolute right-5 top-4">
                                <Image
                                    src="/contact/logo.png"
                                    alt="Ritz Media World logo"
                                    width={88}
                                    height={111}
                                    className="h-[50px] w-[50px] md:h-[111px] md:w-[88px]"
                                />
                            </div>
                            <div className="mt-auto">
                                <p className={`text-[15px] md:text-[16px] ${styles.fontopensans}`}>
                                    Address
                                </p>
                                <p
                                    className={`mt-2 text-[16px] leading-[1.32] text-[#111111] md:text-[18px] lg:text-[17px] ${styles.montserratBold}`}
                                >
                                    402 - 404, 4th Floor,
                                    <br />
                                    Corporate Park, Tower A1,
                                    <br />
                                    Sector 142, Noida
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}