import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'packages/**',
        'tests/**',
        'src/utils/translations.ts',
        'src/server/services/AnomalyService.ts',
        'src/utils/tsdb.ts',
        'src/server/realtime/**',
        'src/main.tsx',
        'server.ts'
      ],
    },
  },
});
