<script>
    import Questions from "$lib/components/Questions.svelte";
    import { goto } from "$app/navigation";
  </script>
  
  <h1>Welcome!</h1>
  <button on:click={() => goto('/courses')}>Courses</button>

  <Questions />
