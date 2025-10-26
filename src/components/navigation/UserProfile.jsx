"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";
import Link from "next/link";

const UserProfile = ({ avatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-default"
      >
        <Image
          src={avatar}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-xl"
        />
      </button>

      {isOpen && (
        <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100 left-0 md:left-auto md:right-0">
          <Link
            href="/profilesaya"
            className="block px-5 py-3 text-base hover:bg-gray-50"
            onClick={handleLinkClick}
          >
            Profil Saya
          </Link>
          <Link
            href="/kelassaya"
            className="block px-5 py-3 text-base hover:bg-gray-50"
            onClick={handleLinkClick}
          >
            Kelas Saya
          </Link>
          <Link
            href="/pesanansaya"
            className="block px-5 py-3 text-base hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            Pesanan Saya
          </Link>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={() => {
              handleLinkClick();
              signOut({ callbackUrl: "/" });
            }}
            className="w-full text-left flex items-center justify-between px-5 py-3 text-base text-error-default hover:bg-gray-50"
          >
            <span>Keluar</span>
            <LogoutIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
