import { VideoDetailView } from "@/views/video-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VideoDetailView id={id} />;
}
