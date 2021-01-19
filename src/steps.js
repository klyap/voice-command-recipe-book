import React from "react";
import { Focusable } from './focusable';
import { Header } from "./header";

export const Steps = ({ currentStep, refEl, steps, focusedId }) => {
  const CircledText = ({isFocused, children}) => {
    return <div className={isFocused ? 'circle-focused' : 'circle'}>{children}</div>
  }

  return (
    <>
    <Header>Steps</Header>
    {steps.map((step, i) => {
      const stepNumber = i+1;
      const key = `step-${stepNumber}`;
      const isFocused = focusedId === key;
      return (
          <Focusable key={key} refEl={refEl} isFocused={isFocused}>
          <div className="flex">
            <CircledText isFocused={isFocused}>{stepNumber}</CircledText>
            <p>
              {step}
            </p>
          </div>
          </Focusable>
        );
    })}
    </>
  );
};
