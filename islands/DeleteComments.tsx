import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

const DeleteComments: FunctionComponent<{ user: string }> = ({ user }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const fetchDeleteComments = async () => {
    const response = await fetch("/api/comments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, name, password }),
    });
    const data = await response.json();
    if (data.success) {
      setDeleteSuccess(true);
    } else {
      setDeleteSuccess(false);
    }
  };
  return (
    <div>
      <h1>Delete Comments</h1>
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
      <button class="button" onClick={fetchDeleteComments}>
        Delete Comments
      </button>
      {deleteSuccess && (
        <div>
          <p>Success</p>
          <button class="button" onClick={() => setDeleteSuccess(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteComments;
