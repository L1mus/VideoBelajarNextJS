import { create } from "zustand";
import { signIn } from "next-auth/react";
import { useNotificationStore } from "./notificationStore";

export const useUserStore = create((set) => ({
    session: null,
    isAuthenticated: false,
    isLoading: true,

    setSession: (sessionData) => {
        set({
            session: sessionData,
            isAuthenticated: !!sessionData,
            isLoading: false,
        });
    },

    clearSession: () => {
        set({
            session: null,
            isAuthenticated: false,
            isLoading: false,
        });
    },

    loginUser: async ({ email, password }) => {
        const { showToast } = useNotificationStore.getState();
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                throw new Error("Email atau kata sandi salah.");
            }

            showToast("Login berhasil!", "success");
            return true;
        } catch (err) {
            showToast(err.message, "error");
            return false;
        }
    },
}));