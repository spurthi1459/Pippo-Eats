import React from "react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="searchbar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search restaurants or cuisines..."
    />
  );
}
