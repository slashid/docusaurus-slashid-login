/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import css from './code-block.module.css';

interface Props {
  code: string;
}

const CodeBlock: FC<Props> = ({ code }) => {
  return (
    <pre className={css.host}>
      <code>{JSON.stringify(code, null, ' ')}</code>
    </pre>
  );
};

export default CodeBlock;
