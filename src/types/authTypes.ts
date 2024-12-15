export interface User {
  id?: string;
  status?: UserStatus;
  auth?: Auth;
  profile?: Profile;
  role?: Role;
  createdAt?: Date;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Auth {
  id?: string;
  username?: string;
  password?: string;
  createdAt?: string;
}

export interface Role {
  id?: string;
  name: string;
  createdAt?: string;
}

export interface Profile {
  id?: string;
  photo?: string;
  document?: string;
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: Date;
  address?: Address;
  createdAt?: string;
}

export interface Address {
  id?: string;
  street?: string;
  number?: string | number;
  cep?: string;
  city?: string;
  state?: string;
  province?: string;
  complement?: string;
  createdAt?: Date;
}
