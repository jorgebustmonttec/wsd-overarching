<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  import TodoItem from "./TodoItem.svelte";

  let todoState = useTodoState();
</script>

<ul class="space-y-4 max-w-md w-full mx-auto mt-6">
  {#each todoState.todos as todo (todo.id)}
    <li>
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
