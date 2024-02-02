import { supabase } from '~/utils/supabaseClient.ts'

export class Store {

	// --- HOME ---
	// Header
	static async commands() {
		const { data } = await supabase
			.from('commands')
			.select('*')
			.eq('listed', true)
			.order('name')
		return data
	}

	// --- SOLAR_SYSTEM ---
	// All
	static async solar_system() {
		const { data } = await supabase
			.from('solar_system')
			.select('*')
			.order('sun_au')
		return data
	}

	// By id
	static async celestial(id) {
		const { data } = await supabase
			.from('solar_system')
			.select('*')
			.eq('id', id)
			.single()
		return data
	}

	// --- COMPOUNDS ---
	// All
	static async compounds() {
		const { data } = await supabase
			.from('compounds')
			.select('*')
		return data
	}

	// By id
	static async compound(pid) {
		const { data } = await supabase
			.from('compounds')
			.select('*')
			.eq('pid', pid)
			.single()
		return data
	}

	// --- LANUAGE ---

	// All
	static async languages() {
		const { data } = await supabase
			.from('languages')
			.select('*')
			.order('name')
		return data
	}

	// By id
	static async language(id) {
		const { data } = await supabase
			.from('languages')
			.select('*')
			.eq('id', id)
			.single()
		return data
	}

	// --- GPU_DIRECTORY ---
	// ALL
	static async gpu_directory() {
		const { data } = await supabase
			.from('gpu_directory').select('*')
		return data
	}

	// --- WAVS ---
	// All
	static async wavs() {
		const { data } = await supabase
			.from('wavs')
			.select('*')
		return data
	}

	// By id
	static async wav(id) {
		const { data } = await supabase
			.from('wavs').select('*').eq('id', id).single()
		return data
	}

	// All unique categories
	static async wav_categories() {
		const { data } = await supabase
			.from('wavs').select('category')
		// unique categories as a list
		const categories = Array.from(
			new Set(
				data.reduce((a, b) => [...a, b['category']], [])
			)
		)
		return categories
	}
	
	// All wavs by category
	static async wavs_by_category(category) {
		const { data } = await supabase
			.from('wavs')
			.select('*')
			.eq('category', category)
		return data
	}

	// --- THEME ---
	// All backgorund
	static async backgrounds() {
		const { data } = await supabase
			.from('backgrounds')
			.select('*')
			.order('title')
		return data
	}

	// --- GREETINGS ---
	// List of greetings and langauges
	static async greetings() {
		const { data } = await supabase
			.from('greetings')
			.select('*')
		return data
	}

	// --- YOUTUBE ---
	static async yt_vids() {
		const { data } = await supabase
			.from('youtube')
			.select('*')
		return data
	}

}

