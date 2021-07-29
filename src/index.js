/* eslint-env node */
const nodePath = require('path')
const fs = require('fs')
const Prism = require('prismjs')
const template = require('@babel/template')
const t = require('@babel/types')
const { declare } = require('@babel/helper-plugin-utils')

require('prismjs/components/prism-bash')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-tsx')
require('prismjs/components/prism-css')
require('prismjs/components/prism-markup')

function getAttr(attrs, attrName, fallback) {
  const attr = attrs.find(attr => attr.name.name === attrName)
  if (attr) {
    return attr.value.value
  }
  return fallback
}

const sourceCodeTpl = template.expression({
  plugins: ['jsx'],
})`<pre className="DATA_LANG">
<code className="DATA_LANG" dangerouslySetInnerHTML={{ __html: HIGHLIGHTED_CODE }}></code>
</pre>`

module.exports = declare(api => {
  api.assertVersion(7)

  return {
    name: 'source-code',
    inherits: require('@babel/plugin-syntax-jsx').default,
    visitor: {
      JSXElement(path, state) {
        // Is this a code element?
        if (path.node.openingElement.name.name === 'code') {
          // Does it have a data-path attr? (else ignore).
          const dataPath = getAttr(path.node.openingElement.attributes, 'data-path')

          if (dataPath) {
            // Get the data-lang attr else default to "js".
            const dataLang = getAttr(path.node.openingElement.attributes, 'data-lang', 'tsx')

            // Resolve the path relative to the file.
            const resolvedPath = nodePath.resolve(nodePath.dirname(state.file.opts.filename), dataPath)
            const fileContents = fs.readFileSync(resolvedPath, 'utf8')

            // Generate syntax highlighted HTML.
            const highlightedCode = Prism.highlight(fileContents, Prism.languages[dataLang], dataLang)

            // Replace the node with syntax highlighted source code.
            const ast = sourceCodeTpl({
              DATA_LANG: t.stringLiteral('language-' + dataLang),
              HIGHLIGHTED_CODE: t.stringLiteral(highlightedCode),
            })
            path.replaceWith(ast)
          }
        }
      },
    },
  }
})
