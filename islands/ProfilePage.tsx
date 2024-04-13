import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import DeleteProfile from "./DeleteProfile.tsx";
import Profiles from "../components/Profile.tsx";
import AddComments from "./AddComments.tsx";
import DeleteComments from "./DeleteComments.tsx";
import UpdateProfile from "./UpdateProfile.tsx";
import LogoutProfile from "./LogoutProfile.tsx";
import { useEffect, useState } from "preact/hooks";
import FilterProfiles from "./FilterProfiles.tsx";

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
    const passwordCookieValue = passwordCookie ? passwordCookie.split("=")[1] : null;
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
        <div class="cont-login-profile">
          <Profiles profile={profile} login={true} />
          <AddComments user={user} />
          <DeleteComments user={user} />
          <UpdateProfile user={user} />
          <DeleteProfile user={user} />
          <LogoutProfile />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
