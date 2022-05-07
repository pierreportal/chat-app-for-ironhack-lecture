import React from 'react';
import { auth } from '../../api/service';

export const Signup = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, sePassword] = React.useState('');

    const [error, setError] = React.useState(null);

    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => sePassword(event.target.value);

    const handleSubmit = () => {
        auth.signup(username, password).then(response => {
            props.setLoggedInUser(response.data)
        }).catch(err => setError(err.response.data.message))
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Username" onChange={handleUsername} value={username} />
            <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
            <button type="button" onClick={handleSubmit}>Signup</button>
        </div>
    )
};