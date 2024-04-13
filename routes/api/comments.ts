import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req: Request) {
    try {
      const { name, user, password, message } = await req.json();
      const url = `https://lovers.deno.dev/${name}/comment`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password, message }),
      });
      if (response.status == 401) {
        return new Response(
          JSON.stringify({ success: false, message: "Unauthorized" }),
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
  async DELETE(req: Request) {
    try {
      const { name, user, password } = await req.json();
      const url = `https://lovers.deno.dev/${name}/comment`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
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
