import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    format: 'umd',
    plugins: [
        nodeResolve(),
        commonjs({
            namedExports: {
                'lodash/fp': [
                    'find',
                    'findIndex'
                ],
                'uuid': [
                    'v4'
                ]
            }
        })
    ],
    external: [
        'crypto'
    ],
    globals: {
        'crypto': 'Crypto'
    }
}
