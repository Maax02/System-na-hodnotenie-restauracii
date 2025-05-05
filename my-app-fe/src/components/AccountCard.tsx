import { useEffect, useState } from 'react';
import { fetchUserId, getUserInfo, logout, getUserByName, userDel } from '../services/logInService';
import { getUserReviews, reviewDel } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';
import '/src/css/account.css';

function AccountCard() {
    const [userId, setUserId] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userSearch, setUserSearch] = useState<any>('');
    const [userSearchResult, setUserSearchResult] = useState<any>('');
    const [renderUser, setRenderUser] = useState(false);

    const navigate = useNavigate();
    console.log(error)

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

    const deleteReview = (reviewId: number) => {
        reviewDel(reviewId)
            .then(() => {
                navigate('/account');
            })
            .catch((error) => {
                console.error("Delete failed:", error);
                setError("Chyba pri mazani recenzie.");
            });
    };


    function handleUserSearch() {
        getUserByName(userSearch).then((data) => {
            setUserSearchResult(data);
            setRenderUser(true)
        });
    }

    const delUser = () => {
        console.log("Delete user: ", userSearchResult[0].user_id)
        userDel(userSearchResult[0].user_id).then(() => {
            navigate('/account');
        })
        .catch((error) => {
            console.error("Delete failed:", error);
            setError("Chyba pri mazani usera.");
        });
    };

    console.log(userSearch[0])

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
                        Používateľská právomoc: {user[0]?.isadmin ? 'Admin' : 'Normal User'}
                    </li>
                </ul>

                <button className="logout-btn" onClick={handleLogout}>
                    Odhlásiť sa
                </button>

                {user[0] && user[0].isadmin &&
                    <div className='AdminWork'>
                        <form className="userForm" onSubmit={(e: any) => {e.preventDefault(); handleUserSearch();}}>
                            <input
                            type="text"
                            placeholder="Zadajte meno používateľa..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            />
                            <button type="submit" className="search-user-button">
                            Hľadať
                            </button>
                        </form>
                    </div>
                }

                {user[0] && user[0].isadmin && renderUser && userSearchResult[0] &&
                    <div className='userCard'>
                        <p>Meno: {userSearchResult[0].user_name}</p>
                        <p>Email: {userSearchResult[0].email}</p>
                        <p>Admin: {userSearchResult[0].isadmin ? 'Admin' : 'Normal User'}</p>

                        <button className='delUser' onClick={delUser}> Vymaz pouzivatela </button>
                    </div>
                }

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
                                    <button className='delete' type='button' onClick={() => deleteReview(review.recenzia_id)}>
                                        Delete </button>
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
