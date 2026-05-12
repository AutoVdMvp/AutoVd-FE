"use client";

import { forwardRef } from "react";

interface EditorInputProps {
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const EditorInput = forwardRef<HTMLDivElement, EditorInputProps>(
  ({ placeholder, onKeyDown }, ref) => {
    return (
      <div
        ref={ref}
        contentEditable
        role="textbox"
        enterKeyHint="enter"
        data-placeholder={placeholder}
        aria-label={placeholder}
        aria-multiline="true"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="text-lg leading-6 w-150 p-2.5 min-h-12 border-none outline-none transition-colors duration-200 whitespace-pre-wrap wrap-break-word"
      />
    );
  },
);

EditorInput.displayName = "EditorInput";
