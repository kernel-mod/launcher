import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
	mode: process.env.NODE_ENV,
	root: __dirname,
	plugins: [
		solidPlugin(),
	],
	base: "./",
	build: {
        target: "esnext",
		outDir: "../../dist/renderer",
		emptyOutDir: true
	}
});