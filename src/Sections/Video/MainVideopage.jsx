"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import VideoListingPage from "./VideoListing";
import Gradient from "@/components/ui/Gradient";

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
    <main className="w-full bg-background  ">
      <Gradient title={"Daily Legal Content"} description={"With clear legal insight and swift, reliable guidance, Arshiv Legal helps you act early — while the case is still in your hands and your options are open."} />

      <div className=''>

        <div className=" pb-[50px] px-s24 mb-s16 bg-secondary-main">
      <SearchBar
        items={videos}
        onSearch={handleSearch}
        placeholder="Search daily videos..."
      />
    </div>


      <VideoListingPage 
        searchQuery={searchQuery} 
        onClearSearch={handleClearSearch}
      />
      </div>

    </main>
  );
}