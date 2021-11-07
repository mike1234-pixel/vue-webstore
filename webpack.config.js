if (process.env.NODE_ENV === 'test') {
    module.exports.external = [require('webpack-node-externals')()]
    module.exports.devtool = 'inline-cheap-module-source-map'
}