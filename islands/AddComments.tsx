import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

const AddComments: FunctionComponent<{ user: string }> = ({ user }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const fetchAddComments = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, name, password, message }),
    });
    const data = await response.json();
    if (data.success) {
      setAddSuccess(true);
    } else {
      setAddSuccess(false);
    }
  };
  return (
    <div>
      <h1>Add Comments</h1>
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
        type="text"
        placeholder="Message"
        onBlur={(e) => setMessage(e.currentTarget.value)}
      />
      <button class="button" onClick={fetchAddComments}>Add Comments</button>
      {addSuccess && (
        <div>
          <p>Success</p>
          <button class="button" onClick={()=>setAddSuccess(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AddComments;
