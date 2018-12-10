import React from "react";
import dynamic from "next/dynamic";

const NextDynamic = dynamic(
  () =>
    // To prevent cheating by working without waiting for `preloadAll` due to the
    // way Jest schedules tests on the event loop, delay the promise by more than
    // what this `import()` transform would do.
    new Promise((resolve, reject) => {
      setTimeout(() => {
        import("./NextDynamic")
          .then(component => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(component);
              }, 500);
            });
          })
          .then(resolve, reject);
      }, 500);
    })
);

export default function NextDynamicNested() {
  return (
    <div>
      <p>Nested dynamic loaded component:</p>
      <NextDynamic />
    </div>
  );
}
