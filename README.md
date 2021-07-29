# babel-plugin-source-code

Import file contents into your JSX `<code>` blocks at build time. Great for syntax highlighting component examples.

# Installation

Install [Prism](https://github.com/PrismJS/prism/) as per their guide.

Install `yarn add -D babel-plugin-source-code` or `npm i -D babel-plugin-source-code`.

Add it to your babel plugins config:

```json
{
  "plugins": ["babel-plugin-source-code"]
}
```

# Usage

Create your demos in separate files to the documentation:

```tsx
import { ButtonDemo } from './ButtonDemo'

export default function ButtonDocs() {
  return (
    <DocLayout title="Buttons">
      <ButtonDemo />
      <pre className="language-tsx">
        <code className="language-tsx">
          <ins data-path="./ButtonDemo.tsx" />
        </code>
      </pre>
    </DocLayout>
  )
}
```

Only use relative paths in `data-path`.
