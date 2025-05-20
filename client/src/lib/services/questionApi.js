import { PUBLIC_API_URL } from "$env/static/public";

// Constants
const API_BASE_URL = PUBLIC_API_URL; // Use the environment variable

// API endpoints for questions
export const questionApi = {
  // Get all questions for a specific course
  async getQuestions(courseId) {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/questions`);
    return response.json();
  },

  // Add a new question to a specific course
  async addQuestion(courseId, question) {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    return response.json();
  },

  // Upvote a question for a specific course
  async upvoteQuestion(courseId, questionId) {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/questions/${questionId}/upvote`, {
      method: "POST",
    });
    return response.json();
  },

  // Delete a question for a specific course
  async deleteQuestion(courseId, questionId) {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/questions/${questionId}`, {
      method: "DELETE",
    });
    return response.json();
  },
};