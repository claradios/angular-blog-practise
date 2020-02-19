export interface PostDTO {
  _id: string;
  author: string;
  nickname: string;
  userImage: string;
  title: string;
  content: string;
  urlToImage: string;
  likes: number;
  filter: string;
  comments: CommentDTO[];
}

export interface CommentDTO {
  nickname: string;
  text: string;
  date: string;
  _id: string;
}
