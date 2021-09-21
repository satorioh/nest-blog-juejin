export interface Article {
  id?: string;
  title: string;
  description: string;
  content: string;
  createTime?: string;
  updateTime?: string;
  isDelete?: boolean;
}
