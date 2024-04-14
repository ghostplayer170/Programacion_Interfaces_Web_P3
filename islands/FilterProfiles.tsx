import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Person } from "../types.ts";
import Profile from "../components/Profile.tsx";

type Data = {
  profiles: Person[];
  user: string;
};

type Filter = {
  name: string;
  age: number;
  sex: string;
  hobbies: string;
};

const FilterProfiles: FunctionComponent<Data> = ({ profiles, user }) => {
  const [cookiesOk, setCookiesOk] = useState<boolean>(false);
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((row) => row.startsWith("user="));
    const passwordCookie = cookies.find((row) => row.startsWith("password="));
    const userCookieValue = userCookie ? userCookie.split("=")[1] : null;
    const passwordCookieValue = passwordCookie
      ? passwordCookie.split("=")[1]
      : null;
    if (
      userCookieValue === null ||
      passwordCookieValue === null ||
      userCookieValue !== user ||
      !passwordCookieValue
    ) {
      window.location.href = "/login";
    } else {
      setCookiesOk(true);
    }
  });

  const [filter, setFilter] = useState<Filter>({
    name: "",
    age: 0,
    sex: "",
    hobbies: "",
  });

  const isFilterEmpty = (filter: Filter) => {
    return !filter.name && filter.age === 0 && !filter.sex && !filter.hobbies;
  };

  const filteredProfiles = isFilterEmpty(filter)
    ? profiles
    : profiles.filter((person) => {
      const hobbiesFilterArray = filter.hobbies.split(",").map((hobby) => hobby.trim()).filter((elemhbb) => elemhbb !== "");
      return (
        (filter.name === "" || person.name.includes(filter.name)) &&
        (filter.age === 0 || person.age === filter.age) &&
        (filter.sex === "" || person.sex === filter.sex) &&
        (hobbiesFilterArray.length === 0 ||
          hobbiesFilterArray.some((hobby) => person.hobbies.includes(hobby)))
      );
    });

  const handleFilterChange = (name: string, value: string | number) => {
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value}));
  };

  return (
    <>
      {cookiesOk && (
        <div class="cont-filter-page">
          <div class="cont-form cont-filter">
            <button
              class="button"
              onClick={() => window.location.href = `/user/${user}`}
            >
              Back
            </button>
            <input
              type="text"
              placeholder="Name"
              value={filter.name}
              onInput={(e) => handleFilterChange('name', e.currentTarget.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={filter.age || ""}
              onInput={(e) => handleFilterChange('age', parseInt(e.currentTarget.value) || 0)}
            />
            <input
              type="text"
              placeholder="Sex"
              value={filter.sex}
              onInput={(e) => handleFilterChange('sex', e.currentTarget.value)}
            />
            <input
              type="text"
              placeholder="Hobbies (comma separated)"
              value={filter.hobbies}
              onInput={(e) => handleFilterChange('hobbies', e.currentTarget.value)}
            />
          </div>
          <div class="cont-filter-profiles">
            <div class="cont-all-profiles">
              {filteredProfiles.map((profile) => (
                <Profile key={profile._id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterProfiles;
