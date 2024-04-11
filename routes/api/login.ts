import { Handlers } from "$fresh/server.ts";

const generateToken = (username: string, password: string) => {
  const token = btoa(username + password); // btoa is a function that encodes a string in base-64
  return token;
};

export const handler: Handlers = {
  async POST(req: Request) {
    const { username, password } = await req.json();
    const url = "https://lovers.deno.dev/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status == 401) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Unauthorized",
          }),
        );
      }
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ success: false, message: "Lover not found" }),
        );
      }
      return new Response(
        JSON.stringify({
          success: true,
          token: generateToken(username, password),
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (_e) {
      return new Response(
        JSON.stringify({ success: false, message: _e.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  },
};
