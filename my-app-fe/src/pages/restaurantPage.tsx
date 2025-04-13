import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Restaurant } from '../types'; // extend your types if needed
import { getRestaurantById } from '../services/restaurantService'

function RestaurantPage() {
    const { id } = useParams<{ id: string }>();
    const restaurantId = id?.split('_')[0];
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [loading, setLoading] = useState(true);

  // periodically refresh (timer)
    if(restaurantId) {
        console.log("YOOOO", restaurantId);
        useEffect(() => {
        getRestaurantById(restaurantId).then(
            (restaurant) => setRestaurant(restaurant)
        );
        setLoading(false);

        const fetchMessagesInterval = setInterval(() => {
            getRestaurantById(restaurantId).then(
                (restaurant) => setRestaurant(restaurant)
            );
            setLoading(false);
            }, 10000);
        return () => clearInterval(fetchMessagesInterval);
        }, [restaurantId]);
    }

    console.log("restaurant query", restaurant);
    console.log("restaurant name", restaurant?.restaurant_name);
    if (loading) return <p> Loading ... </p>;
    if (!restaurant) return <p>Restaurant not found.</p>;

    return (
    <div>
        <h1>{restaurant.restaurant_name}</h1>
        <p>Kitchen: {restaurant.kuchyna}</p>
    </div>

    );
}

export default RestaurantPage;