import { useState } from "react";
import { getProfile } from "./api";
import { AppBskyActorGetProfile } from "@atproto/api";

function App() {
  const [actor, setActor] = useState<string>("");
  const [response, setResponse] = useState<AppBskyActorGetProfile.Response>();

  const handleRoast = async () => {
    const { response, error } = await getProfile(actor);
    if (response) {
      setResponse(response);
    }
    console.log(response, error);
  };

  return (
    <>
      <div>
        <h1>Social Roast</h1>

        <label htmlFor="">Blue Sky</label>
        <input
          type="text"
          name=""
          id=""
          value={actor}
          onChange={(e) => setActor(e.target.value)}
        />
        <button onClick={handleRoast}>Get Profile</button>
      </div>
      <div>{response ? JSON.stringify(response.data) : "No Data :("}</div>
    </>
  );
}

export default App;
