/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import type { PropDocContent } from "@docusaurus/plugin-content-docs";
import { Redirect } from "@docusaurus/router";
import { useSlashID } from "@slashid/react";
import DocItem from "@theme-init/DocItem";

import { SlashIDProps, shouldItemRender } from "../../domain";
import { useSlashIDConfig } from "../hooks/useSlashIDConfig";

function getSlashIDProps(docItemProps: Props): SlashIDProps | undefined {
  const slashIDProps =
    docItemProps?.content?.frontMatter?.sidebar_custom_props?.slashid;

  if (!slashIDProps) return undefined;

  return slashIDProps as SlashIDProps;
}

type Props = {
  content: PropDocContent;
};

export default function DocItemWrapper(props: Props) {
  const { user } = useSlashID();
  const config = useSlashIDConfig();
  const redirectTo = config.privateRedirectPath || "/";

  const p = getSlashIDProps(props);
  if (p) {
    console.log("DocItemWrapper", { p });
  }

  if (!shouldItemRender(getSlashIDProps(props), user)) {
    return <Redirect to={redirectTo} />;
  }

  return <DocItem {...props} />;
}
