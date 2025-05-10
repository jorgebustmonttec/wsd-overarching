import { writable } from 'svelte/store';

let nextId = 1;

const createQuestionStore = () => {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: ({ title, text }) => update(questions => [
      ...questions,
      { id: nextId++, title, text, upvotes: 0 }
    ]),
    delete: (id) => update(questions => questions.filter(q => q.id !== id)),
    upvote: (id) => update(questions =>
      questions.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q)
    )
  };
};

export const questionState = createQuestionStore();
