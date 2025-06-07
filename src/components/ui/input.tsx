// ui/input.tsx
import React, { InputHTMLAttributes } from "react";

type InputProps = {
  id?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  // add minLength here
  minLength?: number;
};

export function Input(props: InputProps) {
  return <input {...props} className={`input-class ${props.className || ""}`} />;
}
