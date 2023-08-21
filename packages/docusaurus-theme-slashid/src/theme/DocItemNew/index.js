/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import DocItem from "@theme-init/DocItem";

export default function DocItemWrapper(props) {
  const { content } = props;
  const { frontMatter } = content;

  console.log("DocItemWrapper", { props, content, frontMatter });
  return (
    <>
      <DocItem {...props} />
    </>
  );
}
