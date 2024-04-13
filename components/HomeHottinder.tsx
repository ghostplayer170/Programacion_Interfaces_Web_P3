import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import Profiles from "./Profile.tsx";
import LoginAndSignup from "../islands/LoginAndSignup.tsx";

type Data = {
  profiles: Person[];
};

const HomeHottinder: FunctionComponent<Data> = ({ profiles }) => {
  return (
    <div class="cont-home">
      <LoginAndSignup />
      <div class="cont-all-profiles">
        {profiles.map((profile) => <Profiles
          profile={profile}
          moreInfo={false}
        />)}
      </div>
    </div>
  );
};

export default HomeHottinder;
