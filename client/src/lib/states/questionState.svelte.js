// Svelte 5 file ⇒ keep the .svelte.js suffix so $state() is available

let questions = $state([]);               // shared reactive array

const useQuestionState = () => ({
  // --- getters -----------------------------------------------------------
  get list()            { return questions; },

  // --- actions -----------------------------------------------------------
  add({ title, text })  {
    questions.push({
      id: crypto.randomUUID(),            // unique id
      title,
      text,
      upvotes: 0,
    });
  },

  remove(id)            { questions = questions.filter(q => q.id !== id); },

  upvote(id)            {
    const q = questions.find(q => q.id === id);
    if (q) q.upvotes++;
  },
});

export { useQuestionState };
