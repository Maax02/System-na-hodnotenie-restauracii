import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../services/logInService';
import { getUserReviews } from '../services/reviewService'; // your service file
import '/src/css/card.css';

function AccountCard() {
    const [user, setUser] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserInfo()
            .then((userData) => {
                setUser(userData);
                return getUserReviews(userData.userId);
            })
            .then((userReviews) => {
                setReviews(userReviews);
            })
            .catch(() => {
                setUser(null);
                setError('Please log in to view your account info.');
            });
    }, []);

    if (error) {
        return (
            <div className="cardPlace">
                <div className="cardSpace">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // loading spinner or placeholder
    }

    return (
        <div className="cardPlace">
            <div className="cardSpace">
                <h2 className="cardName">{user.username}</h2>
                <p className="Basic info">Description:</p>
                <ul>
                    <li className="email">Email: (add email if you're returning it)</li>
                    <li className="review number">Number of reviews: {reviews.length}</li>
                    <li className="user type">
                        User type: {user.isAdmin ? 'Admin' : 'User'}
                    </li>
                </ul>

                <div className="user-reviews">
                    <h3>Your Reviews:</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    {review.restaurant_name}: {review.hodnotenie}★ - "{review.text}"
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You haven't written any reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccountCard;
