<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    import QuestionItem from "./QuestionItem.svelte";
    const qs = useQuestionState();
  </script>
  
  {#if qs.list.length === 0}
    <p>No questions yet.</p>
  {:else}
    <ul class="space-y-2">
      {#each qs.list as q (q.id)}
        <li><QuestionItem question={q} /></li>
      {/each}
    </ul>
  {/if}
  