import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(onLogin = () => { }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailID, setEmailID] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('please provide username and password')
            return;
        }

        axios.post('http://localhost:8080/user/save', { name : username, password, emailID
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                onLogin(true);
                navigate('/');
            }
        }).catch((error) => {
            console.error("Register error:", error);
        });
    };

    return (
        <div>
            <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
            <input type='email' placeholder='emailID' onChange={(e) => setEmailID(e.target.value)}></input>
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default Register;
