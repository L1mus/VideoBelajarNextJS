import { create } from "zustand";

export const useCourseStore = create((set, get) => ({
    courses: [],
    categories: ["Semua Kelas"],
    selectedCourse: null,
    isLoading: true,
    isLoadingDetails: false,
    error: null,
    activeTab: "Semua Kelas",
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 0,
    abortController: null,

    fetchData: async (category = "Semua Kelas", page = 1) => {
        const currentController = get().abortController;
        if (currentController) {
            currentController.abort();
        }
        const newController = new AbortController();
        const signal = newController.signal;

        set({
            isLoading: true,
            error: null,
            activeTab: category,
            currentPage: page,
            abortController: newController
        });

        try {
            const query = new URLSearchParams({
                category: category,
                page: page.toString(),
                limit: get().itemsPerPage.toString(),
            });

            const coursesPromise = fetch(`/api/courses?${query}`, { signal });
            const needCategories = get().categories.length <= 1;
            const promises = [coursesPromise];
            if (needCategories) {
                promises.push(fetch("/api/categories"));
            }

            const responses = await Promise.all(promises);
            const coursesRes = responses[0];
            const categoriesRes = needCategories ? responses[1] : null;
            if (!coursesRes.ok || (categoriesRes && !categoriesRes.ok)) {
                throw new Error("Gagal memuat data dari server");
            }

            const coursesData = await coursesRes.json();
            let categoriesUpdate = {};
            if (categoriesRes) {
                const categoriesData = await categoriesRes.json();
                categoriesUpdate = {
                    categories: ["Semua Kelas", ...categoriesData.map((cat) => cat.name)]
                };
            }

            set({
                courses: coursesData.data || [],
                totalItems: coursesData.total || 0,
                ...categoriesUpdate,
                isLoading: false,
                abortController: null,
            });

        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request dibatalkan (pindah tab/page)');
            } else {
                set({ error: err.message, isLoading: false, abortController: null });
            }
        }
    },

    fetchCourseById: async (id) => {
        set({ isLoadingDetails: true, error: null });
        try {
            const response = await fetch(`/api/courses/${id}`);
            if (!response.ok) {
                throw new Error("Gagal memuat detail kursus.");
            }
            const courseData = await response.json();
            set({ selectedCourse: courseData, isLoadingDetails: false });
        } catch (err) {
            set({ error: err.message, isLoadingDetails: false });
        }
    },

    setSelectedCourse: (course) => {
        set({ selectedCourse: course });
    },

    setActiveTab: (tab) => {
        get().fetchData(tab, 1);
    },


    setCurrentPage: (page) => {
        const currentTab = get().activeTab;
        get().fetchData(currentTab, page);
        window.scrollTo(0, 0);
    },
}));