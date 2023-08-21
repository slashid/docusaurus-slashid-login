/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import DocSidebarItem from "@theme-original/DocSidebarItem";

export default function DocSidebarItemWrapper(props) {
  if (props.item && props.item.customProps && props.item.customProps.auth) {
    console.log("DocSidebarItemWrapper", { props });
  }

  return (
    <>
      <DocSidebarItem {...props} />
    </>
  );
}
