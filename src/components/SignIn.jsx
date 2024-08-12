import { useState } from 'react';
import './signin.css';
import LogIn from './login';



function SignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignIn, setShowSignIn] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        
        const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(userEmail) && password.length >= 8) {
            handleSignIn();
        }else{
            alert('Invalid email or password');
        }

    }

    function handleSignIn() {
        const existData = JSON.parse(localStorage.getItem('user')) || [];

        const existingUser = existData.find(element => element.email === userEmail);

        if (existingUser) {
            alert('User already exists');
            return;
        }else{
            existData.push({ email: userEmail, pass: password });
            localStorage.setItem('user', JSON.stringify(existData)); 
            alert('User created successfully');
            
        }
    }

    if (!showSignIn){
        return <LogIn />
    }
        
    
    
    return (
        <>
            <div className='container'>
                <div className="cart">
                    <h1 className='login'>Sign Up</h1>
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
                            placeholder="Create Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='btn'>Sign Up</button>
                        <p className="forgot">Forgot <span id="name">Username / Password?</span></p>
                        <p className="forgot">Already have an account? <span onClick={() => setShowSignIn(false)} id="name">Log In</span></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;





