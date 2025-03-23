/* import React from "react" */
import '/src/css/signUp.css'

function SignUp() {
    return (
        <div className="signUp">
            <div className="header">
                <div className="text"> Sign up </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="name" placeholder='Name'/>
                </div>
                <div className="input">
                    <input type="email" placeholder='Email'/>
                </div>
                <div className="input">
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            <div className="submit"> Sign Up</div>
        </div>
    )
}

export default SignUp