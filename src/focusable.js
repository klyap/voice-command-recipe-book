/* eslint-disable react/prop-types */
import React from 'react'

export const Focusable = ({ isFocused, refEl, children }) =>
  isFocused
    ? (
    <div id={'focused'} ref={refEl}>
      {children}
    </div>
      )
    : (
    <div>{children}</div>
      )
