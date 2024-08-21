import { useState } from "react";
import { generateRoast } from "./api";
import {
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import BlueSkyLogo from "./assets/bluesky-logo.png";

const defaultContent = "This project was made by Billy Dyball :)";

function App() {
  const [actor, setActor] = useState<string>("billydyball.bsky.social");
  const [roast, setRoast] = useState<string>("");

  // billydyball.bsky.social
  const handleRoast = async () => {
    const [response, error] = await generateRoast(actor);

    if (!response || error) {
      console.error(error);
      return;
    }

    console.log(response);
    setRoast(response.text());
  };

  const doSomething = () => {};

  return (
    <div className="flex justify-center pt-10">
      <div className="flex flex-col items-center gap-6 w-full sm:w-[600px]">
        <h1 className="text-nowrap">Social Roast</h1>

        <div className="flex flex-col w-full sm:flex-row items-center gap-3">
          <label htmlFor="" className="whitespace-nowrap">
            Blue Sky
          </label>
          <input
            className="flex-1"
            placeholder="example.bsky.social"
            type="text"
            name=""
            id=""
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />
          <button onClick={handleRoast} className="whitespace-nowrap">
            Get Profile
          </button>
        </div>

        <div
          className="flex flex-1 flex-nowrap border border-gray-700 pb-1 pt-2.5 pl-2.5 pr-4 gap-2.5 w-full min-h-40 cursor-pointer"
          onClick={doSomething}
        >
          <div className="pl-2">
            <div className="bg-white h-12 w-12 rounded-full overflow-hidden flex items-center">
              <img src={BlueSkyLogo} alt="" />
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-nowrap">Billy Dyball</span>
              <span className="text-gray-400">@billydyball.bsky.social</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-400">Now</span>
            </div>
            <div className="flex-1">{roast ? roast : defaultContent}</div>
            <div className="flex">
              <span className="flex flex-1 text-gray-400">
                <div>
                  <ChatBubbleLeftIcon className="p-1 h-7 w-7" />
                </div>
                <div>3</div>
              </span>
              <span className="flex flex-1 text-gray-400">
                <div>
                  <ArrowPathRoundedSquareIcon className="p-1 h-7 w-7" />
                </div>
                <div>3</div>
              </span>
              <span className="flex flex-1 text-gray-400">
                <div>
                  <HeartIcon className="p-1 h-7 w-7" />
                </div>
                <div>3</div>
              </span>
              <span className="flex flex-1 text-gray-400">
                <div>
                  <EllipsisHorizontalIcon className="p-1 h-7 w-7 text-gray-400" />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
