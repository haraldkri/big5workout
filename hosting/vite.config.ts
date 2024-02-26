import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), VitePWA(getManifest())]
})

function getManifest(): Partial<VitePWAOptions> {
    return {
        includeAssets: ['./images/*'],
        manifest: {
            short_name: 'Big5Workout App',
            name: 'Big5Workout App PWA',
            icons: [
                {
                    src: '/images/logo.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
            start_url: '/',
            display: 'standalone',
            theme_color: '#1e1d24',
            background_color: '#1A1A1A',
            orientation: 'portrait',
        },
    }

}