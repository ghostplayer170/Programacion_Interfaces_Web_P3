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

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState<string>("");
  const [hobbies, setHobbies] = useState<string>("");
  const [filter, setFilter] = useState<Filter>({
    name: "",
    age: 0,
    sex: "",
    hobbies: "",
  });

  const hobbiesFilterArray = filter.hobbies.split(",").map((hobby) => hobby.trim()).filter((elemhbb) => elemhbb !== "");

  const filteredProfiles = profiles.filter((person) => {
    return (
      (filter.name === "" || person.name.includes(filter.name)) &&
      (filter.age === 0 || person.age === filter.age) &&
      (filter.sex === "" || person.sex === filter.sex) &&
      (hobbiesFilterArray.length === 0 ||
        hobbiesFilterArray.some((hobby) => person.hobbies.includes(hobby)))
    );
  });

  return (
    <>
      {cookiesOk && (
        <div>
          <div class="container-filters">
            <button class="button" onClick={() => window.location.href = `/user/${user}`}>Back</button>
            <input
              type="text"
              placeholder="Name"
              onBlur={(e) => setName(e.currentTarget.value)}
            />
            <input
              type="number"
              placeholder="Age"
              onBlur={(e) => setAge(parseInt(e.currentTarget.value))}
            />
            <input
              type="text"
              placeholder="Sex"
              onBlur={(e) => setSex(e.currentTarget.value)}
            />
            <input
              type="text"
              placeholder="Hobbies (comma separated)"
              onBlur={(e) => setHobbies(e.currentTarget.value)}
            />
            <button class="button" onClick={() => setFilter({ name, age, sex, hobbies })}>
              Filter
            </button>
          </div>
          <div class="container-profiles">
            {filteredProfiles.map((profile) => (
              <Profile key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterProfiles;
