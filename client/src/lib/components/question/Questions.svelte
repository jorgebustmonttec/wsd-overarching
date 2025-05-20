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

<h1>Ask &amp; Vote Questions</h1>

<QuestionForm {courseId} />

<hr />

<h2>Questions</h2>
{#if qs.isLoading}
  <p>Loading questions...</p>
{:else if qs.hasError}
  <p>Error: {qs.hasError}</p>
{:else if qs.list.length === 0}
  <p>No questions yet. Be the first to ask!</p>
{:else}
  <ul>
    {#each qs.list as question}
      <li>
        <QuestionItem {question} {courseId} />
      </li>
    {/each}
  </ul>
{/if}
