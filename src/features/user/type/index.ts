export type Relation = {
  relationId: number;
  userNo: number;
  targetUserNo: number;
  registerTime: string;
  acceptStatus: string; //(요청은 N; 승인은 Y)
  acceptDate: string;
  anniversaryDate: string;
};
