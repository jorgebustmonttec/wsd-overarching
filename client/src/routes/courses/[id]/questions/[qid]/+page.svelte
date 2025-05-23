<script>
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookie.js"; // Utility to check authentication
  import { PUBLIC_API_URL } from "$env/static/public";

  export let data; // Contains courseId and questionId
  let question = null;
  let answers = [];
  let newAnswerText = "";
  let isAuthenticated = !!getCookie("token");

  const fetchQuestionAndAnswers = async () => {
    try {
      const questionRes = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}`);
      question = await questionRes.json();

      const answersRes = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers`);
      answers = await answersRes.json();
    } catch (err) {
      console.error("Failed to fetch question or answers:", err);
    }
  };

  const addAnswer = async () => {
    if (!newAnswerText.trim()) return;

    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newAnswerText }),
      });

      if (res.ok) {
        const newAnswer = await res.json();
        answers = [...answers, newAnswer];
        newAnswerText = "";
      }
    } catch (err) {
      console.error("Failed to add answer:", err);
    }
  };

  const upvoteAnswer = async (answerId) => {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers/${answerId}/upvote`, {
        method: "POST",
      });

      if (res.ok) {
        const updatedAnswer = await res.json();
        answers = answers.map((a) => (a.id === updatedAnswer.id ? updatedAnswer : a));
      }
    } catch (err) {
      console.error("Failed to upvote answer:", err);
    }
  };

  onMount(fetchQuestionAndAnswers);
</script>

<div class="space-y-6">
  <div class="bg-blue-100 p-6 rounded-lg shadow-md">
    <h1>{question?.title || "Loading..."}</h1>
    <p>{question?.text || ""}</p>
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold">Answers</h2>
    <ul class="space-y-4">
      {#each answers as answer}
        <li class="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
          <p>{answer.text}</p>
          <p class="text-sm text-gray-500">Upvotes: {answer.upvotes}</p>
          {#if isAuthenticated}
            <button
              class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-md"
              on:click={() => upvoteAnswer(answer.id)}
            >
              Upvote
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  </div>

  {#if isAuthenticated}
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold">Add an Answer</h2>
      <textarea
        bind:value={newAnswerText}
        rows="4"
        placeholder="Enter your answer"
        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        class="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
        on:click={addAnswer}
      >
        Submit
      </button>
    </div>
  {/if}
</div>
