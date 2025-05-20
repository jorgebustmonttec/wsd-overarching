<script>
  export let data;
  let { course, questions } = data;

  let newQuestion = { title: "", text: "" };
  let loading = false;

  const addQuestion = async () => {
    if (!newQuestion.title.trim() || !newQuestion.text.trim()) return;
    loading = true;
    await fetch(`${PUBLIC_API_URL}/courses/${course.id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });
    newQuestion = { title: "", text: "" };
    await fetchQuestions();
    loading = false;
  };

  const fetchQuestions = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/courses/${course.id}/questions`);
    questions = await response.json();
  };

  const upvoteQuestion = async (id) => {
    await fetch(`${PUBLIC_API_URL}/courses/${course.id}/questions/${id}/upvote`, {
      method: "POST",
    });
    await fetchQuestions();
  };

  const deleteQuestion = async (id) => {
    await fetch(`${PUBLIC_API_URL}/courses/${course.id}/questions/${id}`, {
      method: "DELETE",
    });
    await fetchQuestions();
  };
</script>

<h1>{course.name}</h1>

<h2>Questions</h2>
<ul>
  {#each questions as question}
    <li>
      <strong>{question.title}</strong> ({question.upvotes} upvotes)
      <button on:click={() => upvoteQuestion(question.id)}>Upvote</button>
      <button on:click={() => deleteQuestion(question.id)}>Delete</button>
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={addQuestion}>
  <input
    type="text"
    placeholder="Question title"
    bind:value={newQuestion.title}
    required
  />
  <textarea
    placeholder="Question text"
    bind:value={newQuestion.text}
    required
  ></textarea>
  <button type="submit" disabled={loading}>Add Question</button>
</form>
