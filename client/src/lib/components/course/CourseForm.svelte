<script>
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  const cs = useCourseState();

  let name = "";
  let submitting = false;

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    submitting = true;
    await cs.add({ name });
    name = "";
    submitting = false;
  };
</script>

<form on:submit={submit} class="space-y-4 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
    <input
      type="text"
      id="name"
      placeholder="Enter course name"
      bind:value={name}
      required
      class="input"
    />
  </div>
  <div class="flex justify-end">
    <button
      type="submit"
      disabled={submitting}
      class="btn preset-filled-primary-500 w-full"
    >
      {submitting ? "Adding..." : "Add Course"}
    </button>
  </div>
</form>