function LogIn() {
    return (
        <div className="signLog">
            <div className="header">
                <div className="text"> Log In </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="name" placeholder='Name'/>
                </div>
                <div className="input">
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            <div className="submits">
                <div className="submit"> Log In </div>
            </div>
        </div>
    )
}

export default LogIn