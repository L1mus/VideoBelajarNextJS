import React from "react";
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}

            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-primary-default transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className="font-bold text-foreground truncate"
                aria-current="page"
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
