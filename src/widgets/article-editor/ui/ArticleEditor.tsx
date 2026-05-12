"use client";

import { useRef } from "react";
import { EditorInput } from "@/shared/ui/editor-input";
import type { ArticleEditorProps } from "../model/types";

export function ArticleEditor({ onSubmit }: ArticleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = editorRef.current?.innerText.trim() || "";
      if (text) {
        onSubmit(text);
        if (editorRef.current) {
          editorRef.current.innerText = "";
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 overflow-y-auto border-2 border-gray-300 rounded-lg outline-none scrollbar-none">
      <EditorInput
        placeholder="기사 링크를 입력해주세요"
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center justify-between px-4 py-2">
        <div>미래의 도구</div>
        <button className="w-10 h-10 px-4 py-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600">
          +
        </button>
      </div>
    </div>
  );
}
