<script>
    import { questionState } from '$lib/states/questionState.svelte.js';
  
    let title = '';
    let text = '';
  
    function submitForm(event) {
      event.preventDefault();
      if (title && text) {
        questionState.add({ title, text });
        title = '';
        text = '';
      }
    }
  </script>
  
  <form on:submit={submitForm}>
    <input type="text" bind:value={title} placeholder="Title" required />
    <textarea bind:value={text} placeholder="Your question" required></textarea>
    <input type="submit" value="Add Question" />
  </form>
  