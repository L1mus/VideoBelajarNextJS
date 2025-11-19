"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Button from "../button/Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Nama Lengkap wajib di isi"),
    email: z.string().min(1, "Email wajib di isi").email("Format email tidak valid"),
    gender: z.enum(["Laki_laki", "Perempuan"], {
        errorMap: () => ({ message: "Pilih jenis kelamin" }),
    }),
    phone: z.string().min(10, "Nomor HP minimal 10 digit").regex(/^[0-9]+$/, "Hanya angka yang diperbolehkan"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
});

const PhoneInput = ({
                        label,
                        error,
                        countries = [],
                        disabled = false,
                        value,
                        onChange
                    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultCountry = countries.length > 0 ? countries[0] : {
        name: "Indonesia",
        code: "+62",
        flag: "/assets/icons/icon-indonesia.svg",
    };
    const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label} <span className="text-error-default">*</span>
            </label>
            <div className="flex items-center gap-2">
                <div className="relative w-1/4" ref={dropdownRef}>
                    <button
                        type="button"
                        className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg bg-white h-[46px] ${
                            disabled ? "bg-gray-100 cursor-not-allowed border-gray-300" : "border-gray-300"
                        }`}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                    >
                        <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${disabled ? "text-gray-500" : "text-gray-700"}`}>
                {selectedCountry.code}
              </span>
                        </div>
                        <ChevronDownIcon
                            className={`w-4 h-4 transition-transform ${disabled ? "text-gray-300" : "text-gray-400"} ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {isOpen && countries.length > 0 && (
                        <ul className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto w-56">
                            {countries.map((country) => (
                                <li
                                    key={country.code}
                                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span>{country.name} ({country.code})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-3/4">
                    <input
                        type="tel"
                        value={value || ""}
                        onChange={onChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default ${
                            error ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                        } ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}`}
                        placeholder="81234567890"
                        disabled={disabled}
                    />
                </div>
            </div>
            {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
    );
};

const Input = ({
                   label,
                   type = "text",
                   icon,
                   onIconClick,
                   disabled = false,
                   register,
                   name,
                   error
               }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
            {label} <span className="text-error-default">*</span>
        </label>
        <div className="relative">
            <input
                type={type}
                {...register(name)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default ${
                    error ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                } ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}`}
                disabled={disabled}
            />
            {icon && (
                <button
                    type="button"
                    onClick={onIconClick}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={disabled}
                >
                    {icon}
                </button>
            )}
        </div>
        {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
);

const RegisterForm = () => {
    const router = useRouter();
    const { registerUser } = useUserStore();
    const [countries, setCountries] = useState([]);
    const [isCountryLoading, setIsCountryLoading] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const genderDropdownRef = useRef(null);
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            gender: "",
            phone: ""
        }
    });

    const selectedGender = watch("gender");
    const onSubmit = async (data) => {
        setIsLoading(true);
        const success = await registerUser(data);
        setIsLoading(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
                setIsGenderOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const countryData = [
        { name: "Indonesia", code: "+62", flag: "/assets/icons/icon-indonesia.svg" },
    ];

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("/api/countries");
                if (response.ok) {
                    const data = await response.json();
                    const mappedCountries = data.map((c) => ({
                        name: c.name,
                        code: c.phone_code,
                        flag: "/assets/icons/icon-indonesia.svg",
                    }));

                    setCountries(mappedCountries);
                }
            } catch (error) {
                console.error("Gagal mengambil data negara:", error);
            } finally {
                setIsCountryLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const defaultCountries = [
        { name: "Indonesia", code: "+62", flag: "/assets/icons/icon-indonesia.svg" },
    ];

    const countryOptions = countries.length > 0 ? countries : defaultCountries;

    return (
        <div className="bg-white border border-gray-200 flex flex-col w-full max-w-sm md:max-w-xl p-5 md:p-9 gap-5 md:gap-9 rounded-lg">
            <div className="flex flex-col text-center gap-2">
                <h1 className="text-3xl font-bold text-foreground">Pendaftaran Akun</h1>
                <p className="text-base text-gray-600">
                    Yuk, daftarkan akunmu sekarang juga!
                </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Nama Lengkap"
                    name="name"
                    register={register}
                    error={errors.name}
                    disabled={isLoading}
                />
                <Input
                    label="E-Mail"
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    disabled={isLoading}
                />

                <div className="relative flex flex-col gap-2" ref={genderDropdownRef}>
                    <label className="text-sm font-medium text-gray-700">
                        Jenis Kelamin <span className="text-error-default">*</span>
                    </label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <>
                                <button
                                    type="button"
                                    onClick={() => !isLoading && setIsGenderOpen(!isGenderOpen)}
                                    className={`w-full flex justify-between items-center px-4 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-default h-[46px] ${
                                        isLoading ? "bg-gray-100 cursor-not-allowed border-gray-300" :
                                            errors.gender ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                    }`}
                                    disabled={isLoading}
                                >
                    <span className={field.value ? "text-gray-900" : "text-gray-400"}>
                    {field.value ? (field.value === "Laki_laki" ? "Laki-laki" : "Perempuan") : "Pilih Jenis Kelamin"}
                    </span>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 transition-transform ${
                                            isLoading ? "text-gray-300" : "text-gray-400"
                                        } ${isGenderOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {isGenderOpen && (
                                    <div className="absolute top-full z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                        <ul>
                                            <li key="Perempuan">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        field.onChange("Perempuan");
                                                        setIsGenderOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                                                >
                                                    Perempuan
                                                </button>
                                            </li>
                                            <li key="Laki_laki">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        field.onChange("Laki_laki");
                                                        setIsGenderOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                                                >
                                                    Laki-laki
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    />
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
                </div>

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PhoneInput
                            label="No. Hp"
                            value={field.value}
                            onChange={field.onChange}
                            countries={countryOptions}
                            disabled={isLoading || isCountryLoading}
                            error={errors.phone}
                        />
                    )}
                />

                <Input
                    label="Kata Sandi"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    register={register}
                    error={errors.password}
                    onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    icon={
                        <Image
                            src={isPasswordVisible ? "/assets/icons/icon-eye-on.svg" : "/assets/icons/icon-eye-off.svg"}
                            alt="Toggle"
                            width={20}
                            height={20}
                        />
                    }
                    disabled={isLoading}
                />
                <Input
                    label="Konfirmasi Kata Sandi"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                    onIconClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    icon={
                        <Image
                            src={isConfirmPasswordVisible ? "/assets/icons/icon-eye-on.svg" : "/assets/icons/icon-eye-off.svg"}
                            alt="Toggle"
                            width={20}
                            height={20}
                        />
                    }
                    disabled={isLoading}
                />

                <div className="flex flex-col gap-4 mt-2">
                    <Button
                        type="submit"
                        variant="solid"
                        color="primary"
                        size="md"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mendaftarkan..." : "Daftar"}
                    </Button>
                    <Button
                        type="button"
                        variant="light"
                        color="primary"
                        size="md"
                        className="w-full"
                        onClick={() => router.push("/login")}
                        disabled={isLoading}
                    >
                        Masuk
                    </Button>
                </div>
            </form>
            <div className="flex items-center gap-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="text-sm text-gray-400">atau</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <Button
                variant="outline"
                color="primary"
                size="md"
                className="w-full flex items-center justify-center gap-2 !border-gray-100 !text-gray-700 hover:!bg-gray-50"
                disabled={isLoading}
            >
                <Image
                    src="/assets/icons/icon-google.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                />
                <span>Daftar dengan Google</span>
            </Button>
        </div>
    );
};

export default RegisterForm;