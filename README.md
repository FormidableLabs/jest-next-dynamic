<a href="https://commerce.nearform.com/open-source/" target="_blank">
  <img alt="Jest-Next-Dynamic" src="https://oss.nearform.com/api/banner.svg?text=jest-next-dynamic" />
</a>

[![Maintenance Status][maintenance-image]](#maintenance-status)

Unlike [react-loadable](https://github.com/jamiebuilds/react-loadable), the
[dynamic import](https://github.com/zeit/next.js#dynamic-import) support
offered by Next.js does not expose a way to preload the dynamically imported
components in Jest’s environment (which mimics a DOM environment). Even if you
get a handle on the `Loadable` component bundled with Next.js, it skips queuing
up the components in DOM-like environments. Bummer!

This module can be imported in your test or setup files to make sure any
component created with `next/dynamic` is added to a queue, which can then be
flushed with the exported `preloadAll` function.

Using this, your component tests (including snapshots) can render the full
component tree instead of the loading placeholders.

## Setup

In order to transform `import()` successfully in Jest’s environment, you must
use a different transform than the one provided by `next/babel` (which expects
to be built with webpack).

Both of these work fine:

- [babel-plugin-dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node)
- [babel-plugin-transform-dynamic-import](https://www.npmjs.com/package/babel-plugin-transform-dynamic-import)

```json
{
  "plugins": ["babel-plugin-dynamic-import-node"]
}
```

## Usage

```js
// This will mock `next/dynamic`, so make sure to import it before any of your
// components.
import preloadAll from "jest-next-dynamic";
// This component can have dynamic imports anywhere in its rendered tree,
// including nested dynamic imports.
import SomeComponent from "./SomeComponent";

beforeAll(async () => {
  await preloadAll();
});

// Your tests here!
```

## 🤝 Contributing

Please see our [Contributing](./CONTRIBUTING.md) guide.

## Maintenance Status

**Active:** NearForm (Previously Formidable) is actively working on this project, and we expect to continue work on this project for the foreseeable future. Bug reports, feature requests and pull requests are welcome.

[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg?color=brightgreen&style=flat

