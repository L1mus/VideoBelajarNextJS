import { create } from "zustand";
import { signIn } from "next-auth/react";
import { useNotificationStore } from "./notificationStore";

export const useUserStore = create((set, get) => ({
  session: null,
  isAuthenticated: false,
  isLoading: true,

  form: {
    login: { email: "", password: "" },
    register: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  },
  formLoading: false,
  formError: null,

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

  handleFormChange: (formType, event) => {
    const { name, value } = event.target;
    set((state) => ({
      form: {
        ...state.form,
        [formType]: {
          ...state.form[formType],
          [name]: value,
        },
      },
    }));
  },

  loginUser: async (routerPush) => {
    set({ formLoading: true, formError: null });
    const { email, password } = get().form.login;
    const { showToast } = useNotificationStore.getState();

    try {
      if (!email || !password) {
        throw new Error("Email dan kata sandi harus diisi.");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        throw new Error("Email atau kata sandi salah.");
      }

      showToast("Login berhasil!", "success");
      routerPush("/");
    } catch (err) {
      set({ formError: err.message });
      showToast(err.message, "error");
    } finally {
      set({ formLoading: false });
    }
  },

  registerUser: async (routerPush) => {
    set({ formLoading: true, formError: null });
    const { name, email, password, confirmPassword } = get().form.register;
    const { showToast } = useNotificationStore.getState();

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Semua kolom wajib diisi.");
      }
      if (password !== confirmPassword) {
        throw new Error("Konfirmasi kata sandi tidak cocok.");
      }
      if (password.length < 8) {
        throw new Error("Kata sandi minimal harus 8 karakter.");
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal mendaftarkan akun.");
      }

      showToast(
        "Registrasi berhasil! Anda akan diarahkan untuk login.",
        "success"
      );
      set((state) => ({
        form: {
          ...state.form,
          register: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          },
        },
      }));

      setTimeout(() => {
        routerPush("/login");
      }, 2000);
    } catch (err) {
      set({ formError: err.message });
      showToast(err.message, "error");
    } finally {
      set({ formLoading: false });
    }
  },
}));
