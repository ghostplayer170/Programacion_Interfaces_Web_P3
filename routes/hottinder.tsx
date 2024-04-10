import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import HomeHottinder from "../components/HomeHottinder.tsx";
import { Person } from "../types.ts";

type Data = {
  profiles: Person[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const url = "https://lovers.deno.dev/";
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Response("Error fetching profiles", { status: 500 });
      }
      const profiles = await response.json();
      return await ctx.render({ profiles });
    } catch (error) {
      return await ctx.render({ profiles: [] });
    }
  },
};

export default function HottinderHome(props: PageProps<Data>) {
  const profiles = props.data.profiles;
  return (
    <>
      <HomeHottinder profiles={profiles} />
    </>
  );
}
