import { AppBskyActorGetProfile, AtpAgent } from "@atproto/api";
import {
  EnhancedGenerateContentResponse,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import moment from "moment";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a witty assistant asked to create a light-hearted roast.",
});

const bskyAgent = new AtpAgent({
  service: "https://bsky.social",
});

/** [Response, Error] */
type ResponseError<T = unknown> = [T | null, string | null];

type BskyResponse = ResponseError<AppBskyActorGetProfile.Response>;
type GenResponse = ResponseError<EnhancedGenerateContentResponse>;

export const agentLogin = async () => {
  await bskyAgent.login({
    identifier: import.meta.env.VITE_BLUE_SKY_PROFILE,
    password: import.meta.env.VITE_BLUE_SKY_KEY,
  });
};

export const getProfile = async (actor: string): Promise<BskyResponse> => {
  try {
    const response = await bskyAgent.getProfile({ actor });
    return [response, null];
  } catch {
    return [null, "Something went wrong getting profile."];
  }
};

export const generateRoast = async (actor: string): Promise<GenResponse> => {
  try {
    const [bskyResponse, bskyError] = await getProfile(actor);

    if (!bskyResponse || bskyError) {
      return [null, bskyError];
    }

    const { handle, createdAt, followersCount, description } =
      bskyResponse.data;

    const prompt = [
      `Tell me a roast about a BlueSky user named ${handle}`,
      `who joined ${moment(createdAt).format("L")}`,
      `and has ${followersCount || 0} followers.`,
      description ? `Their description says "${description}".` : "",
    ].join(" ");

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return [response, null];
  } catch {
    return [null, "Something went wrong generating roast"];
  }
};
