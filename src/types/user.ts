export type User = {
  cusNo: number;
  userName: string;
  email: string;
};

export type MyInfo = {
  partnerCusNo: number;
  partnerName: string;
  authCode: string; // 관리자 유무
} & User;
