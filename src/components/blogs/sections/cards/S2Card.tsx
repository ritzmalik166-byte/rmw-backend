"use client";
import Image from "next/image";
import { LuShare2 } from "react-icons/lu";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuLink } from "react-icons/lu";
import { useState } from "react";
import styles from "../page.module.css";
import { resolveBlogBannerUrl } from "@/lib/blogUrl";

function stripHtml(html: string): string {
    if (typeof html !== "string") return "";
    const tmp = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return tmp;
}

function decodeHtmlEntities(text: string): string {
    if (typeof text !== "string" || text.length === 0) return "";
    let decoded = text;

    // Run a few passes to handle double-encoded values like "&amp;#39;".
    for (let i = 0; i < 3; i += 1) {
        const next = decoded
            .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(Number(dec)))
            .replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#39;?/g, "'")
            .replace(/&nbsp;/g, " ");

        if (next === decoded) break;
        decoded = next;
    }

    if (typeof document !== "undefined") {
        const el = document.createElement("textarea");
        el.innerHTML = decoded;
        decoded = el.value;
    }

    return decoded;
}

interface Blog {
    title: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    created_at: string;
    banner: string;
    description: string;
}


function S2Card({ blog }: { blog: Blog }) {
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/${blog.slug}` : "";
    const shareTitle = blog.title || "Check out this blog";
    const imageSrc = resolveBlogBannerUrl(blog?.banner);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    const handleCopyLink = async () => {
        if (!shareUrl) return;
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const handleShareInstagram = async () => {
        if (!shareUrl) return;
        const sharePayload = {
            title: shareTitle,
            text: plainDescription.slice(0, 200) + (plainDescription.length > 200 ? "..." : ""),
            url: shareUrl,
        };
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share(sharePayload);
                setShareModalOpen(false);
                return;
            } catch (err) {
                if ((err as Error)?.name === "AbortError") return; 
            }
        }
        await handleCopyLink();
    };

    const openShare = (url: string) => window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");

    const plainDescription = decodeHtmlEntities(stripHtml(blog.meta_description || ""));
    const descriptionWithoutTitle = plainDescription
        .replace(new RegExp(`^${blog.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i"), "")
        .trim();
    const previewSource = descriptionWithoutTitle || plainDescription;
    const preview = previewSource.length > 100 ? `${previewSource.slice(0, 100)}...` : previewSource;

    return (
        <div  className="w-full max-w-[613px] mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6 mb-12">
            {/* Top Row  */}
            <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
                {/* Image Here  */}
                <div onClick={() => window.open(`/${blog.slug}`, "_blank")} className="w-full cursor-pointer relative h-[220px] sm:h-[200px] lg:h-[250px] xl:h-[345px] overflow-hidden bg-[#E8EBFF]">
                    {imageSrc ? (
                    <Image
                        src={imageSrc}
                        quality={70}
                        title={blog.title}
                        loading="lazy"
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 613px"
                    />
                    ) : null}
                </div>

                <h2 onClick={() => window.open(`/${blog.slug}`, "_blank")} className={`font-[700] hover:underline cursor-pointer text-[18px] sm:text-[17px] lg:text-[22px]  text-[#0F1640] max-w-[500px] ${styles.fontmontserrat}`}>
                    {blog.title}
                </h2>

                <p onClick={() => window.open(`/${blog.slug}`, "_blank")} className={`font-[400] hover:underline cursor-pointer text-[14px] sm:text-[14px] lg:text-[16px] text-[#000000] max-w-[540px] ${styles.fontopensans}`}>
                    {preview}
                </p>
            </div>

            <div className="flex  items-center gap-2 lg:gap-6 pt-1">
                {/* Div 1  */}
                <div>
                    <p className={`font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-[#000000] ${styles.fontopensans}`}>{new Date(blog.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>

                {/* Div 2  */}
                <div className="pl-4 sm:pl-5 lg:pl-6 pr-4 sm:pr-5 lg:pr-6 border-l border-r border-[#B4B4B4]">
                    <button onClick={() => window.open(`/${blog.slug}`, "_blank")} className="flex justify-center items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                        <p className={`font-[500] text-[16px] sm:text-[14px] lg:text-[18px] text-[#0F1640] ${styles.fontmontserrat}`}>Read more</p>
                        <div className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] lg:w-[40px] lg:h-[40px] bg-[#C99237] flex justify-center items-center rounded-full shrink-0">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] lg:w-[22px] lg:h-[20px]">
                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                <rect x="2.19675" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19675 16.7172)" fill="white" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Div 3 - Share  */}
                <button
                    type="button"
                    onClick={() => setShareModalOpen(true)}
                    className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] bg-[#0F1640] rounded-full cursor-pointer flex justify-center items-center shrink-0 hover:opacity-90 transition-opacity"
                    aria-label="Share blog"
                >
                    <LuShare2 className="w-[15px] h-[15px] lg:w-[21px] lg:h-[21px] text-white" />
                </button>
            </div>

            {/* Share modal  */}
            {shareModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShareModalOpen(false)} aria-hidden="true" />
                    <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h3 id="share-modal-title" className="font-[600] text-[18px] text-[#0F1640]">Share this blog</h3>
                            <button type="button" onClick={() => setShareModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
                                <IoMdClose className="w-6 h-6 text-[#0F1640] cursor-pointer" />
                            </button>
                        </div>
                        <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">{shareTitle}</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a href={shareLinks.whatsapp}  target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openShare(shareLinks.whatsapp); }} className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Share on WhatsApp" title="Share on WhatsApp">
                                <FaWhatsapp className="w-6 h-6" />
                            </a>
                            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openShare(shareLinks.facebook); }} className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Share on Facebook" title="Share on Facebook">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openShare(shareLinks.twitter); }} className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Share on X" title="Share on X">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openShare(shareLinks.linkedin); }} className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Share on LinkedIn" title="Share on LinkedIn">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <button type="button" onClick={handleShareInstagram} className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex cursor-pointer items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Share via Instagram or copy link" title="Share (Instagram, Stories, or copy link)">
                                <FaInstagram className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button type="button" onClick={handleCopyLink} className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 text-[#0F1640] font-[500] text-[14px] transition-colors">
                                <LuLink className="w-4 h-4 shrink-0" />
                                Copy URL only
                            </button>
                        </div>
                        {copied && <p className="mt-3 text-[13px] text-green-600 text-center">Link copied!</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default S2Card;