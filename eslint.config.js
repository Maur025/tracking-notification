import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js, prettier },
		extends: ['js/recommended'],
		rules: {
			'prettier/prettier': 'error',
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		languageOptions: { globals: globals.node },
	},
	tseslint.configs.recommended,
	{
		files: ['**/*.json'],
		plugins: { json },
		language: 'json/json',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.jsonc'],
		plugins: { json },
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},
]);
