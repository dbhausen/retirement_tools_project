// vite.config.js
export default {
	build: {
		brotliSize: false,
		manifest: true,
		outDir: 'dist',
		rollupOptions: {
			output: {
				manualChunks: {
					mui_material: ['@mui/material'],
					tiptap_core: ['@tiptap/core'],
					tiptap_starter_kit: ['@tiptap/starter-kit'],
					recharts: ['recharts'],
					x_data_grid: ['@mui/x-data-grid'],
				},
				assetFileNames: 'static/[ext]/[name][extname]',
				chunkFileNames: 'static/chunks/[name].[hash].js',
				entryFileNames: 'static/js/[name].js',
			},
		},
	},
}
