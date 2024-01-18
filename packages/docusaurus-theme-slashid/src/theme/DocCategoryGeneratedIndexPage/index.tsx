/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import type { PropCategoryGeneratedIndex } from "@docusaurus/plugin-content-docs";
import { Redirect } from "@docusaurus/router";
import { useSlashID } from "@slashid/react";
import DocCategoryGeneratedIndexPage from "@theme-init/DocCategoryGeneratedIndexPage";

import { shouldPathRender } from "../../domain";
import { useSlashIDConfig } from "../hooks/useSlashIDConfig";

export type Props = {
  categoryGeneratedIndex: PropCategoryGeneratedIndex;
};

export default function DocCategoryGeneratedIndexPageWrapper(props: any) {
  const { user } = useSlashID();
  const config = useSlashIDConfig();
  const redirectTo = config.privateRedirectPath!;

  if (!shouldPathRender(props.route.path, config.privatePaths, user)) {
    return <Redirect to={redirectTo} />;
  }

  return <DocCategoryGeneratedIndexPage {...props} />;
}
