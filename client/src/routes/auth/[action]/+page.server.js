import { PUBLIC_INTERNAL_API_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

const apiRequest = async (url, data) => {
  return await fetch(`${PUBLIC_INTERNAL_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const response = await apiRequest(
      "/api/auth/login",
      Object.fromEntries(data),
    );

    if (response.ok) {
      throw redirect(302, "/");
    }
    return await response.json();
  },
  register: async ({ request }) => {
    const data = await request.formData();
    const response = await apiRequest(
      "/api/auth/register",
      Object.fromEntries(data),
    );

    if (response.ok) {
      throw redirect(302, "/auth/login?registered=true");
    }

    return await response.json();
  },
};