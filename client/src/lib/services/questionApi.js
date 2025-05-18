import { PUBLIC_API_URL } from "$env/static/public";

// Constants
const COURSE_ID = 1;
const API_BASE_URL = PUBLIC_API_URL; // Use the environment variable

// API endpoints for questions
export const questionApi = {
  // Get all questions for course 1
  async getQuestions() {
    const response = await fetch(`${API_BASE_URL}/courses/${COURSE_ID}/questions`);
    return response.json();
  },

  // Add a new question
  async addQuestion(question) {
    const response = await fetch(`${API_BASE_URL}/courses/${COURSE_ID}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    return response.json();
  },

  // Upvote a question
  async upvoteQuestion(questionId) {
    const response = await fetch(`${API_BASE_URL}/courses/${COURSE_ID}/questions/${questionId}/upvote`, {
      method: "POST",
    });
    return response.json();
  },

  // Delete a question
  async deleteQuestion(questionId) {
    const response = await fetch(`${API_BASE_URL}/courses/${COURSE_ID}/questions/${questionId}`, {
      method: "DELETE",
    });
    return response.json();
  }
};
