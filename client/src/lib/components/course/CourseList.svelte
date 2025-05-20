<script>
  import { onMount } from "svelte";
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  const cs = useCourseState();

  import CourseItem from "./CourseItem.svelte";

  // Fetch courses when the component is mounted
  onMount(() => {
    cs.fetchCourses();
  });
</script>

{#if cs.isLoading}
  <p>Loading courses...</p>
{:else if cs.list.length === 0}
  <p>No courses exist yet.</p>
{:else}
  <ul>
    {#each cs.list as course}
      <CourseItem {course} />
    {/each}
  </ul>
{/if}
