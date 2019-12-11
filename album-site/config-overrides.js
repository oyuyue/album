const { override, adjustStyleLoaders } = require('customize-cra')

module.exports = override(
  adjustStyleLoaders(({ use: [, , , , processor] }) => {
    if (processor && processor.loader.includes('sass-loader')) {
      processor.options.data = '@import "assets/styles/abstracts/index";'
    }
  })
)
