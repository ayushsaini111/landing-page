"use client";
import Gradient from '@/components/ui/Gradient';
import BlogVideoListingPage from '@/components/BlogListing';
import SearchBar from '@/components/ui/SearchBar';
import { useState } from 'react';

function Page() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="w-full">
            <Gradient title={"Blog"} description={"description"} />
            <div className='pb-s40 md:pb-s48 lg:pb-s64 px-s16 md:px-s32'>
                <div className="my-s16">
                    <SearchBar onSearch={handleSearch} endpoint="blog" />
                </div>
                <BlogVideoListingPage searchQuery={searchQuery} />
            </div>
        </div>
    );
}

export default Page;
