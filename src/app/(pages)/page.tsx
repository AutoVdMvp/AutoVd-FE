"use client";
import { useState } from "react";
import { ArticleEditor } from "@/widgets/article-editor";
import { SidebarIcon } from "@/shared/icons/sideBarIcon";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);

  const handleSubmit = (text: string) => {
    setItems([...items, text]);
    console.log(text);
  };

  return (
    <main className="relative flex h-full">
      <div
        id="sidebar"
        className="flex flex-col justify-between h-full bg-blue-500 w-[288px] "
      >
        <div className="flex flex-col h-full gap-8 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xl font-bold text-amber-300">Auto VD</div>

            <SidebarIcon className=" w-7 h-7" />
          </div>

          <div className="flex flex-col flex-1 min-h-0 gap-3 overflow-y-auto">
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

        <div className="flex items-center justify-between h-20 gap-3 px-4 pb-4 text-sm border-t border-gray-300 shrink-0">
          <div className="flex items-center gap-3 shrink-0">
            <div>아이콘</div>
            <div className="flex flex-col gap-2 shrink-0">
              <span>이름</span>
              <span>요금제</span>
            </div>
          </div>
          <div>
            <span>이모티콘(더보기)</span>
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
