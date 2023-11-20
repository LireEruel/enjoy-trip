export type User = {
  cusNo: number;
  userName: string;
  email: string;
};

export type MyInfo = {
  partnerCusNo: number;
  authCode: string; // 관리자 유무
  accessToken: string;
  partenerCusNo: number;
  partnerName: string;
  refreshToken: string;
  roomId: number;
} & User;
