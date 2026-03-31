import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ModuloCarousel',
            formats: ['es'],
            fileName: () => 'index.js',
        },
        emptyOutDir: true,
        sourcemap: true,
    },

    test: {
        environment: 'jsdom',
        globals: true,
        include: ['tests/**/*.{test,tests}.ts'],
    },
});