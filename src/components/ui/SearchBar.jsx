"use client";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";

export default function SearchBar({
  items = [],
  onSearch,
  placeholder = "Search...",
}) {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const inputRef = useRef(null);

  /* -----------------------------
     IN-MEMORY SMART SUGGESTIONS
  ------------------------------ */
  useEffect(() => {
    const q = term.trim().toLowerCase();

    if (!q) {
      setSuggestions([]);
      setOpen(false);
      setActive(-1);
      return;
    }

    const scored = [];

    items.forEach((item) => {
      const title = item.title?.toLowerCase() || "";
      const desc = item.description?.toLowerCase() || "";
      const cat = item.category?.toLowerCase() || "";

      if (title === q) scored.push({ item, score: 100 });
      else if (title.startsWith(q)) scored.push({ item, score: 90 });
      else if (title.includes(q)) scored.push({ item, score: 70 });
      else if (cat.includes(q)) scored.push({ item, score: 60 });
      else if (desc.includes(q)) scored.push({ item, score: 40 });
    });

    const result = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.item);

    setSuggestions(result);
    setOpen(result.length > 0);
    setActive(-1);
  }, [term, items]);

  /* -----------------------------
     CLEAN CLOSE
  ------------------------------ */
  const closeSuggestions = () => {
    setOpen(false);
    setSuggestions([]);
    setActive(-1);
  };

  /* -----------------------------
     SEARCH EXECUTION
  ------------------------------ */
  const executeSearch = (value) => {
    closeSuggestions();
    onSearch?.(value.trim());
    inputRef.current?.blur();
  };

  /* -----------------------------
     KEYBOARD HANDLING
  ------------------------------ */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (active >= 0 && suggestions[active]) {
        executeSearch(suggestions[active].title);
        setTerm(suggestions[active].title);
      } else {
        executeSearch(term);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    }

    if (e.key === "Escape") {
      closeSuggestions();
      inputRef.current?.blur();
    }
  };

  /* -----------------------------
     HIGHLIGHT
  ------------------------------ */
  const highlight = (text) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      const parentDiv = inputRef.current?.closest(".relative");
      if (parentDiv && !parentDiv.contains(e.target)) {
        closeSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-full max-w-4xl">

        {/* INPUT + BUTTON */}
        <div className="flex items-center gap-s16 border-2 border-accent-main rounded-r16 px-s16 py-s8">
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
          />

          <Button onClick={() => executeSearch(term)}>Search</Button>
        </div>

        {/* DROPDOWN */}
        {open && suggestions.length > 0 && (
          <div className="absolute z-30 w-full mt-2 bg-background border border-accent-main rounded-r16 shadow-xl max-h-96 overflow-y-auto">
            {suggestions.map((item, index) => (
              <div
                key={item._id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setTerm(item.title);
                  closeSuggestions();
                  onSearch?.(item.title.trim());
                  setTimeout(() => inputRef.current?.blur(), 0);
                }}
                onMouseEnter={() => setActive(index)}
                className={`px-s16 py-s8 cursor-pointer border-b-2 border-accent-main transition-colors ${
                  index === active
                    ? "bg-blue-100 border-l-4 border-l-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-semibold">
                  {highlight(item.title)}
                </p>

                {item.description && (
                  <p className="text-sm text-gray-500">
                    {highlight(item.description)}
                  </p>
                )}

                {item.category && (
                  <p className="text-xs font-semibold text-accent-main mt-1">
                    {highlight(item.category)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}