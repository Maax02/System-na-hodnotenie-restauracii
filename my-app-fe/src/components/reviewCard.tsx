import { useEffect, useState } from 'react';
import { RestaurantReview } from '../types';
import { fetchUserId, getUserInfo } from '../services/logInService';
import { reviewDel } from '../services/reviewService';

import '/src/css/review.css'

interface Props {
    reviews: RestaurantReview[];
}

function ReviewCard({ reviews }: Props) {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const [userId, setUserId] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    console.log(error)
    console.log(userId)

    useEffect(() => {
        fetchUserId()
            .then((userData) => {
                setUserId(userData);
                return Promise.all([
                    getUserInfo(userData.userId),
                ]);
            })
            .then(([userInfo]) => {
                setUser(userInfo[0]);
                setLoading(false);
            })
            .catch(() => {
                setUserId(null);
                setError('Please log in to view your account info.');
                setLoading(false);
            });
    }, []);

    const deleteReview = (reviewId: number) => {
        reviewDel(reviewId)
            .then(() => {
                console.log("Review deleetd")
            })
            .catch((error) => {
                console.error("Delete failed:", error);
                setError("Chyba pri mazani recenzie.");
            });
    };

    if (loading) {
        return <p>Načítavanie ...</p>;
    }

    console.log(reviews)
    
    return (
        <div className="review-list">
            {reviews.map((reviews) => (
                <div className="review" key={reviews.recenzia_id}>
                    <p className="review-user"> {reviews.user_name ? reviews.user_name : '<deleted user>'}</p>
                    <p className="review-score"> hodnotenie: ⭐ {reviews.hodnotenie}/10 </p>
                    <p className="review-text"> Sprava: {reviews.sprava} </p>
                    <p className="review-date"> Datum : {new Date(reviews.datum).toLocaleDateString()} </p>
                    {user && user.isadmin && (
                    <button className="delete" onClick={() => deleteReview(reviews.recenzia_id)}>
                        Delete Review
                    </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;