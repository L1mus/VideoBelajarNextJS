"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { useNotificationStore } from "@/store/notificationStore";

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
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    gender: initialData.gender || "Perempuan",
    phone: initialData.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const genderDropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useNotificationStore();

  const genderOptions = ["Perempuan", "Laki-laki"];
  const countryData = [
    {
      name: "Indonesia",
      code: "+62",
      flag: "/assets/icons/icon-indonesia.svg",
    },
  ];
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const countryCodeDropdownRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(
    countryData[0] || { code: "+62" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender: gender }));
    setIsGenderOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password && formData.password !== formData.confirmPassword) {
      showToast("Konfirmasi kata sandi tidak cocok.", "error");
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
    };

    if (formData.password && formData.password.trim() !== "") {
      if (formData.password.length < 8) {
        showToast("Kata sandi minimal harus 8 karakter.", "error");
        setIsLoading(false);
        return;
      }
      dataToSend.password = formData.password;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Gagal memperbarui profil.");
      showToast("Profil berhasil diperbarui!", "success");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error) {
      console.error("Submit error:", error);
      showToast(error.message || "Terjadi kesalahan.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target)
      ) {
        setIsGenderOpen(false);
      }
      if (
        countryCodeDropdownRef.current &&
        !countryCodeDropdownRef.current.contains(event.target)
      ) {
        setIsCountryCodeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            {formData.name || "Nama Pengguna"}
          </p>
          <p className="text-base text-gray-500">
            {formData.email || "email@contoh.com"}
          </p>
          <button
            type="button"
            className="text-sm text-error-pressed hover:underline mt-1 font-medium"
          >
            {" "}
            Ganti Foto Profil{" "}
          </button>
        </div>
      </div>
      <Fieldset legend="Nama Lengkap">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-none focus:outline-none focus:ring-0 bg-transparent p-0"
          disabled={isLoading}
        />
      </Fieldset>
      <Fieldset legend="E-Mail">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border-none focus:outline-none focus:ring-0 bg-transparent p-0 text-gray-500 cursor-not-allowed"
        />
      </Fieldset>
      <div className="relative" ref={genderDropdownRef}>
        <Fieldset legend="Jenis Kelamin">
          <button
            type="button"
            onClick={() => setIsGenderOpen(!isGenderOpen)}
            className="w-full flex justify-between items-center border-none focus:outline-none focus:ring-0 bg-transparent p-0"
            disabled={isLoading}
          >
            <span>{formData.gender || "Pilih Jenis Kelamin"}</span>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isGenderOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </Fieldset>
        {isGenderOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {" "}
            <ul>
              {" "}
              {genderOptions.map((option) => (
                <li key={option}>
                  {" "}
                  <button
                    type="button"
                    onClick={() => handleGenderSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-sm ${
                      formData.gender === option
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {" "}
                    {option}{" "}
                  </button>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        {" "}
        <div className="relative w-1/4" ref={countryCodeDropdownRef}>
          <button
            type="button"
            className={`w-full flex items-center justify-evenly border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-default focus:border-primary-default h-[42.39px] ${
              isLoading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              !isLoading && setIsCountryCodeOpen(!isCountryCodeOpen)
            }
            disabled={isLoading}
          >
            <span
              className={`text-sm font-medium ${
                isLoading ? "text-gray-500" : "text-gray-700"
              }`}
            >
              {selectedCountry.code}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                isLoading ? "text-gray-300" : "text-gray-400"
              } ${isCountryCodeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isCountryCodeOpen && countryData.length > 0 && (
            <ul className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto w-56">
              {countryData.map((country) => (
                <li
                  key={country.code}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsCountryCodeOpen(false);
                  }}
                >
                  <span>
                    {country.name} ({country.code})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative w-full -mt-3">
          {" "}
          <Fieldset
            legend="No. Hp"
            className="m-0 p-0"
            legendClassName="left-4"
          >
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
              placeholder="81234567890"
              disabled={isLoading}
            />
          </Fieldset>
        </div>
      </div>

      <Fieldset legend="Password">
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password baru (opsional)"
            className="w-full border-none focus:outline-none focus:ring-0 bg-transparent pr-10 p-0"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center text-gray-500 hover:text-gray-700 -top-2.5 pr-0"
            disabled={isLoading}
          >
            {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
      </Fieldset>

      <Fieldset legend="Konfirmasi Password">
        <div className="relative">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Konfirmasi password baru"
            className="w-full border-none focus:outline-none focus:ring-0 bg-transparent pr-10 p-0"
            disabled={isLoading}
            required={!!formData.password}
          />
          <button
            type="button"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            className="absolute inset-y-0 right-0 flex items-center text-gray-500 hover:text-gray-700 -top-2.5 pr-0"
            disabled={isLoading}
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
          disabled={isLoading}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
