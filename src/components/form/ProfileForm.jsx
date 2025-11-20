"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { useNotificationStore } from "@/store/notificationStore";
import { useFormState } from "react-dom";
import { updateProfileUnprotected } from "@/app/(profile)/profilesaya/actions";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { saveFile } from "@/lib/upload";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file) {
            return new NextResponse("Tidak ada file yang diunggah.", { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return new NextResponse("Format file harus gambar.", { status: 400 });
        }

        const fileUrl = await saveFile(file);
        const userId = parseInt(session.user.id, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { profile_picture_url: fileUrl },
        });

        return NextResponse.json({ message: "Upload berhasil", url: fileUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

const EyeOpenIcon = () => (
    <Image
        src="/assets/icons/icon-eye-on.svg"
        width={20}
        height={20}
        alt="Show"
    />
);
const EyeClosedIcon = () => (
    <Image
        src="/assets/icons/icon-eye-off.svg"
        width={20}
        height={20}
        alt="Hide"
    />
);

const Fieldset = ({
                      legend,
                      children,
                      className = "",
                      legendClassName = "",
                  }) => (
    <fieldset
        className={`group border border-gray-300 rounded-lg px-4 pt-2.5 pb-2 relative mt-3
                focus-within:border-primary-default focus-within:ring-1 focus-within:ring-primary-default
                transition-colors duration-200 ease-in-out ${className}`}
    >
        <legend
            className={`text-sm font-medium text-gray-700 px-1 mx-2 absolute -top-2.5 bg-white ${legendClassName}`}
        >
            {legend}
        </legend>
        {children}
    </fieldset>
);

const ProfileForm = ({ initialData }) => {
    const { showToast } = useNotificationStore();
    const [state, formAction] = useFormState(updateProfileUnprotected, {
        success: false,
        message: null,
    });

    const [gender, setGender] = useState(initialData.gender || "Perempuan");
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        name: "Indonesia",
        code: "+62"
    });
    const [phoneNumber, setPhoneNumber] = useState(initialData.phone?.replace(/^\+62/, "") || "");
    const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
    const genderDropdownRef = useRef(null);
    const countryCodeDropdownRef = useRef(null);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                showToast(state.message, "success");
            } else {
                showToast(state.message, "error");
            }
        }
    }, [state, showToast]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("/api/countries");
                if (response.ok) {
                    const data = await response.json();
                    setCountries(data.map(c => ({
                        name: c.name,
                        code: c.phone_code || "+62",
                        flag: c.flag || "/assets/icons/icon-indonesia.svg",
                    })));
                }
            } catch (err) {
                console.error("Gagal memuat negara", err);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
                setIsGenderOpen(false);
            }
            if (countryCodeDropdownRef.current && !countryCodeDropdownRef.current.contains(event.target)) {
                setIsCountryCodeOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const countryOptions = countries.length > 0 ? countries : [{ name: "Indonesia", code: "+62" }];

    return (
        <form action={formAction} className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <Image
                    src={initialData.avatarUrl || "/assets/images/avatar9.jpg"}
                    alt="Foto Profil"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-base text-foreground">
                        {initialData.name || "Nama Pengguna"}
                    </p>
                    <p className="text-base text-gray-500">
                        {initialData.email || "email@contoh.com"}
                    </p>
                    <button
                        type="button"
                        className="text-sm text-error-pressed hover:underline mt-1 font-medium"
                    >
                        Ganti Foto Profil
                    </button>
                </div>
            </div>

            <Fieldset legend="Nama Lengkap">
                <input
                    type="text"
                    name="name"
                    defaultValue={initialData.name}
                    required
                    className="w-full border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                />
            </Fieldset>

            <Fieldset legend="E-Mail">
                <input
                    type="email"
                    value={initialData.email}
                    readOnly
                    className="w-full border-none focus:outline-none focus:ring-0 bg-transparent p-0 text-gray-500 cursor-not-allowed"
                />
            </Fieldset>

            <div className="relative" ref={genderDropdownRef}>
                <input type="hidden" name="gender" value={gender} />
                <Fieldset legend="Jenis Kelamin">
                    <button
                        type="button"
                        onClick={() => setIsGenderOpen(!isGenderOpen)}
                        className="w-full flex justify-between items-center border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                    >
                        <span>{gender}</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 text-gray-400 transition-transform ${isGenderOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                </Fieldset>
                {isGenderOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <ul>
                            {["Perempuan", "Laki_laki"].map((option) => (
                                <li key={option}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setGender(option);
                                            setIsGenderOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm ${
                                            gender === option ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {option === "Laki_laki" ? "Laki-laki" : "Perempuan"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 mt-3">
                <div className="relative w-1/4" ref={countryCodeDropdownRef}>
                    <button
                        type="button"
                        className="w-full flex items-center justify-evenly border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-default h-[42.39px]"
                        onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                    >
            <span className="text-sm font-medium text-gray-700">
              {selectedCountry.code}
            </span>
                        <ChevronDownIcon
                            className={`w-4 h-4 transition-transform text-gray-400 ${isCountryCodeOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isCountryCodeOpen && (
                        <ul className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto w-56">
                            {countryOptions.map((country) => (
                                <li
                                    key={country.code}
                                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setIsCountryCodeOpen(false);
                                    }}
                                >
                                    <span>{country.name} ({country.code})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative w-full -mt-3">
                    <Fieldset legend="No. Hp" className="m-0 p-0" legendClassName="left-4">
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                            placeholder="81234567890"
                        />
                    </Fieldset>
                    <input type="hidden" name="phone" value={`${selectedCountry.code}${phoneNumber}`} />
                </div>
            </div>

            <Fieldset legend="Password Baru">
                <div className="relative">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Kosongkan jika tidak ingin mengubah"
                        className="w-full border-none focus:outline-none focus:ring-0 bg-transparent pr-10 p-0"
                    />
                    <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 flex items-center text-gray-500 hover:text-gray-700 -top-2.5 pr-0"
                    >
                        {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                </div>
            </Fieldset>

            <Fieldset legend="Konfirmasi Password">
                <div className="relative">
                    <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Ulangi password baru"
                        className="w-full border-none focus:outline-none focus:ring-0 bg-transparent pr-10 p-0"
                    />
                    <button
                        type="button"
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        className="absolute inset-y-0 right-0 flex items-center text-gray-500 hover:text-gray-700 -top-2.5 pr-0"
                    >
                        {isConfirmPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                </div>
            </Fieldset>

            <div className="pt-4">
                <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="md"
                    className="w-full"
                >
                    Simpan Perubahan
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;