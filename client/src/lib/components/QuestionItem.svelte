<script>
    export let question;
    import { questionState } from '$lib/states/questionState.svelte.js';
  </script>
  
  <div>
    <h3>{question.title}</h3>
    <p>{question.text}</p>
    <p>Upvotes: {question.upvotes}</p>
    <button on:click={() => questionState.upvote(question.id)}>Upvote</button>
    <button on:click={() => questionState.delete(question.id)}>Delete</button>
  </div>
  