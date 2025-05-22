<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  let notes = $state([]);
  let error = $state("");
  let text = $state("");

  const fetchNotes = async () => {
    error = "";
    const response = await fetch(`${PUBLIC_API_URL}/api/notes`, {
      credentials: "include",
    });

    if (!response.ok) {
      error = "Failed to fetch notes.";
      return;
    }

    notes = await response.json();
  };

  const addNote = async () => {
    error = "";
    const response = await fetch(`${PUBLIC_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      error = "Failed to add note.";
      return;
    }

    text = "";
    fetchNotes();
  };
</script>

<button class="btn preset-filled-primary-500" onclick={fetchNotes}
  >Fetch notes</button
>

<h2 class="text-xl">Notes</h2>

{#if error}
  <p class="text-xl">{error}</p>
{/if}

<ul>
  {#each notes as note}
    <li><a href="/notes/{note.id}">{note.text}</a></li>
  {/each}

  <li class="flex items-center">
    <input class="input" type="text" bind:value={text} />
    <button
      type="button"
      class="btn ml-2 preset-filled-primary-500"
      onclick={addNote}>Add note</button
    >
  </li>
</ul>