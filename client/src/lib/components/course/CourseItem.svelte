<script>
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  const cs = useCourseState();

  let { course } = $props();

  const handleDelete = async () => {
    await cs.remove(course.id);
  };
</script>

<li class="flex justify-between items-center">
  <a href={`/courses/${course.id}`} class="text-blue-500 underline">
    {course.name}
  </a>
  <button on:click={handleDelete} class="text-red-500">Remove</button>
</li>
