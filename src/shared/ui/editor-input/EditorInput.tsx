"use client";

import { useRef } from "react";

interface EditorInputProps {
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export function EditorInput({ placeholder, onKeyDown }: EditorInputProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={editorRef}
      contentEditable="true"
      role="textbox"
      enterKeyHint="enter"
      data-placeholder={placeholder}
      aria-label={placeholder}
      aria-multiline="true"
      aria-required="false"
      aria-invalid="false"
      translate="no"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="text-lg leading-4 w-125 p-2.5 min-h-12 border-none outline-none transition-colors duration-200 whitespace-pre-wrap wrap-break-word"
    />
  );
}
