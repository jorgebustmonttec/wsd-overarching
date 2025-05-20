<script>
  import { onMount } from "svelte";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  import QuestionForm from "./QuestionForm.svelte";
  import QuestionItem from "./QuestionItem.svelte";

  export let courseId;

  const qs = useQuestionState();

  // Fetch questions for the specific course on mount
  onMount(() => {
    qs.fetchQuestions(courseId);
  });
</script>

<div class="space-y-6">
  <h1 class="text-2xl font-bold text-gray-800">Ask &amp; Vote Questions</h1>

  <div class="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
    <QuestionForm {courseId} />
  </div>

  <hr class="border-gray-300" />

  <h2 class="text-xl font-semibold text-gray-700">Questions</h2>
  {#if qs.isLoading}
    <p class="text-gray-500">Loading questions...</p>
  {:else if qs.hasError}
    <p class="text-red-500 font-semibold">Error: {qs.hasError}</p>
  {:else if qs.list.length === 0}
    <p class="text-gray-500">No questions yet. Be the first to ask!</p>
  {:else}
    <ul class="space-y-4">
      {#each qs.list as question}
        <li>
          <QuestionItem {question} {courseId} />
        </li>
      {/each}
    </ul>
  {/if}
</div>