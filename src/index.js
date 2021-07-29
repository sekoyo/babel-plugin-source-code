/* eslint-env node */
const nodePath = require('path')
const fs = require('fs')
const t = require('@babel/types')

function getAttr(attrs, attrName, fallback) {
  const attr = attrs.find(attr => attr.name.name === attrName)
  if (attr) {
    return attr.value.value
  }
  return fallback
}

module.exports = () => ({
  name: 'source-code',
  inherits: require('@babel/plugin-syntax-jsx').default,
  visitor: {
    JSXElement(path, state) {
      // Is this a code element?
      if (path.node.openingElement.name.name === 'ins') {
        // Does it have a data-path attr? (else ignore).
        const dataPath = getAttr(path.node.openingElement.attributes, 'data-path')

        if (dataPath) {
          // Resolve the path relative to the file.
          const resolvedPath = nodePath.resolve(nodePath.dirname(state.file.opts.filename), dataPath)
          const fileContents = fs.readFileSync(resolvedPath, 'utf8')

          // Replace with the file contents.
          path.replaceWith(t.stringLiteral(fileContents))
        }
      }
    },
  },
})
