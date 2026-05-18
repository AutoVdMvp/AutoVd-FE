"use client";

import { ArticleEditor } from "@/widgets/article-editor";

export function HomeView() {
  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="flex flex-col items-center gap-4 pt-[30vh] pb-16 w-full">
        <h1 className="text-xl font-bold">AutoVD</h1>
        <div className="flex flex-col m-3.5 gap-3">
          <div className="relative">
            <ArticleEditor onSubmit={(text) => console.log(text)} />
          </div>
        </div>
      </div>
    </div>
  );
}
