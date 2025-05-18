<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();
  
    let title = "";
    let text  = "";
    let submitting = false;
  
    const submit = async (e) => {
      e.preventDefault();
      if (!title.trim() || !text.trim() || submitting) return;
      
      submitting = true;
      await qs.add({ title, text });
      title = ""; 
      text = "";
      submitting = false;
    };
  </script>
  
  <form on:submit={submit} class="space-y-2">
    <input
      type="text"
      placeholder="Question title"
      bind:value={title}
      required
    />

    <br />
    <br />
  
    <textarea
      rows="4"
      placeholder="Question details"
      bind:value={text}
      required
    ></textarea>
  
    <input type="submit" value="Add Question" disabled={submitting} />
  </form>
