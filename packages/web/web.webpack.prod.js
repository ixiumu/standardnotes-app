const { merge } = require('webpack-merge')
const mergeWithEnvDefaults = require('./web.webpack-defaults.js')
const config = require('./web.webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  mergeWithEnvDefaults(env)
  return merge(config(env, argv), {
    mode: 'production',
    devtool: 'source-map',
    optimization:
      process.env.BUILD_TARGET === 'clipper'
        ? {
            splitChunks: {
              chunks: 'all',
            },
          }
        : {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              exclude: /components\/assets\/org\.standardnotes\.markdown-vditor/,
            }),
          ],
        },
  })
}
