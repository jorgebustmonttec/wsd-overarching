<script>
  import Questions from "$lib/components/question/Questions.svelte";

  let { data } = $props();
</script>

<h1>Course {data.id}</h1>

<Questions courseId={data.id} />