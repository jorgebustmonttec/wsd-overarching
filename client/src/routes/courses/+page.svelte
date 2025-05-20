<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";

  let courses = [];
  let newCourseName = "";
  let loading = false;

  const fetchCourses = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/courses`);
    courses = await response.json();
  };

  const addCourse = async () => {
    if (!newCourseName.trim()) return;
    loading = true;
    await fetch(`${PUBLIC_API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCourseName }),
    });
    newCourseName = "";
    await fetchCourses();
    loading = false;
  };

  onMount(fetchCourses);
</script>

<h1>Courses</h1>
<ul>
  {#each courses as course}
    <li><a href={`/courses/${course.id}`}>{course.name}</a></li>
  {/each}
</ul>

<form on:submit|preventDefault={addCourse}>
  <input
    type="text"
    placeholder="New course name"
    bind:value={newCourseName}
    required
  />
  <button type="submit" disabled={loading}>Add Course</button>
</form>
