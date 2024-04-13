import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import DeleteProfile from "./DeleteProfile.tsx";
import Profiles from "../components/Profile.tsx";
import AddComments from "./AddComments.tsx";
import DeleteComments from "./DeleteComments.tsx";
import UpdateProfile from "./UpdateProfile.tsx";
import LogoutProfile from "./LogoutProfile.tsx";
import { useEffect, useState } from "preact/hooks";
import ViewProfiles from "./ViewProfiles.tsx";

type Data = {
  profile: Person;
};

const ProfilePage: FunctionComponent<Data> = ({ profile }) => {
  const user = profile.name;
  const [cookiesOk, setCookiesOk] = useState<boolean>(false);
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((row) => row.startsWith("user="));
    const passwordCookie = cookies.find((row) => row.startsWith("password="));
    const userCookieValue = userCookie ? userCookie.split("=")[1] : null;
    const passwordCookieValue = passwordCookie
      ? passwordCookie.split("=")[1]
      : null;
    if (
      userCookieValue === null ||
      passwordCookieValue === null ||
      userCookieValue !== user ||
      !passwordCookieValue
    ) {
      window.location.href = "/login";
    } else {
      setCookiesOk(true);
    }
  });
  return (
    <div>
      {cookiesOk && (
        <div class="cont-form cont-profile-page">
          <div class="cont-profile-design">
            <Profiles profile={profile} login={true} />
          </div>
          <div class="cont-profile-design">
            <ViewProfiles user={user} />
          </div>
          <div class="cont-profile-design">
            <AddComments user={user} />
          </div>
          <div class="cont-profile-design">
            <DeleteComments user={user} />
          </div>
          <div class="cont-profile-design">
            <UpdateProfile user={user} profile={profile} />
          </div>
          <div class="cont-profile-design">
            <DeleteProfile user={user} />
          </div>
          <div class="cont-profile-design">
            <LogoutProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
