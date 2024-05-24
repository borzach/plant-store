import "../styles/banner.css"
import logo from "../assets/logo.png"
import Login from "./Login";

function Banner({loggedInUsr,updateLoggedIn}) {
    return (
        <div className="banner">
            <div className="login-comp">
                <Login loggedInUsr={loggedInUsr} updateLoggedIn={updateLoggedIn}></Login>
            </div>
            <div>
                <img src={logo} alt='La maison jungle' className='logo' />
                <h1>La maison jungle</h1>
            </div>
        </div>
    );
}

export default Banner