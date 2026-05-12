import { useMutation } from "@tanstack/react-query";
import { postLink } from "../api/postLink";

export const usePostLink = ({ link }: { link: string }) => {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["postLink", link],
    mutationFn: async (data: { link: string }) => {
      const response = postLink(data.link);
      console.log("usePostLink response :", response);
      return response;
    },
  });

  return { mutate, isPending, isError };
};
