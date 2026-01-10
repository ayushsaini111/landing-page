"use client";
import Gradient from '@/components/ui/Gradient';
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import BlogVideoListingPage from "./BlogListing";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?limit=100`)
      .then(res => res.json())
      .then(json => {
        setBlogs(json.data?.blogs || []);
      })
      .catch(err => {
        console.error("Failed to load blogs for search:", err);
        setBlogs([]);
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
        <div className="w-full">
            <Gradient title={"Blog"} description={"description"} />
            <div className='pb-s40 md:pb-s48 lg:pb-s64 px-s16 md:px-s32'>
                <div className="my-s16">
                    <SearchBar
        items={blogs}
        onSearch={handleSearch}
        placeholder="Search blogs..."
      />
                </div>
                <BlogVideoListingPage 
                searchQuery={searchQuery} 
                onClearSearch={handleClearSearch}
                />
            </div>
        </div>
    );
}


