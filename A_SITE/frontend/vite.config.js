// vite.config.js
export default {
	build: {
		brotliSize: false,
		manifest: true,
		outDir: 'dist',
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react'],
					reactrouterdom: ['react-router-dom'],
					muimaterial: ['@mui/material'],
					tiptap: ['@tiptap/react'],
					tiptapstarterkit: ['@tiptap/starter-kit'],
					usehooksts: ['usehooks-ts'],
				},
				assetFileNames: 'static/[ext]/[name][extname]',
				chunkFileNames: 'static/chunks/[name].[hash].js',
				entryFileNames: 'static/js/[name].js',
			},
		},
	},
}
