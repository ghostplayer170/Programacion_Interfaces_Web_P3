import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import FilterProfiles from "../../islands/FilterProfiles.tsx";
import { Person } from "../../types.ts";

type Data = {
  profiles: Person[];
  user: string;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const name = ctx.params.view;
      const url = "https://lovers.deno.dev/";
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Response("Error fetching profiles", { status: 500 });
      }
      const profiles = await response.json();
      return await ctx.render({ profiles, user: name});
    } catch (error) {
      return await ctx.render({ profiles: [], user: "" });
    }
  },
};

export default function userViewProfiles(props: PageProps<Data>) {
  const profiles = props.data.profiles;
  const user = props.data.user;
  return (
    <>
      <FilterProfiles profiles={profiles} user={user} />
    </>
  );
}
