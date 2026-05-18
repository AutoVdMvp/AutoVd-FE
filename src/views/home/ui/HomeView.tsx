"use client";

import { ArticleEditor } from "@/widgets/article-editor";

export function HomeView() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-bold">AutoVD</h1>
      <div className="flex flex-col m-3.5 gap-3 ">
        <div className="relative">
          <ArticleEditor onSubmit={(text) => console.log(text)} />
        </div>
      </div>
    </div>
  );
}
