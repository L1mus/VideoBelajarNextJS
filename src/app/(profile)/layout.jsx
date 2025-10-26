import React from "react";
import Sidebar from "@/components/profile/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-background min-h-screen py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Ubah Profil
          </h2>
          <p className="text-base text-gray-600 mt-1">Ubah data diri Anda</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-grow w-full md:max-w-xl bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
