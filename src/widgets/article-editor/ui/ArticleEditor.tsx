"use client";

import { useRef, useState } from "react";
import { EditorInput } from "@/shared/ui/editor-input";
import type { ArticleEditorProps } from "../model/types";
import { Icons } from "@/shared/icons";
import { Button } from "@/shared/ui";

// 기사 링크를 입력받아 제출하는 에디터. Enter 키 또는 버튼으로 제출한다.
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
      className={`flex flex-col w-full md:gap-3 gap-2 overflow-hidden transition-colors duration-300 border-2 rounded-lg outline-none scrollbar-none ${isFocused ? "border-peach-pastel" : "border-peach-pastel/50 hover:border-peach-pastel"}`}
    >
      <EditorInput
        ref={editorRef}
        placeholder="기사 링크를 입력해주세요"
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center justify-between px-2 py-1 md:px-4 md:py-2">
        <div>미래의 도구</div>
        <Button
          size="icon"
          onClick={submitText}
          className="text-white rounded-full w-9 h-9 bg-peach-deep/50 hover:bg-peach-deep active:scale-95"
        >
          <Icons.Enter className="-translate-x-0.5 w-7 h-7" />
        </Button>
      </div>
    </div>
  );
}
