type Notice = {
  noticeId: number;
  writerNo: number;
  title: string;
  content: string;
  startTime: string;
  endTime: string;
  registerTime: string;
  hit: string;
  viewYn: string;
};

type NoticeListInfo = {
  pgno: number;
  totalCount: number;
  list: Notice[];
};
