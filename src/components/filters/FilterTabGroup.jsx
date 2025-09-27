"use client";

import React, { useState } from "react";
import { useDragToScroll } from "@/hooks/useDragToScroll";

const FilterTabGroup = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab || (tabs && tabs.length > 0 ? tabs[0] : "")
  );

  const scrollRef = useDragToScroll();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex space-x-8 overflow-x-auto pb-4 cursor-pointer select-none"
    >
      {tabs &&
        tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-2 px-1 text-lg whitespace-nowrap transition-colors duration-200 ease-in-out relative
            ${
              activeTab === tab
                ? "font-bold text-tertiary-default"
                : "font-medium text-gray-500 hover:text-tertiary-default"
            }
          `}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute -bottom-1 left-1 w-1/2 h-1 bg-tertiary-default rounded-full" />
            )}
          </button>
        ))}
    </div>
  );
};

export default FilterTabGroup;
