<script>
  import { executeQuery } from "$lib/apis/database-api.js";

  let query = $state("");
  let result = $state([]);
  let rowCount = $state(0);
  let columnNames = $state([]);
  
  const runSQL = async () => {
    result = await executeQuery(query);
    rowCount = result.length;
    columnNames = result.length > 0 ? Object.keys(result[0]) : [];
  };
</script>

<h1>SQL Interface</h1>

<h2>Write query here</h2>

<textarea bind:value={query}></textarea><br />
<button onclick={runSQL}>Execute query</button>

<h2>Query results:</h2>

<p>{JSON.stringify(result)}</p>

{#if result.length > 0}
  <p>Rows: {rowCount}</p>

  <h3>Column names</h3>
  <ul>
    {#each columnNames as name}
      <li>{name}</li>
    {/each}
  </ul>
{/if}

