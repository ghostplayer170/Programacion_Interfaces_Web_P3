import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import Profiles from "./Profiles.tsx";
import FilterProfiles from "../islands/FilterProfiles.tsx";

type Data = {
  profiles: Person[];
};

const HomeHottinder: FunctionComponent<Data> = ({ profiles }) => {
  return (
    <div>
      <h1>Hot Tinder</h1>
      <FilterProfiles profiles={profiles} />
    </div>
  );
};

export default HomeHottinder;
