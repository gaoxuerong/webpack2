const loaderUtils = require('loader-utils')
function loader(source) {
  loaderUtils.interpolateName(this,'[hash].[txt]',{content: source})
  this.emitFile(filename,source)
  return `module.exports = "${filename}"`
}
loader.raw = true
module.exports = loader