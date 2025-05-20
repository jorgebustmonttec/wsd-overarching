import { courseApi } from "$lib/services/courseApi.js";

let courses = $state([]); // shared reactive array
let loading = $state(false);
let error = $state(null);

// Load courses
const loadCourses = async () => {
  try {
    loading = true;
    error = null;
    courses = await courseApi.getCourses();
  } catch (err) {
    error = "Failed to load courses";
    console.error(err);
  } finally {
    loading = false;
  }
};

const useCourseState = () => ({
  // --- getters -----------------------------------------------------------
  get list()           { return courses; },
  get isLoading()      { return loading; },
  get hasError()       { return error; },

  // --- actions -----------------------------------------------------------
  async fetchCourses() {
    await loadCourses();
  },

  async add({ name }) {
    try {
      loading = true;
      await courseApi.addCourse({ name });
      await loadCourses(); // Refresh the list
    } catch (err) {
      error = "Failed to add course";
      console.error(err);
    } finally {
      loading = false;
    }
  },

  async remove(courseId) {
    try {
      loading = true;
      await courseApi.deleteCourse(courseId);
      await loadCourses(); // Refresh the list
    } catch (err) {
      error = "Failed to delete course";
      console.error(err);
    } finally {
      loading = false;
    }
  },
});

export { useCourseState };