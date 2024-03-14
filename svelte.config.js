import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([
		preprocess({
			scss: {
				prependData: '@import "src/styles/_functions.scss"; @import "src/styles/_mixins.scss";'
			}
		})
	]),

	kit: {
		adapter: adapter(),
		alias: {
			$assets: './src/assets',
			$components: './src/components',
			$content: './src/content',
			$routes: './src/routes',
			$styles: './src/styles'
		}
	}
};

export default config;
