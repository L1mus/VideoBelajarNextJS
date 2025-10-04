import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  course: null,
  paymentMethods: {
    bankTransfer: [],
    eWallet: [],
    creditCard: [],
  },
  selectedMethodId: null,
  isLoading: false,
  error: null,

  setCourse: (courseData) => set({ course: courseData }),

  fetchPaymentMethods: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/payment-methods");
      if (!response.ok) {
        throw new Error("Gagal memuat metode pembayaran");
      }
      const data = await response.json();
      set({ paymentMethods: data, isLoading: false });
    } catch (error) {
      console.error("Fetch Payment Methods Error:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  setSelectedMethodId: (id) => set({ selectedMethodId: id }),

  resetCheckout: () =>
    set({
      course: null,
      selectedMethodId: null,
    }),
}));
