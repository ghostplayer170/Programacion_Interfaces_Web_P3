import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import Profile from "./Profile.tsx";

type Data = {
  profile: Person;
};

const ProfileInfo: FunctionComponent<Data> = ({ profile }) => {
  return (
    <div class="cont-profile">
      <Profile profile={profile} moreInfo={true} />
    </div>
  );
};

export default ProfileInfo;
