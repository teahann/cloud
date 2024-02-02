import { writable } from 'svelte/store';

// database -> session
export const backgrounds = writable<Array<Any>>([])
export const commands = writable<Array<Any>>([])
export const compounds = writable<Array<Any>>([])
export const external_links = writable<Array<Any>>([])
export const greetings = writable<Array<Any>>([])
export const gpu_directory = writable<Array<Any>>([])
export const languages = writable<Array<Any>>([])
export const solar_system = writable<Array<Any>>([])
export const wav_categories = writable<Array<Any>>([])
export const wavs = writable<Array<Any>>([])
export const yt_vids = writable<Array<Any>>([])

// shared HTML input
export const user_req = writable<string>("");

// account management
export const user_auth = writable<Object>({})
export const user_data = writable<Array<any>>([])
