export type Relation = {
  relationId: number;
  userName: string;
  targetUserNo: number;
  registerTime: string;
  acceptStatus: string; //(요청은 N; 승인은 Y)
  acceptDate: string | null;
  anniversaryDate: string | null;
};
