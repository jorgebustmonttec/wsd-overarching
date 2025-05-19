<form class="mx-auto w-full max-w-md space-y-4">
  <h2 class="h2">Create a todo</h2>

  <label for="name" class="label">
    <span class="label-text">Name</span>
    <input class="input" type="text" id="name" name="name" />
  </label>

  <label class="flex items-center space-x-2">
    <input class="checkbox" type="checkbox" id="completed" name="completed" />
    <p>Completed</p>
  </label>

  <button type="submit" class="w-full btn preset-filled-primary-500">
    Create
  </button>
</form>