/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useMemo } from "react";

import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import { useSlashID } from "@slashid/react";
import DocCardList from "@theme-init/DocCardList";

import { SlashIDProps, shouldItemRender } from "../../domain";

type Props = {
  items: PropSidebarItem[];
  className?: string;
};

function getSlashIDProps(item: PropSidebarItem): SlashIDProps | undefined {
  const props = item?.customProps?.slashid;

  if (!props) return undefined;

  return props as SlashIDProps;
}

export default function DocCardListWrapper(props: Props) {
  const { user } = useSlashID();

  const updatedProps = useMemo(() => {
    return {
      ...props,
      items: props.items.filter((item) =>
        shouldItemRender(getSlashIDProps(item), user)
      ),
    };
  }, [props, user]);

  return <DocCardList {...updatedProps} />;
}
