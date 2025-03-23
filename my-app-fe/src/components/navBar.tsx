function NavBar() {
    return <nav className="navigation">
        <a href="/" className="title"> System na hodnotenie restauracii </a>
        <ul>
            <li> <a href="/signUp"> Sign Up </a> </li>
            <li> <a href="/logIn"> Log In </a> </li>
            <li> <a href="/search"> Search </a> </li>
        </ul>
    </nav>
}

export default NavBar