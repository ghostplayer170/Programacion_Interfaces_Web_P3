import { FunctionComponent } from "preact";
import { Person } from "../types.ts";

type Data = {
  profile: Person;
};

const Profiles: FunctionComponent<Data> = ({ profile }) => {
  const { name, age, sex, description, hobbies, comments, photo } = profile;
  return (
    <div class="profile">
      <img src={photo} alt={name} class="profile-img" />
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{sex}</p>
      <p>{description}</p>
      <p>{hobbies}</p>
      {comments.length > 0 && (
        <div>
          <strong>Comments:</strong>
          {comments.map((comment) => <p>{comment.user}: {comment.message}</p>)}
        </div>
      )}
    </div>
  );
};

export default Profiles;
