// Svelte 5 file ⇒ keep the .svelte.js suffix so $state() is available
import { questionApi } from "$lib/services/questionApi.js";

let questions = $state([]);               // shared reactive array
let loading = $state(false);
let error = $state(null);

// Load questions initially
const loadQuestions = async () => {
  try {
    loading = true;
    error = null;
    questions = await questionApi.getQuestions();
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
  async fetchQuestions() {
    await loadQuestions();
  },

  async add({ title, text }) {
    try {
      loading = true;
      await questionApi.addQuestion({ title, text });
      await loadQuestions(); // Refresh the list
    } catch (err) {
      error = "Failed to add question";
      console.error(err);
    } finally {
      loading = false;
    }
  },

  async remove(id) {
    try {
      loading = true;
      await questionApi.deleteQuestion(id);
      await loadQuestions(); // Refresh the list
    } catch (err) {
      error = "Failed to delete question";
      console.error(err);
    } finally {
      loading = false;
    }
  },

  async upvote(id) {
    try {
      loading = true;
      await questionApi.upvoteQuestion(id);
      await loadQuestions(); // Refresh the list
    } catch (err) {
      error = "Failed to upvote question";
      console.error(err);
    } finally {
      loading = false;
    }
  },
});

export { useQuestionState };