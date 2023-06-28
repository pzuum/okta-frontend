import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    
    resolve: {
        alias: {
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            util: "util",
        },
    },
})