<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    import QuestionItem from "./QuestionItem.svelte";
    import { onMount } from "svelte";
    
    const qs = useQuestionState();
    
    onMount(async () => {
      await qs.fetchQuestions();
    });
  </script>
  
  {#if qs.isLoading}
    <p>Loading questions...</p>
  {:else if qs.hasError}
    <p class="error">Error: {qs.hasError}</p>
  {:else if qs.list.length === 0}
    <p>No questions yet.</p>
  {:else}
    <ul class="space-y-2">
      {#each qs.list as q (q.id)}
        <li><QuestionItem question={q} /></li>
      {/each}
    </ul>
  {/if}
