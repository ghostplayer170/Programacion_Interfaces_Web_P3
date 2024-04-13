import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { Person, User } from "../types.ts";

const UpdateProfile: FunctionComponent<{ user: string, profile: Person }> = ({ user, profile }) => {
  const [userData, setUserData] = useState<User>({
    name: user,
    password: "",
    age: profile.age,
    sex: profile.sex,
    description: profile.description,
    hobbies: profile.hobbies,
    photo: profile.photo,
    comments: profile.comments,
  });
  const [updateSuccess, setUpdateSeccess] = useState<boolean>(false);
  const fetchUpdateProfiles = async () => {
    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user}),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setUpdateSeccess(true);
    } else {
      setUpdateSeccess(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setUpdateSeccess(false);
    window.location.href = `/user/${user}`;
  };
  return (
    <div>
      <h1>Update Profile</h1>
      <input
        type="password"
        placeholder="Password"
        onBlur={(e) =>
          setUserData({ ...userData, password: e.currentTarget.value })}
      />
      <input
        type="number"
        placeholder="Age"
        onBlur={(e) =>
          setUserData({ ...userData, age: parseInt(e.currentTarget.value) })}
      />
      <input
        type="text"
        placeholder="Sex"
        onBlur={(e) => setUserData({ ...userData, sex: e.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Description"
        onBlur={(e) =>
          setUserData({ ...userData, description: e.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Hobbies"
        onBlur={(e) =>
          setUserData({ ...userData, hobbies: e.currentTarget.value.split(",") })}
      />
      <input
        type="text"
        placeholder="Photo"
        onBlur={(e) =>
          setUserData({ ...userData, photo: e.currentTarget.value })}
      />
      <button class="button" onClick={fetchUpdateProfiles}>Update Profile</button>
      {updateSuccess && (
        <dialog open>
          <p>Success</p>
          <button onClick={handleCloseSuccessMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default UpdateProfile;
