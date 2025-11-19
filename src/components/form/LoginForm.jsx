"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
    password: z.string().min(1, "Kata sandi wajib diisi"),
});

const Input = ({
                   label,
                   type = "text",
                   placeholder,
                   icon,
                   onIconClick,
                   register,
                   name,
                   error,
               }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">
            {label} <span className="text-error-default">*</span>
        </label>
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:ring-primary-200"
                }`}
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
        {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
);

const LoginForm = () => {
    const router = useRouter();
    const { loginUser } = useUserStore();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        const success = await loginUser(data); // Kirim data { email, password }
        if (success) {
            router.push("/");
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white border border-gray-200 flex flex-col w-full max-w-sm md:max-w-lg p-5 md:p-9 gap-5 md:gap-9 rounded-lg">
            <div className="flex flex-col text-center gap-2">
                <h1 className="text-3xl font-bold text-foreground">Masuk ke Akun</h1>
                <p className="text-base">Yuk, lanjutin belajarmu di videobelajar.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="E-Mail"
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    placeholder="Masukkan email Anda"
                />
                <div>
                    <Input
                        label="Kata Sandi"
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        register={register}
                        error={errors.password}
                        placeholder="Masukkan kata sandi"
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
                        disabled={isLoading}
                    >
                        {isLoading ? "Memproses..." : "Masuk"}
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