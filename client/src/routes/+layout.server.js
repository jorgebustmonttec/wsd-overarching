
// src/routes/+layout.server.js
// src/routes/+layout.server.js
import { getCookie } from "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt";

const COOKIE_KEY = "auth";
const JWT_SECRET = "wsd-project-secret";

export const load = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const cookies = Object.fromEntries(
    (cookieHeader?.split("; ") ?? []).map((c) => c.split("="))
  );

  const token = cookies[COOKIE_KEY];
  if (!token) return { user: null };

  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    return {
      user: { email: payload.email },
    };
  } catch (e) {
    return { user: null };
  }
};


export const ssr = false;