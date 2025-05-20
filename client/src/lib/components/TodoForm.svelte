<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  let todoState = useTodoState();

  const addTodo = (e) => {
    const todo = Object.fromEntries(new FormData(e.target));
    todo.id = crypto.randomUUID();
    todoState.add(todo);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addTodo} class="space-y-4 max-w-md w-full mx-auto p-4 card border-gray-300 border-[2px]">
  <h2 class="h2">Add a Todo</h2>

  <label class="label" for="name">
    <span class="label-text">Todo</span>
    <input class="input" id="name" name="name" type="text" placeholder="Enter a new todo" />
  </label>

  <label class="flex items-center space-x-2" for="done">
    <input class="checkbox" id="done" name="done" type="checkbox" />
    <span>Done</span>
  </label>

  <button type="submit" class="w-full btn preset-filled-primary-500">Add Todo</button>
</form>
