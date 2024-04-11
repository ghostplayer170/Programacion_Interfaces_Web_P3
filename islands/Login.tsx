import { useEffect, useState } from "preact/hooks";
import { FunctionComponent } from "preact";

const Login: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const fetchLogin = async () => {
    const response = await fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      setLoginSuccess(true);
    }
    setLoginSuccess(false);
  };

  useEffect(() => {
    if (loginSuccess) {
      setShowSuccessMessage(true);
    }
  }, [loginSuccess]);

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    return new Response("", {
      status: 303,
      headers: {
        "Location": "hottinder",
      },
    });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={fetchLogin}>Login</button>
      {loginSuccess && showSuccessMessage && (
        <dialog open>
          <p>Success</p>
          <button onClick={handleCloseSuccessMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default Login;