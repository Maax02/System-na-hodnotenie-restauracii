import '/src/css/navBar.css'

function NavBar() {
    return <nav className="navigation">
        <a href="/" className="title"> Systém na hodnotenie reštaurácií </a>
        <ul>
            <li> <a href="/account"> Účet </a> </li>
            <li> <a href="/logIn"> Prihlásiť sa </a> </li>
            <li> <a href="/signUp"> Registrácia </a> </li>
        </ul>
    </nav>
}

export default NavBar