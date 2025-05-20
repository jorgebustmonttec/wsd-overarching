<script>
  import CourseForm from "$lib/components/course/CourseForm.svelte";
  import CourseList from "$lib/components/course/CourseList.svelte";
</script>

<div class="space-y-6">
  <div class="bg-blue-100 p-6 rounded-lg shadow-md">
    <h1>Courses</h1>
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <CourseList />
  </div>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <CourseForm />
  </div>
</div>
