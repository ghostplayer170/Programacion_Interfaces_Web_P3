import { FunctionComponent } from "preact";
import { Person } from "../types.ts";
import BtnViewProfile from "../islands/BtnViewProfile.tsx";

type Data = {
  profile: Person;
  login?: boolean;
  moreInfo?: boolean;
};

const Profile: FunctionComponent<Data> = ({ profile, login, moreInfo }) => {
  const { name, age, sex, description, photo, comments, hobbies } = profile;
  const loginData = login || false;
  const moreInfoData = moreInfo || false;
  return (
    <div class="cont-profile">
      <img src={photo} alt={name} class="profile-img" />
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{sex}</p>
      <p>{description}</p>
      {(loginData || moreInfoData) && (
        <>
          {comments.length > 0 && (
            <div>
              <strong>Comments:</strong>
              {comments.map((comment, index) => (
                <p key={index}>{comment.user}: {comment.message}</p>
              ))}
            </div>
          )}
          {hobbies.length > 0 && (
            <div>
              <strong>Hobbies:</strong>
              {hobbies.map((hobby, index) => <p key={index}>{hobby}</p>)}
            </div>
          )}
        </>
      )}
      <BtnViewProfile profile={name} moreInfo={moreInfoData} />
    </div>
  );
};

export default Profile;
