"use client";

import { useRef } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { EditorInput } from "@/shared/ui/editor-input";
import { Button, FormError } from "@/shared/ui";
import { Icons } from "@/shared/icons";
import { urlSchema } from "@/shared/lib/validators";
import type { ArticleEditorProps } from "../model/types";

// 기사 링크를 입력받아 제출하는 에디터. URL 형식 검증을 포함한다.
export function ArticleEditor({ onSubmit, disabled }: ArticleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: { link: "" },
    onSubmit: ({ value }) => {
      onSubmit(value.link.trim());
      if (editorRef.current) editorRef.current.innerText = "";
      form.reset();
    },
  });

  return (
    <div className="flex flex-col w-full md:gap-3 gap-2 overflow-hidden transition-colors duration-300 border-2 rounded-lg outline-none scrollbar-none border-peach-pastel/50 focus-within:border-peach-pastel hover:border-peach-pastel">
      <form.Field
        name="link"
        validators={{
          onSubmit: ({ value }) => {
            const result = urlSchema.safeParse(value);
            return result.success ? undefined : result.error.issues[0].message;
          },
        }}
      >
        {(field) => (
          <>
            <EditorInput
              ref={editorRef}
              placeholder="기사 링크를 입력해주세요"
              onInput={(e) => field.handleChange(e.currentTarget.innerText)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit();
                }
              }}
            />
            {field.state.meta.errors[0] && (
              <FormError message={String(field.state.meta.errors[0])} />
            )}
          </>
        )}
      </form.Field>

      <div className="flex items-center justify-between px-2 py-1 md:px-4 md:py-2">
        <div>미래의 도구</div>
        <Button
          size="icon"
          onClick={() => form.handleSubmit()}
          disabled={disabled}
          className="text-white rounded-full w-9 h-9 bg-peach-deep/50 hover:bg-peach-deep active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icons.Enter className="-translate-x-0.5 w-7 h-7" />
        </Button>
      </div>
    </div>
  );
}
