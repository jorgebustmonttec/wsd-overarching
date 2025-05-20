<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();

    export let courseId; // Accept courseId as a prop

    let title = "";
    let text  = "";
    let submitting = false;

    const submit = async (e) => {
      e.preventDefault();
      if (!title.trim() || !text.trim() || submitting) return;

      submitting = true;
      await qs.add(courseId, { title, text }); // Use courseId when adding a question
      title = "";
      text = "";
      submitting = false;
    };
  </script>

  <form on:submit={submit} class="space-y-4 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
      <input
        type="text"
        id="title"
        placeholder="Enter question title"
        bind:value={title}
        required
        class="input w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="text" class="block text-sm font-medium text-gray-700 mb-1">Question Details</label>
      <textarea
        id="text"
        rows="4"
        placeholder="Enter question details"
        bind:value={text}
        required
        class="input w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        disabled={submitting}
        class="btn w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-all disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Question"}
      </button>
    </div>
  </form>