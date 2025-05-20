import { PUBLIC_API_URL } from "$env/static/public";

// Constants
const API_BASE_URL = PUBLIC_API_URL; // Use the environment variable

// API endpoints for courses
export const courseApi = {
  // Get all courses
  async getCourses() {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return response.json();
  },

  // Get a single course by ID
  async getCourse(courseId) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
    return response.json();
  },

  // Add a new course
  async addCourse(course) {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    return response.json();
  },

  // Delete a course by ID
  async deleteCourse(courseId) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
    });
    return response.json();
  },
};