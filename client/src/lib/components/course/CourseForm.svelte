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
    name = ""; // Clear the input field
    submitting = false;
  };
</script>

<form on:submit={submit}>
  <input
    type="text"
    placeholder="Course name"
    bind:value={name}
    required
  />
  <button type="submit" disabled={submitting}>Add Course</button>
</form>