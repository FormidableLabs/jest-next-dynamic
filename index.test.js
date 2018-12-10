import React from "react";
import TestRenderer from "react-test-renderer";
import preloadAll from "./index";
import NextDynamicNested from "./test/NextDynamicNested";

beforeAll(async () => {
  await preloadAll();
});

it("renders nested next/dynamic components", () => {
  expect(TestRenderer.create(<NextDynamicNested />).toJSON()).toMatchSnapshot();
});
