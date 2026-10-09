import { BsInfoCircle, BsStarFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function Location() {
    return (
        <section className="w-full px-0 pb-6 pt-3 sm:pb-8 lg:pb-10">
            <div className="mx-auto w-full max-w-[1366px]">
                <div className="relative h-[290px] w-full overflow-hidden border border-neutral-300 sm:h-[360px] md:h-[430px] lg:h-[470px]">
                    <iframe
                        title="Ritz Media World Location"
                        src="https://www.google.com/maps?q=Ritz%20Media%20World%20Noida&z=14&output=embed"
                        loading="lazy"
                        className="h-full w-full border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className="absolute left-3 top-3 z-10 w-[230px] rounded-sm bg-white/95 p-2.5 shadow-md sm:left-4 sm:top-4 sm:w-[250px] sm:p-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <p className="truncate text-[14px] font-semibold leading-[1.2] text-neutral-800">
                                    Ritz Media World
                                </p>
                                <p className="mt-1 text-[11px] leading-[1.35] text-neutral-600">
                                    Unit no, Tower A1, Corporate Park, 4th floor, 402-404, Sector
                                    142, Noida, Uttar Pradesh 201305
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-1.5 pt-0.5 text-[15px] text-[#3b82f6]">
                                <button
                                    type="button"
                                    aria-label="Open in maps"
                                    className="rounded p-0.5 transition hover:bg-blue-50"
                                >
                                    <FiExternalLink />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Suggest an edit"
                                    className="rounded p-0.5 transition hover:bg-blue-50"
                                >
                                    <HiOutlinePencilSquare />
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-700">
                            <span>4.9</span>
                            <BsStarFill className="text-[10px] text-[#f59e0b]" />
                            <span className="text-[#1d4ed8]">(132)</span>
                            <BsInfoCircle className="ml-0.5 text-[11px] text-neutral-500" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}