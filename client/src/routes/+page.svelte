<form class="max-w-sm mx-auto mt-6">
  <h2 class="text-2xl mb-4">Create a todo</h2>
  <div class="mb-4">
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      class="w-full"
      placeholder="Enter name"
    />
  </div>

  <div class="mb-4 items-center">
    <input type="checkbox" id="completed" name="completed" />
    <label for="completed" class="ml-2">Completed</label>
  </div>

  <input
    type="submit"
    class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
    value="Create"
  />
</form>