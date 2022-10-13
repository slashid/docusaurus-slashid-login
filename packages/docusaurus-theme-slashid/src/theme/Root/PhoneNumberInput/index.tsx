/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { Dispatch, FC, SetStateAction } from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import css from './phone-number-input.module.css';

interface Props {
  id?: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  label?: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  value: string;
}

const PhoneNumberInput: FC<Props> = ({
  isDisabled,
  isSmall,
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div
      className={`${css.host} ${isSmall ? css.small : ''} ${
        isDisabled ? css.disabled : ''
      }`}
    >
      {label && <p className={css.label}>{label}</p>}
      <PhoneInput
        autoFormat={false}
        buttonClass={css.dropdownButton}
        containerClass={css.container}
        country='us'
        dropdownClass={css.dropdown}
        inputClass={css.input}
        onChange={(value, data, _, formattedValue) => {
          onChange(formattedValue);
        }}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default PhoneNumberInput;
