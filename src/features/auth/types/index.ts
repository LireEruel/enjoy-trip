export type JoinUser = {
  userId: String;
  userPass: String;
  userName: String;
  emailId: String;
  emailDomain: String;
};

export type LoginUser = {
  userId: String;
  userPass: String;
};
export type SignUpFormType = {
  userId: String;
  userPass: String;
  userPassComfirm: String;
  userName: String;
  email: String;
  isValidId: boolean;
};

export type LoginType = {
  userId: String;
  userPass: String;
  remember: Boolean;
};
