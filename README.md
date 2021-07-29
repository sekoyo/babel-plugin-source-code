# babel-plugin-source-code

Convert JSX `<code>` elements to [Prism](https://github.com/PrismJS/prism/) syntax highlighted code blocks at build time. Great for React based documentation websites.

At present the Prism supported languages are hardcoded to: bash, javascript, typescript, jsx, tsx, css, markup.

# Installation

Install with `yarn add -D babel-source-code` or `npm i -D babel-source-code`.

Add it to your babel plugins config:

```json
{
  "plugins": ["babel-source-code"]
}
```

# Usage

Import a [Prism](https://github.com/PrismJS/prism/) theme in your app:

```js
import 'prismjs/themes/prism-twilight.css'
```

Create your demos in separate files to the documentation:

```tsx
export default function ButtonDocs() {
  return (
    <DocLayout title="Buttons">
      <MyButtonDemo />
      <code data-path="./MyButtonDemo.tsx" data-lang="tsx" />
    </DocLayout>
  )
}
```

Only use relative paths in `data-path`.
