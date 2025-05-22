<script>
  import "../app.css";
  let { children, data } = $props();
</script>

{#if data.user}
  <p>Hello {data.user}!</p>
{/if}

<main class="container mx-auto max-w-lg">
  {@render children()}
</main>