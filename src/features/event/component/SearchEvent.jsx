import { useState, useEffect } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { useSearchParams } from "react-router";

function SearchEvent({ theme }) {
    const [componentFilter, setComponentFilter] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Ambil state filter aktif dari URL
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") || "all";
    const currentLocation = searchParams.get("location") || "all locations";

    const [keyword, setKeyword] = useState(currentSearch);

    // Sync input local state ketika URL query berubah dari luar
    useEffect(() => {
        setKeyword(currentSearch);
    }, [currentSearch]);

    const category = ['all', 'technology', 'design', 'business', 'career', 'ai', 'programming', 'music'];
    const locations = ['all locations', 'bandung', 'jakarta', 'surabaya', 'yogyakarta', 'online'];

    // 2. Helper function untuk meng-update URL query params
    const updateParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        
        // Jika pilih 'all' atau 'all locations' atau input kosong, hapus dari query URL
        if (!value || value === 'all' || value === 'all locations') {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        
        setSearchParams(newParams);
    };

    // 3. Handler Submit Form Search Input
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        updateParam("search", keyword);
    };

    return (
        <div>
            <section className={`flex flex-col gap-3 sticky top-14 z-40 px-7 py-4 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-black border-gray-900'} border-b`}>
                <div className="flex justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="w-full flex gap-4 items-center relative">
                        <BsFillSearchHeartFill className={`absolute inset-y-2.5 left-3 text-md font-bold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}/>
                        <input 
                            type="text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onBlur={() => updateParam("search", keyword)} // Auto trigger saat user pindah fokus dari input
                            className={`w-full h-10 ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-300'} rounded-lg px-10 text-sm focus:outline-none`} 
                            placeholder="Search events"
                        />
                    </form>
                    <span 
                        className={`flex items-center gap-2 px-4 py-1.5 border ${theme === 'light' ? 'border-gray-300 text-gray-600' : 'border-gray-600 text-gray-300'} rounded-lg text-xs font-medium cursor-pointer select-none`}
                        onClick={() => setComponentFilter(!componentFilter)}
                    >
                        <IoFilterSharp/>
                        Filters
                    </span>
                </div>
            </section>

            {/* Section Filter Component */}
            <section className={`${!componentFilter ? 'hidden' : 'flex'} grid gap-4 px-7 py-4 border-b ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-black border-gray-900'}`}>
                {/* Filter Category */}
                <div className="grid gap-2">
                    <p className="uppercase text-xs text-[#71717B] font-semibold tracking-wide">category</p>
                    <div className="flex flex-wrap gap-1.5">
                        {category.map((val) => {
                            const isActive = currentCategory.toLowerCase() === val.toLowerCase();
                            return (
                                <span 
                                    key={val}
                                    onClick={() => updateParam("category", val)}
                                    className={`px-3 py-0.5 border rounded-md text-xs cursor-pointer font-medium transition-colors select-none ${
                                        val === 'ai' ? 'uppercase' : 'capitalize'
                                    } ${
                                        isActive 
                                            ? 'bg-orange-600 text-white border-orange-600' 
                                            : 'border-gray-300 text-[#52525C] hover:border-gray-400'
                                    }`}
                                >
                                    {val}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Filter Location */}
                <div className="grid gap-2">
                    <p className="uppercase text-xs text-[#71717B] font-semibold tracking-wide">location</p>
                    <div className="flex flex-wrap gap-1.5">
                        {locations.map((loc) => {
                            const isActive = currentLocation.toLowerCase() === loc.toLowerCase();
                            return (
                                <span 
                                    key={loc}
                                    onClick={() => updateParam("location", loc)}
                                    className={`px-3 py-0.5 border rounded-md text-xs cursor-pointer font-medium capitalize transition-colors select-none ${
                                        isActive 
                                            ? 'bg-orange-600 text-white border-orange-600' 
                                            : 'border-gray-300 text-[#52525C] hover:border-gray-400'
                                    }`}
                                >
                                    {loc}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SearchEvent;