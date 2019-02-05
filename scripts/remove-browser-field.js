const pify = require('pify')
const fs = pify(require('fs'))
const path = require('path')

const removeBrowserField = async moduleName => {
  console.log(`- removing browser field for ${moduleName}`)
  const modulePath = path.dirname(require.resolve(moduleName))
  const packageJSON = JSON.parse(await fs.readFile(`${modulePath}/package.json`))
  delete packageJSON.browser
  delete packageJSON['react-native']
  await fs.writeFile(path.join(modulePath, 'package.json'), JSON.stringify(packageJSON, null, 2))
}

;(async () => {
  await removeBrowserField('simple-sha1')
})()
