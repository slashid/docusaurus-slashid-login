/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { useSlashID } from "@slashid/react";
import NavbarItem from "@theme-init/NavbarItem";

import { shouldPathRender } from "../../domain";
import { useSlashIDConfig } from "../hooks/useSlashIDConfig";

type NavItem = {
  to?: `/${string}`;
};

function isNavItem(item: any): item is NavItem {
  return typeof item.to === "string";
}

export default function NavbarItemWrapper(props: any) {
  const options = useSlashIDConfig();
  const { user } = useSlashID();

  if (
    isNavItem(props) &&
    !shouldPathRender(props.to, options.privatePaths, user)
  ) {
    return null;
  }

  return (
    <>
      <NavbarItem {...props} />
    </>
  );
}
