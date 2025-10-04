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

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [coursesRes, categoriesRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/categories"),
      ]);
      if (!coursesRes.ok || !categoriesRes.ok) {
        throw new Error("Gagal memuat data");
      }
      const coursesData = await coursesRes.json();
      const categoriesData = await categoriesRes.json();

      set({
        courses: coursesData.courses || [],
        categories: ["Semua Kelas", ...categoriesData.map((cat) => cat.name)],
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
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
    set({ activeTab: tab, currentPage: 1 });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    window.scrollTo(0, 0);
  },

  getFilteredCourses: () => {
    const { courses, activeTab } = get();
    if (activeTab === "Semua Kelas") {
      return courses;
    }
    return courses.filter(
      (course) =>
        Array.isArray(course.course_categories) &&
        course.course_categories.some(
          (cc) => cc.category && cc.category.name === activeTab
        )
    );
  },

  getCurrentPageCourses: () => {
    const { currentPage, itemsPerPage } = get();
    const filteredCourses = get().getFilteredCourses();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  },
}));
