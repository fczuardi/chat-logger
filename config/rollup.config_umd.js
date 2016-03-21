import babel from 'rollup-plugin-babel';

export default {
    format: 'umd',
    plugins: [
        babel({
            "babelrc": false,
            "externalHelpers": true,
            "presets": [
                "es2015-rollup",
                "stage-2",
                "stage-3",
                "react"
            ]
        })
    ]
};
