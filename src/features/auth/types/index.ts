export type AuthUser = {
  userId: String;
  userPass: String;
  userName: String;
  emailId: String;
  emailDomain: String;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
