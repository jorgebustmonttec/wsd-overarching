<script>
  import { onMount } from "svelte";
  import { courseApi } from "$lib/services/courseApi.js";
  import Questions from "$lib/components/Questions.svelte";

  let { data } = $props();
  let courseName = $state("Loading...");

  // Fetch the course name on mount
  onMount(async () => {
    try {
      const course = await courseApi.getCourse(data.id);
      courseName = course.name;
    } catch (err) {
      console.error("Failed to fetch course name:", err);
      courseName = "Unknown Course";
    }
  });
</script>

<div class="space-y-6">
  <div class="bg-blue-100 p-6 rounded-lg shadow-md">
    <h1>{courseName}</h1>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <Questions courseId={data.id} />
  </div>
</div>