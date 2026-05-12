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
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-xl font-bold">AutoVD</h1>
      <div className="flex flex-col m-3.5 gap-3">
        <div className="relative">
          <ArticleEditor onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}
