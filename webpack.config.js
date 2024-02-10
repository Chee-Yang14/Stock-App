const path = require('path')

module.exports = {
    mode: 'development',
    entry: ['./src/index.js', './src/firebase.js', './src/display.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}