/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import type {
  PropSidebarItem,
  PropSidebarItemHtml,
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

export function shouldPathRender(
  path: string | undefined,
  privatePaths: PrivatePath[] | undefined,
  user: User | undefined
) {
  if (!privatePaths || !path) return true;

  const matchingPrivatePaths = privatePaths.filter((privatePath) => {
    let matches = false;
    if (typeof privatePath.path === "string") {
      matches = path.includes(privatePath.path);
    } else if (privatePath.path instanceof RegExp) {
      matches = privatePath.path.test(path);
    }

    if (!matches) return false;

    if (!user) return true;

    if (privatePath.groups) {
      const userGroups = user.getGroups();
      return !privatePath.groups.every((group: string) =>
        userGroups.includes(group)
      );
    }

    // invalid config - should render
    return false;
  });

  return matchingPrivatePaths.length === 0;
}

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
  // paths take precedence

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

export function isHtmlSidebarItem(
  item: PropSidebarItem
): item is PropSidebarItemHtml {
  return item.type === "html";
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
        // custom items should always be rendered as they might have custom rules
        if (isHtmlSidebarItem(item)) return true;

        return shouldItemRender(getSlashIDProps(item), user);
      }
    }).length === 0
  );
}
