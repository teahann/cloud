import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import path from 'path';

export default defineConfig({
	server: {
		port: 5000,
	},
	plugins: [
		svelte({
			preprocess: [preprocess()],
		}),
	],
	resolve: {
		alias: [
			{ find: '~', replacement: path.resolve(__dirname, 'src') },
		],
	},
});
