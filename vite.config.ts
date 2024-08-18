import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import fullReload from "vite-plugin-full-reload";
import compression from "vite-plugin-compression";

export default defineConfig({
	plugins: [
		solid(),
		fullReload(["src/backend/**/*"]),
		compression({ algorithm: "brotliCompress" }),
	],
	server: {
		port: 3000,
		strictPort: true,
		proxy: {
			"/api": "http://0.0.0.0:3001/",
		},
	},
	build: {
		target: "esnext",
		minify: "terser",
		emptyOutDir: true,
		outDir: "./dist/public",
		rollupOptions: {
			treeshake: true,
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
			},
		},
		assetsInlineLimit: 0,
	},
	assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
});
