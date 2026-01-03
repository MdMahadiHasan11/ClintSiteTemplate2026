export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  fullName: string;
  passwordChangedAt: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  createdById: string;
  deletedById: string;
}
