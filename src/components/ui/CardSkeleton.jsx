"use client";

export default function CardSkeleton({ isVideo = false }) {
    return (
        <div
            className="
        w-[316px]
        bg-background border-2 border-[#B87333]
        rounded-r16 p-2 flex flex-col gap-2
        animate-pulse
        "
        >
            {/* IMAGE SKELETON */}
            <div
                className={`
          relative w-full rounded-r8 overflow-hidden
          ${isVideo ? "h-[300px]" : "h-[180px]"}
          bg-primary-light/10
        `}
            >
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-background/20 rounded-full" />
                    </div>
                )}
            </div>

            {/* TEXT SKELETON */}
            <div className="flex flex-col gap-3 px-1 py-2">
                <div className="w-3/4 h-4 bg-secondary-light rounded-md" />
                <div className="w-full h-3 bg-secondary-light/90 rounded-md" />
                <div className="w-5/6 h-3 bg-secondary-light/80 rounded-md" />
            </div>
        </div>
    );
}
