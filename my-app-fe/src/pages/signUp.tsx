import { useState } from 'react';
import '/src/css/signUp.css'

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const response = await fetch("/auth/signUp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
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
                <div className="text"> Sign up </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="name" placeholder='Name'
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input">
                    <input type="email" placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input">
                    <input type="password" placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="submits">
                <div className="submit" onClick={handleSubmit}> Sign Up </div>
            </div>
        </div>
    )
}

export default SignUp