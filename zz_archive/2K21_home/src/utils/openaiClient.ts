import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
	organization: import.meta.env.VITE_OPENAI_ORG,
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

export const openai = new OpenAIApi(config);
