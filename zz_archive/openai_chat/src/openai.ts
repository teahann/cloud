import { Configuration, OpenAIApi } from 'openai';

const open_ai_config = new Configuration({
	organization: import.meta.env.VITE_OPENAI_ORG,
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

const openai = new OpenAIApi(open_ai_config)

export class AI {

	static async txt_gen(params) {
		const data = await openai.createChatCompletion(params)
		return data
	}	

}
