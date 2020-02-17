export interface PostsDTO  {
  _id: string;
  author: string;
  nickname: string;
  userImage: string;
  title: string;
  content: string;
  urlToImage: string;
  likes: number;
  filter: string;
}
