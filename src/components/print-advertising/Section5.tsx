"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, MapPin, Globe, LayoutGrid, X } from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import S5Card from "./cards/S5Card";
import styles from "./page.module.css"

function Section5() {
    const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({
        location: true,
        language: false,
        category: false,
        publication: false,
        frequency: false,
        position: false,
    });
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const toggle = (key: string) => {
        setOpenDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const newsPaperData = [
        {
            title: "Times Of India, Banglore, Banglore",
            location: "Banglore",
            price: "3,66,465",
            circulation: "366.5K",
            img: "/news/times-of-india.png",
        },
        {
            title: "Navbharat Times, Delhi NCR, Hindi",
            location: "Hindi",
            price: "2,45,000",
            circulation: "311K",
            img: "/news/nbt.png",
        },
        {
            title: "The Economics Times, Mumbai, English",
            location: "English",
            price: "1,95,000",
            circulation: "195K",
            img: "/news/the-economic-times.png",
        },
        {
            title: "Hindustan Times, Delhi, English",
            location: "English",
            price: "75,000",
            circulation: "90K",
            img: "/news/hindustan-times.png",
        },
        {
            title: "Times Of India, Mumbai, English",
            location: "English",
            price: "9,240",
            circulation: "750K",
            img: "/news/times-of-india.png",
        },
        {
            title: "Times Of India, Delhi NCR, Hindi",
            location: "Hindi",
            price: "50,000",
            circulation: "366.5K",
            img: "/news/times-of-india.png",
        },
    ]

    return (
        <section className="w-full justify-center items-center py-8 sm:py-12 md:py-14 lg:py-[70px] border-b border-[#E5E5E5]">
            {/* ——— BELOW LG: Header + 2-col cards + Filter bottom drawer ——— */}
            <div className={`lg:hidden w-full flex flex-col gap-4 sm:gap-5 ${styles.containerWidth}`}>
                <div className="w-full flex justify-between items-center gap-3">
                    <h2 className={`font-[400] text-[18px] sm:text-[22px] leading-tight flex-1 min-w-0 ${styles.fontmontserrat}`}>
                        Select Your Newspaper Ad Category Below <span className="font-[700]">To Start Booking</span>
                    </h2>
                    <button
                        type="button"
                        onClick={() => setFilterDrawerOpen(true)}
                        className="flex-shrink-0 flex items-center gap-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-[8px] px-3 py-2.5 sm:px-4 sm:py-3"
                    >
                        <img src="/filter-icn.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className={`font-[500] text-[14px] sm:text-[16px] ${styles.fontmontserrat}`}>Filter</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
                    {newsPaperData.map((item, index) => (
                        <article
                            key={index}
                            className={`${styles.fontmontserrat} group flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E8E8] hover:border-[#D0D0D0] hover:shadow-lg transition-all duration-200`}
                        >
                            <div className="aspect-[4/3] sm:aspect-[5/3] flex items-center justify-center bg-[#FAFBFC] p-4 sm:p-5 border-b border-[#EEEEEE]">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="max-w-[85%] max-h-[85%] object-contain"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2 sm:gap-2.5">
                                <h5 className="font-semibold text-[13px] sm:text-[15px] leading-snug line-clamp-2 text-[#1a1a1a]">
                                    {item.title}
                                </h5>
                                <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#6B7280]">
                                    <span className="font-medium">{item.location}</span>
                                    <span className="text-[#D1D5DB]">·</span>
                                    <span>Circ. {item.circulation}</span>
                                </div>
                                <div className="mt-auto pt-2 border-t border-[#F0F0F0] flex items-baseline gap-1">
                                    <span className="font-bold text-[15px] sm:text-[17px] text-[#0F1640]">
                                        ₹{item.price}
                                    </span>
                                    <span className="text-[11px] sm:text-[12px] text-[#6B7280] font-normal">
                                        Min
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Filter bottom drawer (below lg only) */}
            {filterDrawerOpen && (
                <>
                    <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setFilterDrawerOpen(false)} aria-hidden />
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[16px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] max-h-[85vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b border-[#E5E5E5]">
                            <p className={`font-[600] text-[18px] ${styles.fontmontserrat}`}>Filter</p>
                            <button type="button" onClick={() => setFilterDrawerOpen(false)} className="p-2 rounded-full hover:bg-[#F5F5F5]">
                                <X className="w-5 h-5 text-[#616060]" />
                            </button>
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex flex-col gap-2 py-3 border-b border-[#E5E5E5]">
                                <button type="button" onClick={() => toggle("location")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <MapPin className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Location</p>
                                    </div>
                                    {openDropdown.location ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.location && (
                                    <select name="location" id="location-drawer" className="w-full h-[40px] rounded-[5px] border border-[#E5E5E5] px-3 text-[14px] bg-white">
                                        <option value="">Select Location</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="bangalore">Bangalore</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="kolkata">Kolkata</option>
                                    </select>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-3 border-b border-[#E5E5E5]">
                                <button type="button" onClick={() => toggle("language")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <Globe className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Language</p>
                                    </div>
                                    {openDropdown.language ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.language && (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="lang" value="english" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>English</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="lang" value="hindi" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Hindi</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="lang" value="regional" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Regional</p></label>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-3 border-b border-[#E5E5E5]">
                                <button type="button" onClick={() => toggle("category")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <BiCategory className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Category</p>
                                    </div>
                                    {openDropdown.category ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.category && (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="category" value="business" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Business</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="category" value="classifieds" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Classifieds</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="category" value="real-estate" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Real Estate</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="category" value="recruitment" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Recruitment</p></label>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-3 border-b border-[#E5E5E5]">
                                <button type="button" onClick={() => toggle("publication")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <IoDocumentTextOutline className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Publication</p>
                                    </div>
                                    {openDropdown.publication ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.publication && (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="publication" value="toi" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Times of India</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="publication" value="ht" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Hindustan Times</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="publication" value="et" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Economic Times</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="publication" value="others" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Others</p></label>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-3 border-b border-[#E5E5E5]">
                                <button type="button" onClick={() => toggle("frequency")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <LayoutGrid className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Frequency</p>
                                    </div>
                                    {openDropdown.frequency ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.frequency && (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="frequency" value="daily" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Daily</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="frequency" value="weekly" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Weekly</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="frequency" value="monthly" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Monthly</p></label>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-3">
                                <button type="button" onClick={() => toggle("position")} className="w-full flex justify-between items-center text-left">
                                    <div className="flex gap-2 items-center">
                                        <IoDocumentTextOutline className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Position</p>
                                    </div>
                                    {openDropdown.position ? <ChevronUp className="w-[13px] h-auto" /> : <ChevronDown className="w-[13px] h-auto" />}
                                </button>
                                {openDropdown.position && (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="position" value="front" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Front Page</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="position" value="back" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Back Page</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="position" value="inside" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Inside Page</p></label>
                                        <label className="flex gap-2 items-center cursor-pointer"><input type="checkbox" name="position" value="any" /><p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Any</p></label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ——— LG AND ABOVE: Original layout (filter sidebar + cards) ——— */}
            <div className={`hidden lg:flex w-full flex-col justify-center items-center gap-4 sm:gap-16 ${styles.containerWidth}`}>
                {/* Top Container  */}
                <div className="w-full flex justify-center items-center text-center px-2 sm:px-0">
                    <h2 className={`font-[400] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px] leading-tight ${styles.fontmontserrat}`}>
                        Select Your Newspaper Ad Category Below <br className="hidden sm:block" />
                        <span className="font-[700]">To Start Booking</span>
                    </h2>
                </div>

                {/* Bottom Container  */}
                <div className="w-full flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-10 items-stretch lg:items-start">
                    {/* Left Side Container  */}
                    <div className="flex flex-col gap-2 w-full max-w-full lg:w-[278px] lg:flex-shrink-0 shadow-[0_0_10px_0_rgba(192,191,191,0.25)] rounded-[5px] overflow-hidden">
                        {/* Filter Header  */}
                        <div className="w-full flex justify-between items-center p-3 sm:p-4">
                           <div className="w-full bg-[#F9F9F9] flex justify-between items-center h-[52px] sm:h-[62px] px-3 rounded-[5px]">
                           <p className={`font-[500] text-[16px] sm:text-[20px] ${styles.fontmontserrat}`}>Filter</p>
                           <img src="/filter-icn.png" alt="Filter" className="w-[24px] sm:w-[28px] h-auto" />
                           </div>
                        </div>

                        {/* Custom Dropdowns  */}
                        <div className="w-full flex flex-col gap-2">
                            {/* Custom Dropdown 1: Location */}
                            <div className="flex flex-col gap-3 py-3 sm:py-4 p-3 sm:p-4">
                                <button type="button" onClick={() => toggle("location")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <MapPin className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Location</p>
                                    </div>
                                    {openDropdown.location ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.location && (
                                    <div className="w-full pt-1">
                                        <select name="location" id="location" className="w-full h-[40px] rounded-[5px] border border-[#E5E5E5] px-3 text-[14px] text-[#222222] bg-white">
                                            <option value="">Select Location</option>
                                            <option value="delhi">Delhi</option>
                                            <option value="mumbai">Mumbai</option>
                                            <option value="bangalore">Bangalore</option>
                                            <option value="chennai">Chennai</option>
                                            <option value="kolkata">Kolkata</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Custom Dropdown 2: Language */}
                            <div className="flex flex-col gap-3 border-t border-[#E5E5E5] p-3 sm:p-4 py-3 sm:py-4">
                                <button type="button" onClick={() => toggle("language")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <Globe className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Language</p>
                                    </div>
                                    {openDropdown.language ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.language && (
                                    <div className="w-full flex flex-col gap-3 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="lang" value="english" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>English</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer ">
                                            <input type="checkbox" name="lang" value="hindi" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Hindi</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="lang" value="regional" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Regional</p>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Custom Dropdown 3: Category */}
                            <div className="flex flex-col gap-3 p-3 sm:p-4 border-t border-[#E5E5E5] py-3 sm:py-4">
                                <button type="button" onClick={() => toggle("category")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <BiCategory className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Category</p>
                                    </div>
                                    {openDropdown.category ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.category && (
                                    <div className="w-full flex flex-col gap-3 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="category" value="business" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Business</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="category" value="classifieds" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Classifieds</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="category" value="real-estate" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Real Estate</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="category" value="recruitment" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Recruitment</p>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Custom Dropdown 4: Publication */}
                            <div className="flex flex-col gap-3 p-3 sm:p-4 border-t border-[#E5E5E5] py-3 sm:py-4">
                                <button type="button" onClick={() => toggle("publication")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <IoDocumentTextOutline className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Publication</p>
                                    </div>
                                    {openDropdown.publication ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.publication && (
                                    <div className="w-full flex flex-col gap-3 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="publication" value="toi" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Times of India</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="publication" value="ht" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Hindustan Times</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="publication" value="et" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Economic Times</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="publication" value="others" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Others</p>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Custom Dropdown 5: Frequency */}
                            <div className="flex flex-col gap-3 p-3 sm:p-4 border-t border-[#E5E5E5] py-3 sm:py-4">
                                <button type="button" onClick={() => toggle("frequency")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <LayoutGrid className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Frequency</p>
                                    </div>
                                    {openDropdown.frequency ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.frequency && (
                                    <div className="w-full flex flex-col gap-3 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="frequency" value="daily" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Daily</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="frequency" value="weekly" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Weekly</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="frequency" value="monthly" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Monthly</p>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Custom Dropdown 6: Position */}
                            <div className="flex p-3 sm:p-4 flex-col gap-3 border-t border-[#E5E5E5] py-3 sm:py-4">
                                <button type="button" onClick={() => toggle("position")} className="w-full flex justify-between items-center text-left py-0.5">
                                    <div className="flex gap-2 items-center">
                                        <IoDocumentTextOutline className="w-[20px] h-auto shrink-0 text-[#616060]" />
                                        <p className={`font-[500] text-[16px] ${styles.fontmontserrat}`}>Position</p>
                                    </div>
                                    {openDropdown.position ? <ChevronUp className="w-[13px] h-auto shrink-0 text-[#616060]" /> : <ChevronDown className="w-[13px] h-auto shrink-0 text-[#616060]" />}
                                </button>
                                {openDropdown.position && (
                                    <div className="w-full flex flex-col gap-3 pt-1">
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="position" value="front" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Front Page</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="position" value="back" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Back Page</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="position" value="inside" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Inside Page</p>
                                        </label>
                                        <label className="flex gap-2 items-center cursor-pointer">
                                            <input type="checkbox" name="position" value="any" />
                                            <p className={`font-[500] text-[16px] text-[#616060] ${styles.fontopensans}`}>Any</p>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side Container  */}
                    <div className="flex-1 min-w-0 w-full flex flex-col gap-4 sm:gap-6 bg-[#F7F7F7] rounded-[5px] p-4 sm:p-5 lg:p-6">
                        {/* Top Container  */}
                        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                            <h4 className={`font-[500] text-[18px] sm:text-[20px] lg:text-[24px] text-[#222222] ${styles.fontmontserrat}`}>Newspapers type</h4>
                            <div className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[280px] px-3 sm:px-4 rounded-[10px] bg-white">
                                <select name="sort" id="sort" className={`w-full h-[48px] sm:h-[54px] text-[13px] sm:text-[16px] text-[#000000] font-[400] focus:outline-none ${styles.fontopensans}`}>
                                    <option value="" className="text-[#000000]">Sort By: Top Searched</option>
                                </select>
                            </div>
                        </div>

                        {/* Bottom Container - Cards grid: 3 cols from lg to 1349px, then natural width */}
                        <div className={`w-full flex flex-wrap justify-between gap-4 sm:gap-5 lg:gap-2 xl:gap-6 ${styles.s5CardsGrid}`}>
                            {newsPaperData.map((item, index) => (
                                <S5Card key={index} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section5;