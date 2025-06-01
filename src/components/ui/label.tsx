import React from "react";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

export const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};