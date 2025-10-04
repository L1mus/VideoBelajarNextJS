"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Button from "../button/Button";

const Input = ({
  label,
  type = "text",
  placeholder,
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
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
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

const LoginForm = () => {
  const router = useRouter();

  const {
    form: { login: formData },
    formLoading,
    handleFormChange,
    loginUser,
  } = useUserStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(router.push);
  };

  return (
    <div className="bg-white border border-gray-200 flex flex-col w-full max-w-sm md:max-w-lg p-5 md:p-9 gap-5 md:gap-9 rounded-lg">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-3xl font-bold text-foreground">Masuk ke Akun</h1>
        <p className="text-base">Yuk, lanjutin belajarmu di videobelajar.</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          label="E-Mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleFormChange("login", e)}
        />
        <div>
          <Input
            label="Kata Sandi"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) => handleFormChange("login", e)}
            onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
            icon={
              <Image
                src={
                  isPasswordVisible
                    ? "/assets/icons/icon-eye-on.svg"
                    : "/assets/icons/icon-eye-off.svg"
                }
                alt="Toggle visibility"
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
            disabled={formLoading}
          >
            {formLoading ? "Memproses..." : "Masuk"}
          </Button>
          <Button
            type="button"
            variant="light"
            color="primary"
            size="md"
            className="w-full"
            onClick={() => router.push("/register")}
          >
            Daftar
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
        <span>Masuk dengan Google</span>
      </Button>
    </div>
  );
};

export default LoginForm;
