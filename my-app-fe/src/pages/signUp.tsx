import { useState } from 'react';
import '/src/css/signUp.css';
import { addUser } from '../services/signUpService';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    async function signUp() {
        try {
            const response = await addUser({
                user_name: username,
                user_password: password,
                user_email: email
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                setMessage(data.error || 'Registrácia neúspešná.');
            }
        } catch (err) {
            console.error('Sign up error:', err);
            setMessage('Nastala nečakaná chyba.');
        }
    }

    return (
        <div className="signLog">
            <div className="header">
                <div className="text">Sign up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input
                        type="text"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submits">
                <div className="submit" onClick={signUp}>
                    Sign Up
                </div>
            </div>
            {message && <p className="signup-message">{message}</p>}
        </div>
    );
}

export default SignUp;
