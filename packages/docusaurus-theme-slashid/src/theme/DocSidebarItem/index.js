/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useMemo } from "react";

import { useSlashID, Groups } from "@slashid/react";
import DocSidebarItem from "@theme-init/DocSidebarItem";

function isCategory(item) {
  return Array.isArray(item.items);
}

function shouldItemRender(item, user) {
  const slashIDProps = getSlashIDProps(item);
  if (!slashIDProps || !slashIDProps.auth) {
    return true;
  }

  const { groups } = slashIDProps;

  if (!user) {
    return false;
  }

  if (groups) {
    const belongsTo = (userGroups) =>
      groups.every((group) => userGroups.includes(group));
    return belongsTo(user.getGroups());
  }

  return true;
}

function shouldNoItemsRender(items, user) {
  return (
    items.filter((item) => {
      if (isCategory(item)) {
        return shouldNoItemsRender(item.items, user);
      } else {
        return shouldItemRender(item, user);
      }
    }).length === 0
  );
}

function getSlashIDProps(item) {
  if (!item || !item.customProps || !item.customProps.slashid) {
    return undefined;
  }

  return item.customProps.slashid;
}

export default function DocSidebarItemWrapper(props) {
  const { user } = useSlashID();
  const slashIDProps = getSlashIDProps(props.item);

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
      const belongsTo = (userGroups) =>
        groups.every((group) => userGroups.includes(group));
      return (
        <Groups belongsTo={belongsTo}>
          <DocSidebarItem {...props} />
        </Groups>
      );
    }
  }, [props, slashIDProps, user]);

  return Component;
}
