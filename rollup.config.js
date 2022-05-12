import typescript from 'rollup-plugin-typescript2';
import eslint from '@rollup/plugin-eslint';

export default {
	input: 'src/index.ts',
	output: [
		{ file: 'dist/index.umd.js',name:'enum-helper', format: 'umd', sourcemap: true },
		{ file: 'dist/index.es.js', format: 'es', sourcemap: true },
		{ file: 'dist/index.js', format: 'cjs', sourcemap: true },
	],
	plugins: [
		typescript(/*{ plugin options }*/),
		eslint()
	]
}
