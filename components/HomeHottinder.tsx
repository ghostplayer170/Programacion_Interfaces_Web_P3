import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import FilterProfiles from "../islands/FilterProfiles.tsx";
import Signup from "../islands/Signup.tsx";
import DeleteProfile from "../islands/DeleteProfile.tsx";

type Data = {
  profiles: Person[];
};

const HomeHottinder: FunctionComponent<Data> = ({ profiles }) => {
  return (
    <div>
      <h1>Hot Tinder</h1>
      <FilterProfiles profiles={profiles} />
      <Signup />
      <DeleteProfile />
    </div>
  );
};

export default HomeHottinder;
