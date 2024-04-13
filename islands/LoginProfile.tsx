import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

const LoginProfile: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const fetchLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    if (data.success) {
      document.cookie = `user=${name}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      document.cookie = `password=${password}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setLoginSuccess(false);
    window.location.href = `/user/${name}`;
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
      {loginSuccess && (
        <dialog open>
          <p>Success</p>
          <button onClick={handleCloseSuccessMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default LoginProfile;
