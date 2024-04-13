import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { User } from "../types.ts";

const SignupProfile: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  const fetchSignup = async () => {
    const user: User = {
      name: name,
      password: password,
      age: age,
      sex: sex,
      description: description,
      hobbies: hobbies,
      photo: photo,
      comments: [],
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.success) {
      setSignupSuccess(true);
    } else {
      setSignupSuccess(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSignupSuccess(false);
    window.location.href = `/login`;
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        onBlur={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onBlur={(e) => setPassword(e.currentTarget.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onBlur={(e) => setAge(parseInt(e.currentTarget.value))}
      />
      <input
        type="text"
        placeholder="Sex"
        onBlur={(e) => setSex(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="Description"
        onBlur={(e) => setDescription(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="Hobbies (comma separated)"
        onBlur={(e) => setHobbies(e.currentTarget.value.split(","))}
      />
      <input
        type="text"
        placeholder="Photo"
        onBlur={(e) => setPhoto(e.currentTarget.value)}
      />
      <button onClick={fetchSignup}>Signup</button>
      {signupSuccess && (
        <dialog open>
          <p>Success</p>
          <button onClick={handleCloseSuccessMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default SignupProfile;
