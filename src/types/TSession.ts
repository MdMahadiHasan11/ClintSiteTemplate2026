export type TSession = {
  isAuth: boolean;
  user: SessionUser | null;
  user_type:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "SALESMAN"
    | "RESERVATION"
    | "ACCOUNTANT"
    | "DEVELOPER"
    | "guest";
};

export type SessionUser = {
  userId: string;
};
