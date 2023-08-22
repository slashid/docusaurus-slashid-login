/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { Redirect } from "@docusaurus/router";
import { useSlashID } from "@slashid/react";
import DocItem from "@theme-init/DocItem";

import { useSlashIDConfig } from "../hooks/useSlashIDConfig";

function getSlashIDProps(props) {
  if (
    !props.content ||
    !props.content.frontMatter ||
    !props.content.frontMatter.sidebar_custom_props ||
    !props.content.frontMatter.sidebar_custom_props.slashid
  ) {
    return undefined;
  }

  return props.content.frontMatter.sidebar_custom_props.slashid;
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

export default function DocItemWrapper(props) {
  const { user } = useSlashID();
  const config = useSlashIDConfig();
  const redirectTo = config.privatePathRedirect || "/";

  if (!shouldItemRender(props, user)) {
    return <Redirect to={redirectTo} />;
  }

  return <DocItem {...props} />;
}
