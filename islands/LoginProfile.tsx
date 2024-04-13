import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

const LoginProfile: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null); // null = no se ha intentado loguear
  const [emptyFields, setEmptyFields] = useState<boolean>(false);

  const fetchLogin = async () => {
    if (name.trim() === "" || password.trim() === "") {
      setLoginSuccess(null); // Resetear el estado de éxito de login
      setEmptyFields(true); // Mostrar mensaje de campos vacíos
      return;
    }

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
      window.location.href = `/user/${name}`;
    } else {
      setLoginSuccess(false);
    }
  };

  const handleCloseMessage = () => {
    setEmptyFields(false); // Cerrar el diálogo de campos vacíos
    setLoginSuccess(null); // Resetear el estado de éxito/fallo
  };

  return (
    <div class="cont-form">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Name"
        onBlur={(e) => setName(e.currentTarget.value.trim())}
      />
      <input
        type="password"
        placeholder="Password"
        onBlur={(e) => setPassword(e.currentTarget.value.trim())}
      />
      <button class="button" onClick={fetchLogin}>Login</button>
      <button class="button" onClick={() => window.location.href = "/signup"}>Signup</button>
      {emptyFields && (
        <dialog open class="dialog-msg">
          <h3>Empty Fields</h3>
          <p>Please fill in both name and password to log in.</p>
          <button class="button" onClick={handleCloseMessage}>Close</button>
        </dialog>
      )}
      {loginSuccess === false && (
        <dialog open class="dialog-msg">
          <h3>Login Failed</h3>
          <button class="button" onClick={handleCloseMessage}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default LoginProfile;
