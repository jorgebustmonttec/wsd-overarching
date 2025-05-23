// +layout.server.js
export const load = async ({ locals }) => {
  return {
    user: locals.user ?? null,
  };
};



export const ssr = false;