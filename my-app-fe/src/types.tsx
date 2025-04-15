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

export interface RestaurantReview {
  recenzia_id: number;
  user_id: number;
  restaurant_id: number;
  hodnotenie: number;
  sprava: string;
  datum: Date;
  user_name: string;
}

export interface RestaurantReviewResponse {
  reviews: RestaurantReview[];
  average_rating: number | null;
}