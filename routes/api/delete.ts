import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async DELETE(req: Request) {
    try {
      const { name, password } = await req.json();
      const url = `https://lovers.deno.dev/${name}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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
        JSON.stringify({ success: true }),
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
