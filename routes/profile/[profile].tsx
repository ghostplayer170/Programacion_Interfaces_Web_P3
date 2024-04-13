import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ProfileInfo from "../../components/ProfileInfo.tsx";
import { Person } from "../../types.ts";

type Data = {
  profile: Person;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const name = ctx.params.profile;
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

export default function ProfilePage(props: PageProps<Data>) {
  return (
    <>
      <ProfileInfo profile={props.data.profile} />
    </>
  );
}
