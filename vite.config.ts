import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
    plugins: [
        tailwindcss(),
        Icons({
            compiler: 'svelte',
            customCollections: {
                custom: FileSystemIconLoader('./src/lib/assets/icons'),
            },
        }),
        sveltekit(),
    ],
});
