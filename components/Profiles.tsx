import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import Profile from "./Profile.tsx";

type Data = {
  profiles: Person[];
};

const Profiles: FunctionComponent<Data> = ({ profiles }) => {
  return (
    <div class="container-profiles">
      {profiles.map((profile) => (
        <Profile key={profile._id} profile={profile} />
      ))}
    </div>
  );
};

export default Profiles;
