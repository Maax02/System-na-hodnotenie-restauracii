import { useEffect, useState } from 'react';
import { fetchUserId, getUserInfo, logout } from '../services/logInService';
import { getUserReviews } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';
import '/src/css/account.css';

function AccountCard() {
    const [userId, setUserId] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserId()
            .then((userData) => {
                setUserId(userData);
                return Promise.all([
                    getUserInfo(userData.userId),
                    getUserReviews(userData.userId)
                ]);
            })
            .then(([userInfo, userReviews]) => {
                setUser(userInfo);
                setReviews(userReviews);
                setLoading(false);
            })
            .catch(() => {
                setUserId(null);
                setError('Please log in to view your account info.');
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Logout failed:", error);
                setError("Chyba pri odhlasovaní.");
            });
    };

    if (loading) {
        return <p>Načítavanie ...</p>;
    }

    if (!userId) {
        return <p> Nie ste prihlásený </p>;
    }

    return (
        <div className="accountPlace">
            <div className="accountSpace">
                <h2 className="userName">Meno: {user[0].user_name}</h2>
                <ul>
                    <li className="email">Email: {user[0].email} </li>
                    <li className="rew num">Počet recenzií: {reviews.length}</li>
                    <li className="user type">
                        Používateľská právomoc: {user?.isadmin ? 'Admin' : 'Normal User'}
                    </li>
                </ul>

                <button className="logout-btn" onClick={handleLogout}>
                    Odhlásiť sa
                </button>

                <div className="user-reviews">
                    <h3>Vaše recenzie:</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.recenzia_id}>
                                    Reštaurácia: {review.restaurant_name}
                                    <p>Hodnotenie: ⭐{review.hodnotenie}/10 </p>
                                    <p>Správa: "{review.sprava}" </p>
                                    <p>Dátum: {new Date(review.datum).toLocaleDateString('sk-SK')} </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenapísali ste žiadne recenzie.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccountCard;
