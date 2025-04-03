export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    isAdmin: boolean;
    resetToken?: string;
  }