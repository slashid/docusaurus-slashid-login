/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useMemo } from "react";

import type {
  PropSidebarItem,
  PropSidebarItemCategory,
} from "@docusaurus/plugin-content-docs";
import { useSlashID, Groups } from "@slashid/react";
import { User } from "@slashid/slashid";
import DocSidebarItem from "@theme-init/DocSidebarItem";
import type { Props } from "@theme/DocSidebarItem";

import { SlashIDProps, shouldItemRender } from "../../domain";

function isCategory(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.hasOwnProperty("items") && item.type === "category";
}

function shouldNoItemsRender(
  items: PropSidebarItem[],
  user: User | undefined
): boolean {
  return (
    items.filter((item) => {
      if (isCategory(item)) {
        return shouldNoItemsRender(item.items, user);
      } else {
        return shouldItemRender(getSlashIDProps(item), user);
      }
    }).length === 0
  );
}

function getSlashIDProps(item: PropSidebarItem): SlashIDProps | undefined {
  const props = item?.customProps?.slashid;

  if (props) return undefined;

  return props as SlashIDProps;
}

export default function DocSidebarItemWrapper(props: Props) {
  const { user } = useSlashID();
  const slashIDProps = getSlashIDProps(props.item);

  if (slashIDProps) {
    console.log("DocSidebarItemWrapper", { slashIDProps });
  }

  const Component = useMemo(() => {
    if (isCategory(props.item) && shouldNoItemsRender(props.item.items, user)) {
      return null;
    }

    if (!slashIDProps) {
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
  }, [props, slashIDProps, user]);

  return Component;
}
