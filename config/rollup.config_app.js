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
    ],
    external: [
        'redux',
        'react',
        'react-dom',
        'react-redux',
        'lodash/fp',
        'rethinkdb-websocket-client'
    ],
    globals: {
        'redux': 'Redux',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'lodash/fp': 'LodashFP',
        'rethinkdb-websocket-client': 'RethinkdbWebsocketClient'
    }
};
