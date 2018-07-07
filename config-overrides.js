const rewireDefinePlugin = require('react-app-rewire-define-plugin')

module.exports = function override(config, env) {
  
  config = rewireDefinePlugin(config, env, {
    'process.env.ENV': JSON.stringify(require('./package.json').env || 'local')
  })
  return config;
}