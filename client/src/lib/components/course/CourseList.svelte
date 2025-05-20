<script>
  import { onMount } from "svelte";
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  import CourseItem from "./CourseItem.svelte";

  const cs = useCourseState();

  // Fetch courses when the component is mounted
  onMount(() => {
    cs.fetchCourses();
  });
</script>

<ul>
  {#if cs.isLoading}
    <li>Loading courses...</li>
  {:else if cs.hasError}
    <li>Error: {cs.hasError}</li>
  {:else if cs.list.length === 0}
    <li>No courses available.</li>
  {:else}
    {#each cs.list as course}
      <CourseItem {course} />
    {/each}
  {/if}
</ul>