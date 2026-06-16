import { httpPost } from "@/shared/api";
import { ENDPOINTS } from "@/shared/config";

interface GoogleLoginRequest {
  credential: string;
}

export interface GoogleLoginResponse {
  access_token: string;
  token_type: string;
}

export const authMutations = {
  googleLogin: () => ({
    mutationKey: ["auth", "google"] as const,
    mutationFn: (body: GoogleLoginRequest) =>
      httpPost<GoogleLoginRequest, GoogleLoginResponse>(
        ENDPOINTS.auth.google,
        body,
      ),
  }),
};
