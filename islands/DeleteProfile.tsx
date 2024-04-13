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
    } else {
      setDeleteSuccess(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setDeleteSuccess(false);
    window.location.href = `/hottinder`;
  };
  
  return (
    <div>
      <h1>Delete Profile</h1>
      <input
        type="password"
        placeholder="Password"
        onBlur={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={fetchDeleteProfile}>Delete Profile</button>
      {deleteSuccess && (
        <dialog open>
          <p>Success</p>
          <button onClick={handleCloseSuccessMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default DeleteProfile;
