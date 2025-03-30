import { useState } from 'react';

function LogIn() {
    const [username, checkUsername] = useState('');
    const [password, checkPassword] = useState('');

    const checkSubmit = async () => {
        const response = await fetch("http://localhost:3000/signUp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registration successful!");
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div className="signLog">
            <div className="header">
                <div className="text"> Log In </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="name" placeholder='Name'
                    value={username} onChange={(e) => checkUsername(e.target.value)}/>
                </div>
                <div className="input">
                    <input type="password" placeholder='Password'
                    value={password} onChange={(e) => checkPassword(e.target.value)}/>
                </div>
            </div>
            <div className="submits">
                <div className="submit" onClick={checkSubmit}> Log In </div>
            </div>
        </div>
    )
}

export default LogIn