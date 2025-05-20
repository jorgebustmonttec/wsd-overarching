<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  let todoState = useTodoState();

  let { todo } = $props();
</script>

<div class="flex items-center space-x-4 card border-[2px] p-4 border-gray-300">
  <span class="text-xl">{todo.done ? "✅" : "❌"}</span>

  <label for={todo.id} class="grow">
    {todo.name}
    <span class="text-sm block text-gray-500">({todo.done ? "done" : "not done"})</span>
  </label>

  <input
    type="checkbox"
    class="checkbox"
    onchange={() => todoState.changeDone(todo.id)}
    id={todo.id}
  />

  <button class="text-2xl" onclick={() => todoState.remove(todo.id)}>🗑</button>
</div>
