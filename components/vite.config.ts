/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // FIX: __dirname is not available in ES modules. Use import.meta.url to get the current directory path.
          '@': path.dirname(fileURLToPath(import.meta.url)),
        }
      }
    };
});