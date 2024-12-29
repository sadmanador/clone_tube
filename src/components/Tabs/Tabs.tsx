import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const Tabs = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <div role="tablist" className="tabs tabs-bordered md:tabs-lg flex-grow">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Home"
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab tab-active"
          aria-label="Videos"
          defaultChecked
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab hidden md:block"
          aria-label="Shorts"
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab hidden md:block"
          aria-label="Live"
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab hidden md:block"
          aria-label="Podcasts"
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab hidden md:block"
          aria-label="Playlist"
        />
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab hidden md:block"
          aria-label="Community"
        />
      </div>

      {/* Search Icon and Input */}
      <div className="relative" ref={searchRef}>
        <div
          className={`flex items-center border rounded-full p-2 transition-all duration-300 ease-in-out ${
            isOpen ? "w-64" : "w-12"
          }`}
        >
          <FaSearch
            onClick={() => setIsOpen(!isOpen)}
            className={`text-gray-500 cursor-pointer transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-90" : ""
            }`}
          />
          {isOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full p-2 border-none focus:outline-none rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
