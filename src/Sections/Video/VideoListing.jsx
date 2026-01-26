"use client";
import { useEffect, useState, useRef } from "react";
import CardVariant from "@/components/ui/CardVariant";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import CardSkeleton from "@/components/ui/CardSkeleton";

export default function VideoListingPage({ searchQuery = "", onClearSearch }) {
  const [items, setItems] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [activeQuery, setActiveQuery] = useState("");
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const abortRef = useRef(null);
  const cacheRef = useRef({});
  const initialMountRef = useRef(true);
  const limit = 12;
  const isInitialLoading = items.length === 0 && !error && activeQuery === "";

  const CACHE_DURATION_MAIN = 2 * 60 * 1000;
  const CACHE_DURATION_SEARCH = 10 * 60 * 1000;

  // ============================================
  // OPTIMIZED SAVE STATE (ASYNC)
  // ============================================
  const saveStateAsync = (itemsToSave, pageToSave, hasMoreToSave, totalToSave, queryToSave) => {
    if (typeof window === "undefined") return;
    
    requestIdleCallback?.(() => {
      try {
        if (itemsToSave.length > 0) {
          sessionStorage.setItem(
            "video-listing-state",
            JSON.stringify({
              items: itemsToSave,
              page: pageToSave,
              hasMore: hasMoreToSave,
              total: totalToSave,
              activeQuery: queryToSave,
            })
          );
        }
      } catch (e) {
        console.warn("Failed to save state:", e);
      }
    }) || setTimeout(() => {
      try {
        if (itemsToSave.length > 0) {
          sessionStorage.setItem(
            "video-listing-state",
            JSON.stringify({
              items: itemsToSave,
              page: pageToSave,
              hasMore: hasMoreToSave,
              total: totalToSave,
              activeQuery: queryToSave,
            })
          );
        }
      } catch (e) {
        console.warn("Failed to save state:", e);
      }
    }, 0);
  };

  useEffect(() => {
    const saveState = () => {
      saveStateAsync(items, page, hasMore, total, activeQuery);
    };

    window.addEventListener("beforeunload", saveState);
    return () => {
      window.removeEventListener("beforeunload", saveState);
    };
  }, [items, page, hasMore, total, activeQuery]);

  // ============================================
  // FETCH DATA WITH CACHE
  // ============================================
  const fetchData = async (pageNum = 1, append = false, query = "", forceRefresh = false) => {
    const isSearch = query.trim() !== "";
    const cacheDuration = isSearch ? CACHE_DURATION_SEARCH : CACHE_DURATION_MAIN;
    const cacheKey = `${query}_${pageNum}`;

    // Check cache first
    if (!forceRefresh && cacheRef.current[cacheKey] && !append) {
      const cached = cacheRef.current[cacheKey];
      const age = Date.now() - cached.timestamp;

      if (age < cacheDuration) {
        setItems(cached.items);
        setTotal(cached.total);
        setHasMore(cached.hasMore);
        setPage(pageNum);
        setError(null);
        setIsSearching(false);
        return;
      }
    }

    // Abort previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    if (append) setLoadingMore(true);

    try {
      const queryParam = query ? `&query=${encodeURIComponent(query)}` : "";
      const cacheWindow = Math.floor(Date.now() / cacheDuration);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video?page=${pageNum}&limit=${limit}${queryParam}&_t=${cacheWindow}`,
        {
          signal: abortRef.current.signal,
          cache: forceRefresh ? "no-store" : "force-cache",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch videos");

      const json = await res.json();
      const videos = json?.data?.videos || [];
      const totalVideos = Number(json?.data?.total || 0);
      const totalPages = Number(json?.data?.totalPages || Math.ceil(totalVideos / limit) || 1);

      if (append) {
        setItems((prev) => [...prev, ...videos]);
      } else {
        setItems(videos);
      }

      setTotal(totalVideos);
      setHasMore(pageNum < totalPages);
      setPage(pageNum);
      setError(null);
      setIsSearching(false);

      // Cache results
      if (!append) {
        cacheRef.current[cacheKey] = {
          items: videos,
          total: totalVideos,
          hasMore: pageNum < totalPages,
          timestamp: Date.now(),
        };
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching videos:", err);
        setError(err.message);
        if (!append) setItems([]);
      }
      setIsSearching(false);
    } finally {
      setLoadingMore(false);
    }
  };

  // ============================================
  // LOAD MORE
  // ============================================
  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchData(nextPage, true, activeQuery, false);
  };

  // ============================================
  // OPTIMIZED BACK BUTTON
  // ============================================
  const handleBack = () => {
    setIsSearching(true);
    setPage(1);
    setError(null);
    setActiveQuery("");
    cacheRef.current = {};
    onClearSearch?.();
    
    requestIdleCallback?.(() => {
      sessionStorage.removeItem("video-listing-state");
      sessionStorage.removeItem("video-scroll");
      sessionStorage.removeItem("video-card");
    }) || setTimeout(() => {
      sessionStorage.removeItem("video-listing-state");
      sessionStorage.removeItem("video-scroll");
      sessionStorage.removeItem("video-card");
    }, 0);

    fetchData(1, false, "", true);
  };

  // ============================================
  // EXPLORE MORE
  // ============================================
  const handleExploreMore = () => {
    setIsSearching(true);
    setPage(1);
    setError(null);
    setActiveQuery("");
    cacheRef.current = {};
    onClearSearch?.();
    
    requestIdleCallback?.(() => {
      sessionStorage.removeItem("video-listing-state");
      sessionStorage.removeItem("video-scroll");
      sessionStorage.removeItem("video-card");
    }) || setTimeout(() => {
      sessionStorage.removeItem("video-listing-state");
      sessionStorage.removeItem("video-scroll");
      sessionStorage.removeItem("video-card");
    }, 0);

    fetchData(1, false, "", true);
  };

  // ============================================
  // INITIAL MOUNT & STATE RESTORATION
  // ============================================
  useEffect(() => {
    if (!initialMountRef.current) return;
    initialMountRef.current = false;

    const savedStateRaw = sessionStorage.getItem("video-listing-state");
    const clickedCard = sessionStorage.getItem("video-card");

    if (savedStateRaw && clickedCard) {
      try {
        const saved = JSON.parse(savedStateRaw);

        if (saved.activeQuery === searchQuery) {
          const restoredItems = saved.items || [];

          setItems(restoredItems);
          setActiveQuery(saved.activeQuery);
          setTotal(saved.total);
          const restoredPage = Math.ceil(restoredItems.length / limit) || 1;
          setPage(restoredPage);
          fetchData(restoredPage, false, saved.activeQuery, true);

          return;
        }
      } catch (e) {
        console.error("Video restore failed:", e);
      }
    }

    // Fresh first load
    setPage(1);
    setActiveQuery("");
    setError(null);
    fetchData(1, false, "", true);

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // ============================================
  // HANDLE SEARCH QUERY CHANGES (WITH SKELETON)
  // ============================================
  useEffect(() => {
    if (initialMountRef.current) return;

    setPage(1);
    setActiveQuery(searchQuery);
    setError(null);
    setIsSearching(true);
    
    requestIdleCallback?.(() => {
      sessionStorage.removeItem("video-listing-state");
    }) || setTimeout(() => {
      sessionStorage.removeItem("video-listing-state");
    }, 0);
    
    fetchData(1, false, searchQuery, true);

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [searchQuery]);

  // ============================================
  // RESTORE SCROLL POSITION
  // ============================================
  useEffect(() => {
    if (!items.length) return;

    const savedScroll = sessionStorage.getItem("video-scroll");
    const savedCard = sessionStorage.getItem("video-card");

    if (savedScroll && savedCard) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(savedScroll));
      });
      sessionStorage.removeItem("video-scroll");
      sessionStorage.removeItem("video-card");
    }
  }, [items]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <main className="w-full">
      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-red-600">Error: {error}</p>
          <Button onClick={() => fetchData(page, false, activeQuery, true)} variant="ctaAccent">
            Retry
          </Button>
        </div>
      )}

      {/* SEARCH RESULTS INFO */}
      {activeQuery && items.length > 0 && (
        <div >
          <span
            onClick={handleBack}
            className="text-accent-main cursor-pointer hover:underline pl-s24"
          >
            ← Back
          </span>
        </div>
      )}

      {/* LOADING STATE */}
      {(isInitialLoading || isSearching) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-s64 gap-y-s64 py-s32 justify-items-center">
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} isVideo={true} />
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {activeQuery && items.length === 0 && !error && !isInitialLoading && !isSearching && (
        <div className="flex flex-col items-center justify-center my-s48 text-center">
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-s8">
            No results found for "{activeQuery}"
          </h3>
          <p className="text-text-secondary mb-6">
            Try different keywords or explore all content
          </p>
          <Button onClick={handleExploreMore} variant="ctaAccent">
            Explore More
          </Button>
        </div>
      )}

      {/* GRID */}
      {items.length > 0 && !isSearching && (
        <div className="w-full grid gap-x-s64 py-s64 gap-y-s64 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                sessionStorage.setItem("video-scroll", window.scrollY.toString());
                sessionStorage.setItem("video-card", item._id);
                if (item.redirectUrl) window.location.href = item.redirectUrl;
              }}
            >
              <CardVariant
                image={item.thumbnail}
                title={item.title}
                description={item.description}
                duration={item.duration}
                variant={item.platform}
                redirectUrl={item.redirectUrl}
                id={item._id}
              />
            </div>
          ))}
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {hasMore && items.length > 0 && !isSearching && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="ctaAccent"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* ALL LOADED MESSAGE */}
      {!hasMore && items.length > 0 && !isSearching && (
        <div className="text-center mt-12 text-disabled">
          All items loaded ({items.length} of {total})
        </div>
      )}
    </main>
  );
}