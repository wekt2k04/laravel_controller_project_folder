import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // <--- On ajoute le plugin React

export default defineConfig({
    plugins: [
        laravel({
            // On pointe bien vers le fichier .jsx
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(), // <--- On active React
    ],
});