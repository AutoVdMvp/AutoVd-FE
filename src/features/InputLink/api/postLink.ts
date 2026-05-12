import axios from "axios";

export const postLink = async (link: string) => {
  try {
    const { data } = await axios.post("/api/link", { link });
    return data;
  } catch (error) {
    console.error("링크 전송 실패:", error);
    throw error;
  }
};
