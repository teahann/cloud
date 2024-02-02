import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import preprocess from "svelte-preprocess"
import path from 'path'
import url from '@rollup/plugin-url'

export default defineConfig({
	server: { port: 5000 },
	plugins: [
		svelte({ preprocess: [preprocess()] }),
		url({ incude: ['**/*.svg'] })
	],
	resolve: {
		alias: { '~': path.resolve(__dirname, './src') }
	}
})
