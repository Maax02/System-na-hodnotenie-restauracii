import '/src/css/card.css'


function AccountCard() {
    return (
        <div className="cardPlace">
            <div className="cardSpace">
                <h2 className="cardName"> Admin </h2>
                <p className="Basic info"> Description: </p>
                <ul >
                    <li className="email"> Email: </li>
                    <li className="review number"> Number of reviews: </li>
                    <li className="user type"> User type: Admin </li>
                </ul>
            </div>
        </div>
    );
}

export default AccountCard;