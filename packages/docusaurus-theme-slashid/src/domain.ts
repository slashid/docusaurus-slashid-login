/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import type {
  PropSidebarItem,
  PropSidebarItemCategory,
} from "@docusaurus/plugin-content-docs";
import type { User } from "@slashid/slashid";
import { OAuthProvider } from "@slashid/slashid";

export interface PrivatePath {
  path: string | RegExp;
  groups?: string[];
}
export interface ThemeConfig {
  slashID?: {
    orgID: string;
    oidcClientID?: string;
    oidcProvider?: OAuthProvider;
    forceLogin?: boolean;
    baseURL?: string;
    sdkURL?: string;
    privatePaths?: PrivatePath[];
    privateRedirectPath?: string;
  };
}

export type SlashIDProps = {
  auth: boolean;
  groups?: string[];
};

/**
 * Tests if the given item should be rendered based on the user state and the front matter config.
 * @param slashIDProps set by the front matter on the relevant page
 * @param user SlashID User instance
 * @returns a {boolean} indicating whether the user should be able to see the item
 */
export function shouldItemRender(
  slashIDProps: SlashIDProps | undefined,
  user: User | undefined
) {
  if (!slashIDProps || !slashIDProps.auth) {
    return true;
  }

  const { groups } = slashIDProps;

  if (!user) {
    return false;
  }

  if (groups) {
    const userGroups = user.getGroups();
    return groups.every((group: string) => userGroups.includes(group));
  }

  return true;
}

export function isCategory(
  item: PropSidebarItem
): item is PropSidebarItemCategory {
  return item.hasOwnProperty("items") && item.type === "category";
}

export function shouldNoItemsRender(
  items: PropSidebarItem[],
  user: User | undefined,
  getSlashIDProps: (item: PropSidebarItem) => SlashIDProps | undefined
): boolean {
  return (
    items.filter((item) => {
      if (isCategory(item)) {
        return shouldNoItemsRender(item.items, user, getSlashIDProps);
      } else {
        return shouldItemRender(getSlashIDProps(item), user);
      }
    }).length === 0
  );
}
