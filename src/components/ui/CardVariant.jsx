"use client";

import { Share2 } from "lucide-react";

export default function CardVariant({
    image,
    title,
    description,
    duration,
    variant = "blog",
    id,
    redirectUrl,
}) {
    const isVideo = variant === "video" || variant === "youtube" || variant === "instagram" || variant === "facebook";

    const handleShare = async (e) => {
        e.stopPropagation(); // Prevent card click

        // Determine share URL
        const shareUrl = isVideo
            ? redirectUrl
            : `${window.location.origin}/blog/${id}`;

        // Try native share API first
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description || title,
                    url: shareUrl,
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    // Fallback to clipboard if share fails
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            // Fallback to clipboard for desktop
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show temporary feedback
            const btn = document.activeElement;
            const originalHTML = btn?.innerHTML;
            if (btn) {
                btn.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';
                setTimeout(() => {
                    if (btn) btn.innerHTML = originalHTML;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <div
            className="
        cursor-pointer transition-transform hover:scale-[1.03]
        w-[316px]
        bg-background border-2 border-[#B87333]
        rounded-r16 p-2 flex flex-col gap-2
      "
        >
            {/* IMAGE */}
            <div className={`relative w-full ${isVideo ? "h-[300px]" : "h-[180px]"}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-r8"
                />

                {isVideo && (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 4l10 6-10 6V4z" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* TEXT */}
            <div className="flex flex-col gap-2 px-1 min-h-[80px]">
                {/* TITLE WITH SHARE BUTTON */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-primary-main title-h4 line-clamp-1 flex-1">
                        {title}
                    </h3>

                    {/* SHARE BUTTON */}
                    <button
                        onClick={handleShare}
                        className="
              flex-shrink-0 p-1.5 rounded-full
              text-gray-600 hover:text-accent-main
              hover:bg-accent-light
hover:cursor-pointer
            "
                        title="Share"
                        aria-label="Share"
                    >
                        <Share2 className="w-4 h-4" color={"#804012"} size={64} />
                    </button>
                </div>

                <p className="text-secondary body-default line-clamp-1">
                    {description}
                </p>
            </div>
        </div>
    );
}
