const mockPromises = [];

module.exports = function preloadAll() {
  if (mockPromises.length) {
    const promises = mockPromises.slice();
    mockPromises.length = 0;
    // While loading the components in `mockPromises`, more components may have
    // been dynamically loaded, adding more promises we should wait for.
    return Promise.all(promises).then(preloadAll);
  } else {
    return Promise.resolve();
  }
};

jest.doMock("next/dynamic", () => {
  const { default: dynamic } = jest.requireActual("next/dynamic");

  const mockDynamic = (...args) => {
    const LoadableComponent = dynamic(...args);
    mockPromises.push(LoadableComponent.preload());
    return LoadableComponent;
  };

  return mockDynamic;
});
