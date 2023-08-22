/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import type { PropCategoryGeneratedIndex } from "@docusaurus/plugin-content-docs";
import DocCategoryGeneratedIndexPage from "@theme-init/DocCategoryGeneratedIndexPage";

export type Props = {
  categoryGeneratedIndex: PropCategoryGeneratedIndex;
};

export default function DocCategoryGeneratedIndexPageWrapper(props: any) {
  return <DocCategoryGeneratedIndexPage {...props} />;
}
