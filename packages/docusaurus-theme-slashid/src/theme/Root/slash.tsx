/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useEffect } from "react";

import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsBrowser from "@docusaurus/useIsBrowser";

// @ts-ignore
const Fallback = ({ children }) => <>{children}</>;

// @ts-ignore
export const BrowserOnlySlashIDProvider = (props) => {
  return (
    <BrowserOnly fallback={<Fallback>{props.children}</Fallback>}>
      {() => {
        const SlashIDProvider = require("@slashid/react").SlashIDProvider;
        return <SlashIDProvider {...props} />;
      }}
    </BrowserOnly>
  );
};

const initialFn = () => {
  console.log("Fake SlashID called");
  return { sid: undefined, user: null, logIn: () => undefined };
};

// @ts-ignore
export const useLazyLoadedSlashID = () => {
  const isBrowser = useIsBrowser();
  const [loaded, setLoaded] = React.useState(false);
  const hookRef = React.useRef(initialFn);

  useEffect(() => {
    if (!isBrowser || loaded) {
      return;
    }

    import("@slashid/react").then((s) => {
      setLoaded(true);
      // @ts-ignore
      hookRef.current = s.useSlashID;
    });
  }, [isBrowser, loaded]);

  return hookRef.current();
};
