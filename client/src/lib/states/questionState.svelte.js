// Svelte 5 file ⇒ keep the .svelte.js suffix so $state() is available
import { questionApi } from "$lib/services/questionApi.js";

let questions = $state([]);               // shared reactive array
let loading = $state(false);
let error = $state(null);

// Load questions for a specific course
const loadQuestions = async (courseId) => {
  try {
    loading = true;
    error = null;
    questions = await questionApi.getQuestions(courseId);
  } catch (err) {
    error = "Failed to load questions";
    console.error(err);
  } finally {
    loading = false;
  }
};

const useQuestionState = () => ({
  // --- getters -----------------------------------------------------------
  get list()           { return questions; },
  get isLoading()      { return loading; },
  get hasError()       { return error; },

  // --- actions -----------------------------------------------------------
  async fetchQuestions(courseId) {
    await loadQuestions(courseId);
  },

  async add(courseId, { title, text }) {
    try {
      loading = true;
      await questionApi.addQuestion(courseId, { title, text });
      await loadQuestions(courseId); // Refresh the list
    } catch (err) {
      error = "Failed to add question";
      console.error(err);
    } finally {
      loading = false;
    }
  },

  async remove(courseId, questionId) {
    try {
      loading = true;
      await questionApi.deleteQuestion(courseId, questionId);
      await loadQuestions(courseId); // Refresh the list
    } catch (err) {
      error = "Failed to delete question";
      console.error(err);
    } finally {
      loading = false;
    }
  },

  async upvote(courseId, questionId) {
    try {
      loading = true;
      await questionApi.upvoteQuestion(courseId, questionId);
      await loadQuestions(courseId); // Refresh the list
    } catch (err) {
      error = "Failed to upvote question";
      console.error(err);
    } finally {
      loading = false;
    }
  },
});

export { useQuestionState };