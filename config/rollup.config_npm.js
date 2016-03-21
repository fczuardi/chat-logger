import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
    entry: [
        './src/loggerReducer.js',
        './src/actionTypes.js'
    ],
    format: 'cjs',
    plugins: [
        multiEntry(),
        babel({
            "babelrc": false,
            "presets": [
                "es2015-rollup",
                "stage-2"
            ]
        })
    ],
    dest: './dist/npm/index.js'
};
