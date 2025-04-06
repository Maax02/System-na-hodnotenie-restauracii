import './App.css'
import NavBar from './components/navBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

/* pages */
import Home from './pages/home';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Search from './pages/search';


function App({}: any) {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/search" element={<Search />} />
    </Routes>
    </Router>
  );
}

export default App
