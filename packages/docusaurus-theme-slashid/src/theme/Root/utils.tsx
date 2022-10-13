/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from 'react';


const getErrorMessage = (error: string) => {
  switch (error) {
    case 'malformed phone number':
      return 'The phone number you inserted is not valid';
    case 'maformed email address':
      return 'The email address you inserted is not valid';
    default:
      return error;
  }
};

const getMethodText = (method: string) => {
    switch (method) {
      case 'webauthn':
      case 'webauthn_via_sms':
        return "You'll be prompted to validate your login via your device!";
      case 'webauthn_via_email':
      case 'email_link':
      default:
        return 'We have sent you a link via email. Follow the link provided to complete your registration.';
      case 'sms_link':
        return 'We have sent you a link via text. Follow the link provided to complete your registration.';
      case 'otp_via_sms':
        return 'We sent you a code via text. Please insert it.';
    }
};
  
const useValidateEmail = () => {
    const validateEmail = React.useCallback((email: string) => {
        const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (String(email).toLowerCase().match(emailRegex)) {
        return true;
        } else {
        return false;
        }
    }, []);
    
    return { validateEmail };
};
    
const useValidateNumber = () => {
    const validateNumber = React.useCallback((number: string) => {
        const numberRegex = /^[\+](?=.*\d).{6,20}$/im;
    
        if (String(number).toLowerCase().match(numberRegex)) {
        return true;
        } else {
        return false;
        }
    }, []);
    
    return { validateNumber };
};

const filterOutOptions = (
    identifier: string | undefined,
    options: string[] | undefined
  ) => {
    if (!options) {
      return;
    }
  
    if (identifier === 'email_address') {
      return options.filter(
        (option) => option !== 'webauthn_via_email'
      );
    }
  
    if (identifier === 'phone_number') {
      return options.filter(
        (option) => option !== 'webauthn_via_sms'
      );
    }

    return;
  };



export {filterOutOptions, useValidateEmail, useValidateNumber, getErrorMessage, getMethodText}