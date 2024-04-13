import { FunctionComponent } from "preact";

const LogoutProfile: FunctionComponent = () => {
  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Logout</h1>
      <button class="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutProfile;