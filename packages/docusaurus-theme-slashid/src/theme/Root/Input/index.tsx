/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import css from './input.module.css';

interface Props {
  id?: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string | number;
  autoFocus?: boolean;
}

const Input: FC<Props> = ({
  id,
  isDisabled,
  isSmall,
  label,
  onChange,
  placeholder,
  value,
  autoFocus,
}) => {
  return (
    <div
      className={`${css.host} ${isSmall ? css.small : ''} ${
        isDisabled ? css.disabled : ''
      }`}
    >
      {label && <p className={css.label}>{label}</p>}
      <input
        id={id}
        className={css.input}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        tabIndex={1}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Input;
