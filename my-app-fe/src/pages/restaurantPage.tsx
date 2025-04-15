import '/src/css/restaurantPage.css'
import RestaurantPageCard from '../components/restaurantPageCard';
import ReviewCard from '../components/reviewCard';
import { useParams } from 'react-router-dom';
import { RestaurantReview } from "../types"
import { useEffect, useState } from 'react';
import { getRestaurantReviews } from '../services/reviewService'



function RestaurantPage() {
    const { id } = useParams<{ id: string }>();
    const restaurantId = id?.split('_')[0];
    const [reviews, setReview] = useState<RestaurantReview[]>();
    const [loading, setLoading] = useState(true);

  // periodically refresh (timer)
    if(restaurantId) {
        
        useEffect(() => {
        getRestaurantReviews(restaurantId).then(
            (reviews) => setReview(reviews)
        );
        setLoading(false);

        const fetchMessagesInterval = setInterval(() => {
            getRestaurantReviews(restaurantId).then(
                (reviews) => setReview(reviews)
            );
            setLoading(false);
            }, 10000);
        return () => clearInterval(fetchMessagesInterval);
        }, [restaurantId]);
    }

    if (loading) return <p> Loading ... </p>;
    console.log("reviews", reviews);

    return (
        <>
            <RestaurantPageCard/>
            <ReviewCard reviews={reviews || []}/>
        </>
    );
}
export default RestaurantPage;