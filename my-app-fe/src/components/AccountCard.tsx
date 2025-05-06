import { useEffect, useState } from 'react';
import { fetchUserId, getUserInfo, logout, getUserByName, userDel, makeAdmin } from '../services/logInService';
import { getUserReviews, reviewDel } from '../services/reviewService';
import { addToRestaurants, uploadPhoto, getRestByName, restDel } from '../services/restaurantService';
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

    const [restaurantName, setRestaurantName] = useState<string>('')
    const [kitchenType, setKitchenType] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [streetNumber, setStreetNumber] = useState<number>(0)
    const [psc, setPSC] = useState<number>(0)
    const [city, setCity] = useState<string>('')

    const [photo, setPhoto] = useState<File | null>(null);

    const [restSearch, setRestSearch] = useState<string>('');
    const [restSearchResult, setRestSearchResult] = useState<any>('');
    const [renderRest, setRenderRest] = useState(false);

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

    const adminUser = () => {
        console.log("Admin user: ", userSearchResult[0].user_id)
        makeAdmin(userSearchResult[0].user_id).then(() => {
            navigate('/account');
        })
        .catch((error) => {
            console.error("Admin update failed:", error);
            setError("Chyba pri update usera na admina.");
        });
    };

    const addRestaurant = async () => {
        try {
            const response = await addToRestaurants(restaurantName, kitchenType, street, streetNumber, psc, city);
            const data = await response.json();
    
            const restaurantId = data.restaurant_id;
            console.log("addRest id: ", restaurantId);
    
            if (response.ok && restaurantId && photo) {
                await uploadPhoto(restaurantId, photo);
                alert("Reštaurácia a fotka sa úspešne nahrali!");
            } else {
                console.error("Reštaurácia sa nepodarila nahrať", data);
            }
        } catch (error) {
            console.error("Chyba pri pridávaní reštaurácie:", error);
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };


    function handleRestSearch() {
        getRestByName(restSearch).then((data) => {
            setRestSearchResult(data);
            setRenderRest(true)
        });
    }

    const delRest = () => {
        console.log("Delete restaurant: ", restSearchResult[0].restaurant_id)
        restDel(restSearchResult[0].restaurant_id).then(() => {
            navigate('/account');
        })
        .catch((error) => {
            console.error("Delete failed:", error);
            setError("Chyba pri mazani restauracie.");
        });
    };

    function kitchenOrder(e: React.ChangeEvent<HTMLSelectElement>) {
        setKitchenType(e.target.value);
      }
    

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
                        <p> Uprav používateľa </p>
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

                        <button className='delUser' onClick={delUser}> Vymaž používateľa </button>
                        <button className='adminUser' onClick={adminUser}> Urob adminom </button>
                    </div>
                }

                {user[0] && user[0].isadmin &&
                    <div>
                        <p> Pridať reštauráciu </p>
                        
                        <div className='restaurantForm'>
                            <input type="text" placeholder="Nazov restauracie" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)}/>
                            <select onChange={kitchenOrder} value={kitchenType}>
                                <option value="Slovenská">Slovenská</option>
                                <option value="Talianská">Talianská</option>
                                <option value="Mexická">Mexická</option>
                                <option value="Azijská">Azijská</option>
                                <option value="Americká">Americká</option>
                                <option value="Francúzska">Francúzska</option>
                                <option value="Turecká">Turecká</option>
                                <option value="Indická">Indická</option>
                                <option value="Vegánska">Vegánska</option>
                                <option value="Vegetariánska">Vegetariánska</option>
                                <option value="Mixed">Mixed</option>
                                <option value="Thajská">Thajská</option>
                                <option value="Kaviareň">Kaviareň</option>
                                <option value="Európska">Európska</option>
                            </select>
                            <input type="text" placeholder="Ulica" value={street} onChange={(e) => setStreet(e.target.value)}/>
                            <input type="text" placeholder="Cislo ulice" value={streetNumber} onChange={(e) => setStreetNumber(Number(e.target.value))}/>
                            <input type="text" placeholder="PSC" value={psc} onChange={(e) => setPSC(Number(e.target.value))}/>
                            <input type="text" placeholder="Mesto" value={city} onChange={(e) => setCity(e.target.value)}/>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            <button className='button-add-restaurant' onClick={addRestaurant}> Pridať reštauráciu </button>
                        </div>
                    </div>
                }

                {user[0] && user[0].isadmin &&
                    <div>
                        <p> Zmazať reštauráciu </p>
                        <form className="userForm" onSubmit={(e: any) => {e.preventDefault(); handleRestSearch();}}>
                            <input
                            type="text"
                            placeholder="Zadajte meno reštaurácie..."
                            value={restSearch}
                            onChange={(e) => setRestSearch(e.target.value)}
                            />
                            <button type="submit" className="search-user-button">
                            Hľadať
                            </button>
                        </form>
                    </div>
                }

                {user[0] && user[0].isadmin && renderRest && restSearchResult[0] &&
                    <div className='restCard'>
                        <p>Názov: {restSearchResult[0].restaurant_name}</p>
                        <p>Kuchyňa: {restSearchResult[0].kuchyna}</p>
                        <p>Adresa: {restSearchResult[0].street} {restSearchResult[0].street_number}, {restSearchResult[0].city}, {restSearchResult[0].psc}</p>

                        <button className='delUser' onClick={delRest}> Vymaž reštauráciu </button>
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
                                        Vymazať </button>
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
