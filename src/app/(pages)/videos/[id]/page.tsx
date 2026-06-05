import { notFound } from "next/navigation";
import { MOCK_VIDEOS } from "@/entities/video";
import { VideoDetailView } from "@/views/video-detail";

// 비디오 상세 페이지. SSR로 데이터를 조회하고 VideoDetailView에 전달한다.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = MOCK_VIDEOS.find((v) => v.id === id);

  if (!video) notFound();

  return <VideoDetailView video={video} />;
}
