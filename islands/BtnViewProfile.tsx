import { FunctionComponent } from "preact";

const BtnViewProfile: FunctionComponent<
  { profile: string; moreInfo: boolean }
> = (
  { profile, moreInfo },
) => {
  const moreInfoData = moreInfo || false;
  return (
    <div>
      {!moreInfoData && (
        <button
          class="button btn-view-profile"
          onClick={() => window.location.href = `/profile/${profile}`}
        >
          View Profile
        </button>
      )}
    </div>
  );
};

export default BtnViewProfile;
