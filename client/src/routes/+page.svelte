<script>
	import Todo from "$lib/components/Todo.svelte";
	import { fade } from "svelte/transition";

  let todos = $state([
    { name: "First todo", done: false },
    { name: "Second todo", done: true },
    { name: "Third todo", done: false },
  ]);

  const remove = (todo) => {
    todos = todos.filter((t) => t !== todo);
  };
</script>

<ul class="space-y-4">
  {#each todos as todo (todo)}
    <li transition:fade>
      <Todo {todo} removeTodo={() => remove(todo)} />
    </li>
  {/each}
</ul>