import { ComponentType } from "react";

declare module "../ui/input" {
  export const Input: ComponentType<{
    id?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
  }>;
}