import './App.css'
import NavBar from './components/navBar';

/* pages */
import Home from './pages/home';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Search from './pages/search';


function App({ children }: any) {
  let page
  switch (window.location.pathname) {
    case "/":
      page = <Home />
      break
    case "/signUp":
      page = <SignUp />
      break
    case "/logIn":
      page = <LogIn />
      break
    case "/search":
      page = <Search />
  }

  return (
    <>
      <NavBar></NavBar>
      {page}
      <div>{children}</div>
    </>
  );
}

export default App
