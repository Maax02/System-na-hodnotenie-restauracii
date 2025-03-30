import '/src/css/navBar.css'

function NavBar() {
    return <nav className="navigation">
        <a href="/" className="title"> Systém na hodnotenie reštaurácií </a>
        <ul>
            <li> <a href="/search"> Search </a> </li>
            <li> <a href="/logIn"> Log in </a> </li>
            <li> <a href="/signUp"> Sign up </a> </li>
        </ul>
    </nav>
}

export default NavBar