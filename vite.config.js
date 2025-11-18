import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: "/cdcc-react-app/",
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 2000, // limit in KB
	}

})
