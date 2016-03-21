import babel from 'rollup-plugin-babel';

export default {
    format: 'cjs',
    plugins: [
        babel({
            "babelrc": false,
            "presets": [
                "es2015-rollup",
                "stage-2",
                "stage-3"
            ]
        })
    ]
};
