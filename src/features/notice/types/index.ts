type Notice = {
  noticeId: number;
  writerNo: number;
  title: string;
  content: string;
  startTime: string;
  endTime: string;
  registerTime: string;
  viewYn: string;
  status: string;
};

type NoticeListInfo = {
  pgno: number;
  totalCount: number;
  list: Notice[];
};

type WriteNoticeInfo = {
  noticeId?: number;
  title: String;
  content: String;
  startTime: String;
  endTime: String;
  viewYn: String; // 보일지 말지
  files: File[];
};
