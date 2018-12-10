# jest-next-dynamic

Unlike [react-loadable](https://github.com/jamiebuilds/react-loadable), the
[dynamic import](https://github.com/zeit/next.js#dynamic-import) support
offered by Next.js does not expose a way to preload the dynamically imported
components in Jest’s environment (which mimics a DOM environment).

This module can be imported in your tests or setup file to make sure any
component created with `next/dynamic` is added to a queue, which can then be
flushed with the exported `preloadAll` function.

## Usage

```js
// This will mock `next/dynamic`, so make sure to import it before any of your
// components.
import preloadAll from "jest-next-dynamic";

beforeAll(async () => {
  await preloadAll();
});
```
