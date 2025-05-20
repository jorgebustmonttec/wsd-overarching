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

  <div class="border p-2 space-y-1">
    <h3>{question.title}</h3>
    <p>{question.text}</p>

    <p>Upvotes: {question.upvotes}</p>

    <button onclick={handleUpvote}>Upvote</button>
    <button onclick={handleDelete}>Delete</button>
  </div>