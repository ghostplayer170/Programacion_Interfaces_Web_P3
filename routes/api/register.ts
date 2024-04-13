import { Handlers } from "$fresh/server.ts";
import { User } from "../../types.ts";

export const handler: Handlers = {
  async POST(req: Request) {
    try {
      const data: User = await req.json();
      const url = "https://lovers.deno.dev/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 400) {
        return new Response(
          JSON.stringify({ success: false, message: "Missing fields" }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response(
        JSON.stringify({
          success: true,
          message: "Usuario registrado correctamente",
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
