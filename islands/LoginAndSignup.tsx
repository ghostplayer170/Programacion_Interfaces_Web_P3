import { FunctionComponent } from "preact";

const LoginAndSignup: FunctionComponent = () => {
  const handleLogin = () => {
    window.location.href = "/login";
  };
  const handleSignup = () => {
    window.location.href = "/signup";
  };
  return (
    <div class="cont-LoginAndSignup">
      <button class="button" onClick={handleLogin}>Login</button>
      <button class="button" onClick={handleSignup}>SignUp</button>
    </div>
  );
};

export default LoginAndSignup;
