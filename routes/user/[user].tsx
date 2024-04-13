import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ProfilePage from "../../islands/ProfilePage.tsx";
import { Person } from "../../types.ts";
import { useEffect } from "preact/hooks";

type Data = {
  profile: Person;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const name = ctx.params.user;
      const url = `https://lovers.deno.dev/${name}`;
      const response = await fetch(url);
      if (response.status === 404) {
        throw new Response("Lover not found", { status: 404 });
      }
      const profile = await response.json();
      return await ctx.render({ profile });
    } catch (error) {
      return new Response("Error fetching profiles", { status: 500 });
    }
  },
};

export default function UserPage(props: PageProps<Data>) {
  return (
    <>
      <ProfilePage profile={props.data.profile} />
    </>
  );
}
