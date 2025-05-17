<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();
  
    // prop
    let { question } = $props();
  </script>
  
  <div class="border p-2 space-y-1">
    <h3>{question.title}</h3>
    <p>{question.text}</p>
  
    <p>Upvotes: {question.upvotes}</p>
  
    <button onclick={() => qs.upvote(question.id)}>Upvote</button>
    <button onclick={() => qs.remove(question.id)}>Delete</button>
  </div>
  