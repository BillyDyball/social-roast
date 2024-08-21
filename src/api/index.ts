import { AppBskyActorGetProfile, AtpAgent } from "@atproto/api";

const agent = new AtpAgent({
  service: "https://bsky.social",
});

type ResponseError = {
  response: AppBskyActorGetProfile.Response | null;
  error: string | null;
};

export const agentLogin = async () => {
  console.log(
    "import.meta.env.VITE_BLUE_SKY_PROFILE",
    import.meta.env.VITE_BLUE_SKY_PROFILE,
    import.meta.env.VITE_BLUE_SKY_KEY
  );
  await agent.login({
    identifier: import.meta.env.VITE_BLUE_SKY_PROFILE,
    password: import.meta.env.VITE_BLUE_SKY_KEY,
  });
};

export const getProfile = async (actor: string): Promise<ResponseError> => {
  try {
    const response = await agent.getProfile({ actor });
    return { response, error: null };
  } catch {
    return { response: null, error: "Something went wrong getting profile." };
  }
};
