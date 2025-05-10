<script>
    import { questionState } from '$lib/states/questionState.svelte.js';
    import QuestionItem from './QuestionItem.svelte';
  </script>
  
  {#each $questionState as question (question.id)}
    <QuestionItem {question} />
  {/each}
  