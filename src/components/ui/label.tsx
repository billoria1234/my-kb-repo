import { LabelHTMLAttributes } from "react";

export const Label = ({ className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className={`block mb-1 text-sm font-medium ${className}`} {...props} />;
};
