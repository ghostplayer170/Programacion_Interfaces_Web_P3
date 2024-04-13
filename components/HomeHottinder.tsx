import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import FilterProfiles from "../islands/FilterProfiles.tsx";

type Data = {
  profiles: Person[];
};

const HomeHottinder: FunctionComponent<Data> = ({ profiles }) => {
  return (
    <div class="cont-all-profiles">
      <FilterProfiles profiles={profiles} />
    </div>
  );
};

export default HomeHottinder;
