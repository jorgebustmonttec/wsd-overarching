<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    const qs = useQuestionState();
  
    let title = "";
    let text  = "";
  
    const submit = (e) => {
      e.preventDefault();
      if (!title.trim() || !text.trim()) return;
      qs.add({ title, text });
      title = ""; text = "";
    };
  </script>
  
  <form onsubmit={submit} class="space-y-2">
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
    />
  
    <input type="submit" value="Add Question" />
  </form>
  