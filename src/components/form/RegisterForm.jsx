"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Button from "../button/Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const PhoneInput = ({
  label,
  value,
  onChange,
  countries = [],
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultCountry =
    countries.length > 0
      ? countries[0]
      : {
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
            className={`w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-default focus:border-primary-default h-[46px] ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  disabled ? "text-gray-500" : "text-gray-700"
                }`}
              >
                {selectedCountry.code}
              </span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                disabled ? "text-gray-300" : "text-gray-400"
              } ${isOpen ? "rotate-180" : ""}`}
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
            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-default focus:border-primary-default ${
              disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
            }`}
            placeholder="81234567890"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
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

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  name,
  disabled = false,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">
      {label} <span className="text-error-default">*</span>
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required
        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-default focus:border-primary-default ${
          disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
        }`}
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
  </div>
);

const RegisterForm = () => {
  const router = useRouter();
  const {
    form: { register: formData },
    formLoading,
    handleFormChange,
    setRegisterFormField,
    registerUser,
  } = useUserStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const genderDropdownRef = useRef(null);

  const genderOptions = ["Perempuan", "Laki-laki"];

  const handleGenderSelect = (gender) => {
    setRegisterFormField("gender", gender);
    setIsGenderOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(router.push);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target)
      ) {
        setIsGenderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const countryData = [
    {
      name: "Indonesia",
      code: "+62",
      flag: "/assets/icons/icon-indonesia.svg",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 flex flex-col w-full max-w-sm md:max-w-xl p-5 md:p-9 gap-5 md:gap-9 rounded-lg">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-3xl font-bold text-foreground">Pendaftaran Akun</h1>
        <p className="text-base text-gray-600">
          Yuk, daftarkan akunmu sekarang juga!
        </p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          label="Nama Lengkap"
          name="name"
          value={formData.name}
          onChange={(e) => handleFormChange("register", e)}
          disabled={formLoading}
        />
        <Input
          label="E-Mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleFormChange("register", e)}
          disabled={formLoading}
        />

        <div className="relative flex flex-col gap-2" ref={genderDropdownRef}>
          <label className="text-sm font-medium text-gray-700">
            Jenis Kelamin <span className="text-error-default">*</span>
          </label>
          <button
            type="button"
            onClick={() => !formLoading && setIsGenderOpen(!isGenderOpen)}
            className={`w-full flex justify-between items-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-default focus:border-primary-default h-[46px] ${
              formLoading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            disabled={formLoading}
          >
            <span
              className={formData.gender ? "text-gray-900" : "text-gray-400"}
            >
              {formData.gender || "Pilih Jenis Kelamin"}
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${
                formLoading ? "text-gray-300" : "text-gray-400"
              } ${isGenderOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isGenderOpen && (
            <div className="absolute top-full z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <ul>
                {genderOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => handleGenderSelect(option)}
                      className={`w-full text-left px-4 py-2.5 text-sm ${
                        formData.gender === option
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <PhoneInput
          label="No. Hp"
          value={formData.phone}
          onChange={(e) => handleFormChange("register", e)}
          countries={countryData}
          disabled={formLoading}
        />
        <Input
          label="Kata Sandi"
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={(e) => handleFormChange("register", e)}
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
          disabled={formLoading}
        />
        <Input
          label="Konfirmasi Kata Sandi"
          type={isConfirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleFormChange("register", e)}
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
          disabled={formLoading}
          required={!!formData.password}
        />

        <div className="flex flex-col gap-4 mt-2">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            size="md"
            className="w-full"
            disabled={formLoading}
          >
            {formLoading ? "Mendaftarkan..." : "Daftar"}
          </Button>
          <Button
            type="button"
            variant="light"
            color="primary"
            size="md"
            className="w-full"
            onClick={() => router.push("/login")}
            disabled={formLoading}
          >
            Masuk
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        {" "}
        <div className="flex-grow border-t border-gray-200"></div>{" "}
        <span className="text-sm text-gray-400">atau</span>{" "}
        <div className="flex-grow border-t border-gray-200"></div>{" "}
      </div>
      <Button
        variant="outline"
        color="primary"
        size="md"
        className="w-full flex items-center justify-center gap-2 !border-gray-100 !text-gray-700 hover:!bg-gray-50"
        disabled={formLoading}
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
