function LogIn() {
    return (
        <div className="LogIn">
            <div className="header">
                <div className="text"> Log In </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="name" />
                </div>
                <div className="input">
                    <input type="password" />
                </div>
            </div>
            <div className="submit"> Log In </div>
        </div>
    )
}

export default LogIn