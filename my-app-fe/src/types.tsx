export interface Restaurant {
    restaurant_id: number;
    restaurant_name: string;
    street: string;
    street_number: number;
    city: string;
    psc: number;
    kuchyna: string;
  }

  export interface User {
    user_id: number;
    user_name: string;
    user_password: string;
    user_email: string;
    isadmin: boolean;
  }