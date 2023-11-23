export type User = {
  cusNo: number;
  userName: string;
  emailId: string;
  emailDomain: string;
  profileImg: null | string;
};

export type MyInfo = {
  partnerCusNo: number;
  authCode: string; // 관리자 유무
  accessToken: string;
  partnerName: string;
  refreshToken: string;
  roomId: number;
} & User;
