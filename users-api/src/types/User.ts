export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  avatar: string;
  bio: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  company: {
    name: string;
    position: string;
    department: string;
  };
}
