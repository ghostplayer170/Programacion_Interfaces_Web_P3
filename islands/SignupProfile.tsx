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
  const [missingFields, setMissingFields] = useState<boolean>(false);

  const fetchSignup = async () => {
    if (!name || !password || age === 0 || !sex || !photo) {
      setMissingFields(true);
      return;
    }

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

  const handleCloseMessage = () => {
    setMissingFields(false);
    setSignupSuccess(false);
  };

  return (
    <div class="cont-form signup">
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
      <button class="button" onClick={fetchSignup}>Signup</button>
      <button class="button" onClick={() => window.location.href = "/login"}>
        Login
      </button>
      {missingFields && (
        <dialog open>
          <h3>Missing Required Fields</h3>
          <p>Please ensure all required fields are filled:</p>
          <strong>Name, Password, Age, Sex, and Photo</strong>
          <button class="button" onClick={handleCloseMessage}>
            Close
          </button>
        </dialog>
      )}
      {signupSuccess && (
        <div class="dialog-container">
          <dialog open>
            <div class="dialog-container">
              <p>Success</p>
              <button class="button" onClick={handleCloseSuccessMessage}>
                Close
              </button>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default SignupProfile;
