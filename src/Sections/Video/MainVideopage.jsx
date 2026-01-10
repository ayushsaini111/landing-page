"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import VideoListingPage from "./VideoListing";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video?limit=100`)
      .then(res => res.json())
      .then(json => {
        setVideos(json.data?.videos || []);
      })
      .catch(err => {
        console.error("Failed to load videos for search:", err);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="w-full bg-background py-s32 px-s32">
      <SearchBar
        items={videos}
        onSearch={handleSearch}
        placeholder="Search daily videos..."
      />

      <VideoListingPage 
        searchQuery={searchQuery} 
        onClearSearch={handleClearSearch}
      />
    </main>
  );
}