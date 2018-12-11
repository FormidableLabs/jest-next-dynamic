const mockInitializers = [];

module.exports = function preloadAll() {
  if (mockInitializers.length) {
    const promises = mockInitializers.map(preload => preload());
    mockInitializers.length = 0;
    // While loading the components in this round of initializers, more
    // components may have been dynamically loaded, adding more promises we
    // should wait for.
    return Promise.all(promises).then(preloadAll);
  } else {
    return Promise.resolve();
  }
};

jest.doMock("next/dynamic", () => {
  const { default: dynamic } = jest.requireActual("next/dynamic");

  const mockDynamic = (...args) => {
    const LoadableComponent = dynamic(...args);
    mockInitializers.push(() => LoadableComponent.preload());
    return LoadableComponent;
  };

  return mockDynamic;
});
