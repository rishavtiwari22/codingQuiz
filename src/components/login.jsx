import App from '../App';
import { useState } from 'react';
import './login.css';
import SignIn from './SignIn';

function LogIn() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    
        handleLogIn();
    }
    
    function handleLogIn() {
        const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(userEmail) || password.length < 8) {
            alert('Invalid email or password');
            return;
        }
    
        const existData = JSON.parse(localStorage.getItem('user')) || [];
        const user = existData.find((element) => element.email === userEmail && element.pass === password);
        if (user && user.email) {
            console.log('User logged in:', user);
            setLoggedIn(true);
        } else {
            alert('User not found or incorrect password');
        }
    }
    
    

    function handleSignUp() {
        setSignedIn(true);
    }

    if (signedIn) {
        return <SignIn />;
    } else if (loggedIn) {
        return <App />;
    }

    return (
        <div className='container'>
            <div className="cart">
                <h1 className='login'>Login</h1>
                <form className='myform' onSubmit={handleSubmit}>
                    <input 
                        className='data'
                        type="text"
                        value={userEmail}
                        placeholder="User Email"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input 
                        className='data'
                        type="password" 
                        value={password}
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='btn'>Login</button>
                    <p className="forgot">Forgot <span id="name">Username / Password?</span></p>
                    <p className="forgot">Don't have an account? <span onClick={handleSignUp} id="name">Sign up</span></p>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
