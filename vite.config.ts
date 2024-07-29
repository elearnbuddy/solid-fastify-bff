import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import fullReload from "vite-plugin-full-reload";

export default defineConfig({
	plugins: [solid(), fullReload(["src/backend/**/*"])],
	server: {
		port: 3000,
		strictPort: true,
		proxy: {
			"/api": "http://0.0.0.0:3001/",
		},
	},
	preview: {
		port: 3000,
	},
	build: {
		target: "esnext",
		minify: "terser",
		emptyOutDir: true,
		rollupOptions: {
			treeshake: true,
		},
	},
});
