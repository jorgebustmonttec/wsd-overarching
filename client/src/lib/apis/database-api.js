import { PUBLIC_API_URL } from "$env/static/public";

const executeQuery = async (query) => {
  const response = await fetch(PUBLIC_API_URL, {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  return await response.json();
};

export { executeQuery };
