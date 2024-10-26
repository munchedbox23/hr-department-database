export type TTokenError = {
  success: false;
  message: string | null;
};

export interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
