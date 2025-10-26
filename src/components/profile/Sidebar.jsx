// src/components/profile/Sidebar.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Placeholder icons (Pastikan path ikon benar)
const ProfileIcon = ({ className }) => (
  <Image
    src="/assets/icons/icon-person.svg"
    width={24}
    height={24}
    alt="Profil"
    className={className}
  />
);
const ClassIcon = ({ className }) => (
  <Image
    src="/assets/icons/icon-book2.svg"
    width={24}
    height={24}
    alt="Kelas"
    className={className}
  />
);
const OrderIcon = ({ className }) => (
  <Image
    src="/assets/icons/icon-shoppingbasket.svg"
    width={24}
    height={24}
    alt="Pesanan"
    className={className}
  />
);

const menuItems = [
  { href: "/profilesaya", label: "Profil Saya", icon: ProfileIcon },
  { href: "/kelassaya", label: "Kelas Saya", icon: ClassIcon },
  { href: "/pesanansaya", label: "Pesanan Saya", icon: OrderIcon },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          const iconColorClass = isActive
            ? "text-secondary-default"
            : "text-gray-500";
          const iconFilterClass = isActive ? "filter-secondary" : "";

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                  isActive
                    ? "bg-secondary-100 text-secondary-default border border-secondary-default" // Ditambahkan border aktif
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent" // Ditambahkan border transparan untuk menjaga layout
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 ${iconColorClass} ${iconFilterClass}`}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Style untuk filter ikon (jika diperlukan) */}
      <style jsx>{`
        .filter-secondary {
          /* Filter example for orange (#FFBD3A), adjust if your secondary color is different */
          filter: invert(65%) sepia(84%) saturate(1450%) hue-rotate(3deg)
            brightness(101%) contrast(101%);
        }
      `}</style>
    </nav>
  );
};

export default Sidebar;
