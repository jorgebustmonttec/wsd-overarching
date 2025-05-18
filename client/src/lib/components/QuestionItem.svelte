<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();
  
    // prop
    let { question } = $props();
    
    const handleUpvote = async () => {
      await qs.upvote(question.id);
    };
    
    const handleDelete = async () => {
      await qs.remove(question.id);
    };
  </script>
  
  <div class="border p-2 space-y-1">
    <h3>{question.title}</h3>
    <p>{question.text}</p>
  
    <p>Upvotes: {question.upvotes}</p>
  
    <button onclick={handleUpvote}>Upvote</button>
    <button onclick={handleDelete}>Delete</button>
  </div>
