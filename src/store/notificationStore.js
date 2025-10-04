import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  show: false,
  message: "",
  type: "success",

  showToast: (message, type = "success") => {
    set({ show: true, message, type });
  },

  hideToast: () => {
    set({ show: false, message: "", type: "success" });
  },
}));
