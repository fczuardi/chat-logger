import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
    entry: [
        './src/lib/loggerReducer.js',
        './src/lib/actionTypes.js'
    ],
    format: 'cjs',
    plugins: [
        multiEntry(),
        babel({
            "babelrc": false,
            "presets": [
                "es2015-rollup",
                "stage-2",
                "stage-3"
            ]
        })
    ],
    dest: './dist/npm/index.js'
};
