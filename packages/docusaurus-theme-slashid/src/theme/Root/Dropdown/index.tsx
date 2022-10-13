/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Checkmark from '../Icons/Checkmark';
import ChevronDown from '../Icons/ChevronDown';
import ChevronUp from '../Icons/ChevronUp';
import css from './dropdown.module.css';

const parseOptionString = (option: string) => {
  const stringWithSpaces = option.replace(/_/g, ' ');

  return stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.slice(1);
};

interface Props {
  changeChosenOption: React.Dispatch<React.SetStateAction<any>>;
  chosenOption?: string;
  isSmall?: boolean;
  label: string;
  optionPlaceholder: string;
  options: undefined | string[];
}

const Dropdown: FC<Props> = ({
  changeChosenOption,
  chosenOption,
  isSmall,
  label,
  optionPlaceholder,
  options,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className={`${css.host} ${isSmall ? css.small : ''}`}>
      <DropdownMenu.Root onOpenChange={(open) => setIsDropdownOpen(open)}>
        <p className={css.label}>{label}</p>

        <DropdownMenu.Trigger asChild disabled={options === undefined}>
          <div
            className={`${css.dropdownTrigger} ${
              isDropdownOpen ? css.open : ''
            }`}
            tabIndex={1}
          >
            <span
              className={`${css.chosenOption} ${
                !chosenOption ? css.placeholder : ''
              }`}
            >
              {chosenOption
                ? parseOptionString(chosenOption)
                : optionPlaceholder}
            </span>
            <i className={css.chevron}>
              {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
            </i>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side='bottom'
          align='start'
          sideOffset={10}
          className={`${css.optionsContainer} ${
            isDropdownOpen ? css.open : ''
          }`}
        >
          {options?.map((option, key) => {
            return (
              <DropdownMenu.Item
                tabIndex={key + 1}
                onSelect={() => changeChosenOption(option)}
                key={key}
                className={`${css.option} ${
                  option === chosenOption ? css.selected : ''
                }`}
              >
                {option === chosenOption && (
                  <i className={css.checkmark}>
                    <Checkmark />
                  </i>
                )}
                {parseOptionString(option)}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Dropdown;
