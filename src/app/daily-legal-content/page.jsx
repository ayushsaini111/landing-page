"use client";
import Gradient from '@/components/ui/Gradient';
import SearchBar from '@/components/ui/SearchBar';
import VideoListingPage from '@/components/VideoListing';
import { useState } from 'react';

function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    console.log("hiiii  good");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <main className="w-full">
            <Gradient title={"Daily Legal Content"} description={"description"} />
            {/* SEARCH BAR */}
            <div className='pb-s40 md:pb-s48 lg:pb-s64 px-s16 md:px-s32'>
                <div className="my-s16">
                    <SearchBar endpoint="video" onSearch={handleSearch} />
                </div>
                {/* VIDEO LISTING */}
                <VideoListingPage searchQuery={searchQuery} />
            </div>
        </main>
    );
}

export default Page;
