import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

const DeleteProfile: FunctionComponent<{ user: string }> = ({ user }) => {
  const [password, setPassword] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const fetchDeleteProfile = async () => {
    const response = await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user, password }),
    });
    const data = await response.json();
    if (data.success) {
      setDeleteSuccess(true);
      window.location.href = `/hottinder`;
    } else {
      setDeleteSuccess(false);
    }
  };

  return (
    <div>
      <h1>Delete Profile</h1>
      <input
        type="password"
        placeholder="Password"
        onBlur={(e) => setPassword(e.currentTarget.value)}
      />
      <button class="button" onClick={fetchDeleteProfile}>
        Delete Profile
      </button>
      {!deleteSuccess && (
        <div>
          <p>Failed to delete profile.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteProfile;
