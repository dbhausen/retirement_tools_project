// vite.config.js
export default {
	build: {
		brotliSize: false,
		manifest: true,
		outDir: 'dist',
		rollupOptions: {
			output: {
				manualChunks: {
					muimaterial: ['@mui/material'],
					tiptapcore: ['@tiptap/core'],
					tiptapstarterkit: ['@tiptap/starter-kit'],
					recharts: ['recharts'],
				},
				assetFileNames: 'static/[ext]/[name][extname]',
				chunkFileNames: 'static/chunks/[name].[hash].js',
				entryFileNames: 'static/js/[name].js',
			},
		},
	},
}
