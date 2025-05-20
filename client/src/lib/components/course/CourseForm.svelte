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

<form on:submit={submit} class="space-y-2">
  <input
    type="text"
    placeholder="name"
    bind:value={name}
    required
  />
  <input type="submit" value="Add Course" disabled={submitting} />
</form>