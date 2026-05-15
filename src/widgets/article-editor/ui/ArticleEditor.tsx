"use client";

import { useRef, useState } from "react";
import { EditorInput } from "@/shared/ui/editor-input";
import type { ArticleEditorProps } from "../model/types";
import { EnterIcon } from "@/shared/icons/EnterIcon";

export function ArticleEditor({ onSubmit }: ArticleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const submitText = () => {
    const text = editorRef.current?.innerText.trim() || "";

    if (!text) return;

    onSubmit(text);
    if (editorRef.current) {
      editorRef.current.innerText = "";
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitText();
    }
  };
  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`flex flex-col w-full gap-3 overflow-y-auto transition-colors duration-300 border-2 rounded-lg outline-none scrollbar-none ${isFocused ? "border-peach-pastel" : "border-peach-pastel/50 hover:border-peach-pastel"}`}
    >
      <EditorInput
        ref={editorRef}
        placeholder="기사 링크를 입력해주세요"
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center justify-between px-4 py-2">
        <div>미래의 도구</div>
        <button
          onClick={submitText}
          className="flex items-center justify-center p-2 text-white transition-all duration-300 rounded-full cursor-pointer py w-9 h-9 bg-peach-deep/50 hover:bg-peach-deep active:scale-95"
        >
          <EnterIcon className="-translate-x-0.5 w-7 h-7 " />
        </button>
      </div>
    </div>
  );
}
