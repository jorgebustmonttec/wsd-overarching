<script>
  import { onMount } from "svelte";
  import Questions from "$lib/components/question/Questions.svelte";
  import { courseApi } from "$lib/services/courseApi.js";

  let { data } = $props();
  let courseName = "";

  onMount(async () => {
    const course = await courseApi.getCourse(data.id);
    courseName = course.name;
  });
</script>

<h1>Course {courseName}</h1>

<Questions courseId={data.id} />