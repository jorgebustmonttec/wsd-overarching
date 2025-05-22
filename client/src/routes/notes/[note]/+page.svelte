<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  let { data } = $props();
  let note = $state({});
  let error = $state("");

  const fetchNote = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/notes/${data.note}`, {
      credentials: "include",
    });

    if (!response.ok) {
      error = "Failed to fetch note.";
      return;
    }

    note = await response.json();
  };

  $effect(() => {
    fetchNote();
  });
</script>

<p>Viewing note with identifier {data.note}</p>

{#if error && error.length > 0}
  <p class="text-xl">${error}</p>
{/if}

<p>{note.text}</p>