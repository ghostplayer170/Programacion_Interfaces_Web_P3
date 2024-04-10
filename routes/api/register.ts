import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const data = await req.json();
    // Aquí deberías añadir la lógica para guardar el usuario en tu base de datos.
    // Por ejemplo: createUser(data.username, data.password);
    return new Response(JSON.stringify({ success: true, message: "Usuario registrado correctamente" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};