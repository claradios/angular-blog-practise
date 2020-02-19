export interface Post {
  _id: string;
  author: string;
  nickname: string;
  userImage: string;
  title: string;
  content: string;
  urlToImage: string;
  likes: number;
  filter: string;
  comments: Comment[];
}

export interface Comment {
  nickname: string;
  text: string;
  date: string;
  _id: string;
}
