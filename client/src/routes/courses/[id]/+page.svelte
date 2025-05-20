<script>
  import { onMount } from "svelte";
  import { courseApi } from "$lib/services/courseApi.js";
  import Questions from "$lib/components/question/Questions.svelte";

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

<h1>{courseName}</h1>

<Questions courseId={data.id} />