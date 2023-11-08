export type User = {
  cusNo: number;
  name: string;
  email: string;
};

export type MyInfo = {
  partnerCusNo: number;
  partnerName: string;
  authCode: string; // 관리자 유무
};
