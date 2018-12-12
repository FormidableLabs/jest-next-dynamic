const mockInitializers = [];

module.exports = function preloadAll() {
  if (mockInitializers.length) {
    // Copy and empty out `mockInitializers` right away so that any newly
    // enqueued components are found in the next pass.
    const initializers = mockInitializers.slice();
    mockInitializers.length = 0;
    // While loading the components in this round of initializers, more
    // components may have been dynamically imported, adding more initializers
    // we should run and await.
    return Promise.all(initializers.map(preload => preload())).then(preloadAll);
  } else {
    return Promise.resolve();
  }
};

jest.doMock(
  "next/dynamic",
  () => {
    const { default: dynamic } = jest.requireActual("next/dynamic");

    const mockDynamic = (...args) => {
      const LoadableComponent = dynamic(...args);
      mockInitializers.push(() => LoadableComponent.preload());
      return LoadableComponent;
    };

    return mockDynamic;
  },
  // In order to more easily include this feature in shared Jest setups (like
  // presets), use `virtual: true` to avoid throwing an error when `next` isn't
  // actually installed.
  {
    virtual: true
  }
);
