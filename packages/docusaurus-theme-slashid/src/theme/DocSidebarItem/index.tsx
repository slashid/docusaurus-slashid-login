/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useMemo } from "react";

import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import { useSlashID, Groups } from "@slashid/react";
import DocSidebarItem from "@theme-init/DocSidebarItem";

import {
  SlashIDProps,
  isCategory,
  isHtmlSidebarItem,
  shouldNoItemsRender,
  shouldPathRender,
} from "../../domain";
import { useSlashIDConfig } from "../hooks/useSlashIDConfig";

function getSlashIDProps(item: PropSidebarItem): SlashIDProps | undefined {
  const props = item?.customProps?.slashid;

  if (!props) return undefined;

  return props as SlashIDProps;
}

type Props = {
  item: PropSidebarItem;
};

export default function DocSidebarItemWrapper(props: Props) {
  const { user } = useSlashID();
  const slashIDProps = getSlashIDProps(props.item);
  const config = useSlashIDConfig();

  const Component = useMemo(() => {
    // path takes precedence
    if (
      !isHtmlSidebarItem(props.item) &&
      !shouldPathRender(props.item.href, config.privatePaths, user)
    ) {
      return null;
    }

    if (
      isCategory(props.item) &&
      shouldNoItemsRender(props.item.items, user, getSlashIDProps)
    ) {
      return null;
    }

    if (!slashIDProps || !slashIDProps.auth) {
      return <DocSidebarItem {...props} />;
    }

    const { auth, groups } = slashIDProps;

    if (auth && !user) {
      return null;
    }

    if (groups) {
      const belongsTo = (userGroups: string[]) =>
        groups.every((group) => userGroups.includes(group));
      return (
        <Groups belongsTo={belongsTo}>
          <DocSidebarItem {...props} />
        </Groups>
      );
    }

    return null;
  }, [config.privatePaths, props, slashIDProps, user]);

  return Component;
}
