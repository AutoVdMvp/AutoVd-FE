"use client";
import { useState } from "react";
import { ArticleEditor } from "@/widgets/article-editor";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);

  const handleSubmit = (text: string) => {
    setItems([...items, text]);
    console.log(text);
  };

  return (
    <main className="relative flex min-h-screen">
      <div className="flex flex-col min-h-full gap-8 py-4 pl-4 bg-blue-500 w-[288px]">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xl font-bold text-amber-300">Auto VD</div>
          <div>슬라이드바 이모티콘</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div>아이콘</div>
            <span>내 정보</span>
          </div>
          <div className="flex gap-3">
            <div>아이콘</div>
            <span>내 정보</span>
          </div>
          <div className="flex gap-3">
            <div>아이콘</div>
            <span>내 정보</span>
          </div>

          <div className="flex gap-3">
            <div>아이콘</div>
            <span>내 정보</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-xl font-bold">AutoVD</h1>
        <div className="flex flex-col m-3.5 gap-3">
          <div className="relative">
            <ArticleEditor onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
}
