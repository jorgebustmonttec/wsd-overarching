<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();

    let { question, courseId } = $props(); // Use $props() for Svelte 5 compatibility

    const handleUpvote = async () => {
      await qs.upvote(courseId, question.id); // Use courseId when upvoting
    };

    const handleDelete = async () => {
      await qs.remove(courseId, question.id); // Use courseId when deleting
    };
  </script>

  <div class="border border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-2">
    <h3 class="text-lg font-semibold text-gray-800">{question.title}</h3>
    <p class="text-gray-600">{question.text}</p>

    <p class="text-sm text-gray-500">Upvotes: {question.upvotes}</p>

    <div class="flex space-x-2">
      <button
        onclick={handleUpvote}
        class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-md"
      >
        Upvote
      </button>
      <button
        onclick={handleDelete}
        class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md"
      >
        Delete
      </button>
       <a
        href={`/courses/${courseId}/questions/${question.id}`}
        class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
      >
        View Replies
      </a>
    </div>
  </div>