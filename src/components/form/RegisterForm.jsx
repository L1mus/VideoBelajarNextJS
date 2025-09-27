"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button/Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import Toast from "../toast/Toast";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  name,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-foreground">
      {label} <span className="text-error-default">*</span>
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
      />
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {icon}
        </button>
      )}
    </div>
  </div>
);
const PhoneInput = ({ label, value, onChange, countries = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries[0] || {
      name: "Indonesia",
      code: "+62",
      flag: "/assets/icons/icon-indonesia.svg",
    }
  );
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
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">
        {label} <span className="text-error-default">*</span>
      </label>
      <div className="flex items-center gap-2">
        <div className="relative w-1/4" ref={dropdownRef}>
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Image
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  width={24}
                  height={16}
                />
                <div className="h-6 w-px bg-gray-300" />
              </div>
              <span className="text-sm font-medium">
                {selectedCountry.code}
              </span>
            </div>
            <div className="hidden md:block">
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {isOpen && (
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
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={24}
                    height={16}
                  />
                  <span>
                    {country.name} ({country.code})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-3/4">
          <input
            type="tel"
            value={value}
            onChange={onChange}
            name="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama Form Registrasi ---
const RegisterForm = () => {
  const router = useRouter(); // 2. Inisialisasi router
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const countryData = [
    {
      name: "Indonesia",
      code: "+62",
      flag: "/assets/icons/icon-indonesia.svg",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setToast({ ...toast, show: false });

    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setToast({
        show: true,
        message: "Semua kolom wajib diisi.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setToast({
        show: true,
        message: "Konfirmasi kata sandi tidak cocok.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setToast({
        show: true,
        message: "Kata sandi minimal harus 8 karakter.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal mendaftarkan akun.");
      }
      setToast({
        show: true,
        message: "Registrasi berhasil! Silakan masuk.",
        type: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setToast({ show: true, message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="bg-white border border-gray-200 flex flex-col w-full max-w-sm md:max-w-xl p-5 md:p-9 gap-5 md:gap-9 rounded-lg">
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            Pendaftaran Akun
          </h1>
          <p className="text-base text-gray-600">
            Yuk, daftarkan akunmu sekarang juga!
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="E-Mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2 md:hidden">
            <label className="text-sm text-foreground">
              Jenis Kelamin <span className="text-error-default">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-100"
              required
            >
              <option>Wanita</option>
              <option>Pria</option>
            </select>
          </div>
          <PhoneInput
            label="No. Hp"
            value={formData.phone}
            onChange={handleChange}
            countries={countryData}
          />
          <Input
            label="Kata Sandi"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
            icon={
              <Image
                src={
                  isPasswordVisible
                    ? "/assets/icons/icon-eye-on.svg"
                    : "/assets/icons/icon-eye-off.svg"
                }
                alt="Toggle"
                width={20}
                height={20}
              />
            }
          />
          <div>
            <Input
              label="Konfirmasi Kata Sandi"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onIconClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              icon={
                <Image
                  src={
                    isConfirmPasswordVisible
                      ? "/assets/icons/icon-eye-on.svg"
                      : "/assets/icons/icon-eye-off.svg"
                  }
                  alt="Toggle"
                  width={20}
                  height={20}
                />
              }
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm hover:underline">
                Lupa Password?
              </a>
            </div>
          </div>
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
    </>
  );
};

export default RegisterForm;
