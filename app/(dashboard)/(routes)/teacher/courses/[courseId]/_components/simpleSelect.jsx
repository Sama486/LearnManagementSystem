// SimpleSelect.jsx

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react"; // Import icons as needed
import { cn } from "@/lib/utils"; // Your utility for conditional class names

const SimpleSelect = ({ options, value, onChange }) => {
  return (
    <div className="relative w-[200px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border rounded-md outline-none px-3"
      >
        <option value="" disabled>Select an option...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {/* <ChevronsUpDown className="h-4 w-4 opacity-50" /> */}
      </div>
    </div>
  );
};

export default SimpleSelect;
