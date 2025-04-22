import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../services/logInService';

interface LogInProps {
  error: string;
  setError: (msg: string) => void;
  setAuthStatus: (auth: boolean) => void;
}

function LogIn({ error, setError, setAuthStatus }: LogInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false); // 👈 New
  const navigate = useNavigate();

  console.log(error)

  useEffect(() => {
    fetch('/api/v1/auth/check', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setAlreadyLoggedIn(true);
          setAuthStatus(true);
          //navigate('/restaurants');
        }
      });
  }, []);

  function handleLogout() {
    logout()
        .then(() => {
            setAuthStatus(false);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message)
        });
}

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Username and password are required!');
      return;
    }

    login(username, password)
      .then(() => {
        setAuthStatus(true);
        navigate('/restaurants');
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    setError('');
  };

  if (alreadyLoggedIn) {
    return (
      <>
    <p className="info-message" style={{ color: 'green', textAlign: 'center' }}>
      Už ste prihlásený!</p>
    <button
        className="btn btn-primary"
        onClick={handleLogout}>
        Logout
    </button>
    </>
    );
  }

  return (
    <div className="signLog">
      <div className="header">
        <div className="text">Log In</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="submits">
          <button className="submit" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
