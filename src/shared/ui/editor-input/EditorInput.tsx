"use client";

import { forwardRef } from "react";

interface EditorInputProps {
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onInput?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

// URL 등 긴 텍스트 입력을 위한 contentEditable 기반 에디터 입력 필드.
export const EditorInput = forwardRef<HTMLDivElement, EditorInputProps>(
  ({ placeholder, onKeyDown, onInput }, ref) => {
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
        onInput={onInput}
        className="lg:text-lg md:text-base text-sm md:leading-6 leading-3 lg:w-150 md:w-100 w-60 p-1.5 md:min-h-12 min-h-10 md:p-2.5 max-h-36 md:max-h-72 overflow-y-auto scrollbar-custom border-none outline-none transition-colors duration-200 whitespace-pre-wrap wrap-break-word"
      />
    );
  },
);

EditorInput.displayName = "EditorInput";
