export interface TokenDTO {
    message: string;
    token: string;
    userData: UserDataDTO;
  }
export interface UserDataDTO {
    username: string;
    rol: string;
    nickname: string;
    userImage: string;
  }
