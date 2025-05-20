import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ params }) {
  const courseId = params.id;

  const [courseRes, questionsRes] = await Promise.all([
    fetch(`${PUBLIC_API_URL}/courses/${courseId}`),
    fetch(`${PUBLIC_API_URL}/courses/${courseId}/questions`),
  ]);

  const course = await courseRes.json();
  const questions = await questionsRes.json();

  return { course, questions };
}
