import { FunctionComponent } from "preact";

const ViewProfiles: FunctionComponent<{user:string}> = ({user}) => {
  return (
    <div>
      <h1>View Profiles</h1>
      <button class="button" onClick={() => window.location.href = `/view/${user}`}>
        View Profiles
      </button>
    </div>
  );
};

export default ViewProfiles;
