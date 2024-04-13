import { Handlers } from "$fresh/server.ts";
import { Person } from "../../types.ts";

export const handler: Handlers = {
  async PUT(req: Request) {
    try {
      const user = await req.json();
      const url = `https://lovers.deno.dev/${user.name}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user}),
      });
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ success: false, message: "Lover not found" }),
        );
      }
      const data = await response.json();
      return new Response(
        JSON.stringify({ success: true, user: data }),
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
