import { useState } from "react";
import { generateRoast } from "./api";
import {
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import BlueSkyLogo from "./assets/bluesky-logo.png";
import BouncingCircles from "./assets/bouncing-circles.svg";

const defaultContent = `
  This project was made by Billy Dyball :)
`;

function App() {
  const [handle, setHandle] = useState<string>("");
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRoast = async () => {
    setLoading(true);
    const validHandle = handle.at(0) === "@" ? handle.substring(1) : handle;
    const [response, error] = await generateRoast(validHandle);

    if (!response || error) {
      console.error(error);
      setError("Whoops something went wrong 😭");
      setLoading(false);
      return;
    }

    setError("");
    setRoast(response.text());
    setLoading(false);
  };

  return (
    <div className="flex min-h-dvh justify-center py-10">
      <div className="flex flex-col items-center gap-6 w-full sm:w-[600px]">
        <h1 className="text-nowrap">Social Roast</h1>

        <div className="flex flex-col w-full sm:flex-row items-center gap-3">
          <label htmlFor="" className="whitespace-nowrap">
            Blue Sky
          </label>
          <input
            className="flex-1"
            placeholder="example.bsky.social"
            disabled={loading}
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          {loading ? (
            <div className="flex items-center justify-center w-[74px]">
              <img
                src={BouncingCircles}
                alt="loading-animation"
                className="w-1/2"
              />
            </div>
          ) : (
            <button onClick={handleRoast} className="whitespace-nowrap">
              Get Profile
            </button>
          )}
        </div>

        <a
          className="flex flex-nowrap border border-gray-700 pb-1 pt-2.5 pl-2.5 pr-4 gap-2.5 w-full min-h-40 cursor-pointer overflow-hidden"
          target="_blank"
          href="https://bsky.app/profile/billydyball.bsky.social"
        >
          <div className="pl-2">
            <div className="bg-white h-12 w-12 rounded-full overflow-hidden flex items-center">
              <img src={BlueSkyLogo} alt="BlueSky logo" />
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-nowrap">Billy Dyball</span>
              <span className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                @billydyball.bsky.social
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-400">Now</span>
            </div>
            {loading ? (
              <div className="animate-pulse flex-1 py-2">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-4 bg-slate-700 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                {error ? error : roast ? roast : defaultContent}
              </div>
            )}
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
                <div>6</div>
              </span>
              <span className="flex flex-1 text-gray-400">
                <div>
                  <HeartIcon className="p-1 h-7 w-7" />
                </div>
                <div>2</div>
              </span>
              <span className="flex flex-1 text-gray-400">
                <div>
                  <EllipsisHorizontalIcon className="p-1 h-7 w-7 text-gray-400" />
                </div>
              </span>
            </div>
          </div>
        </a>

        <div className="mt-auto">
          <a
            className="underline text-sm text-blue-300"
            target="_blank"
            href="https://github.com/BillyDyball/social-roast"
          >
            View the source code
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
